#!/usr/bin/env pwsh
# End-to-end screenshot run on Windows: isolated DSH profile -> headless Chrome -> crops.
#
#   tools/screenshots/run.ps1              # light + dark, writes docs/assets/features + preview*.png
#   $env:KEEP = 1; tools/screenshots/run.ps1   # keep .screenshots/ for debugging
#
# Requirements: Windows with PowerShell 7+, DeepSeek Harness installed,
# Google Chrome, Node 22+, Python 3 with Pillow. Never commit .screenshots/ or
# ~/.dsh credentials.
#
# Mirrors run.sh; the only layout difference is SHOT_VIEWPORT: Windows headless
# Chrome subtracts window frame pixels, so the content box is pinned through CDP
# (1440x900 at 4x) instead of relying on --window-size.
$ErrorActionPreference = 'Stop'

$Repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$Work = if ($env:WORK) { $env:WORK } else { Join-Path $Repo '.screenshots' }
$Port = if ($env:PORT) { $env:PORT } else { '61399' }
$CdpPort = if ($env:CDP_PORT) { $env:CDP_PORT } else { '9222' }
$Profile = 'demo'
$Viewport = if ($env:SHOT_VIEWPORT) { $env:SHOT_VIEWPORT } else { '1440x900@4' }

function Find-Tool([string]$override, [string]$fallback, [string[]]$candidates) {
  if ($override) { return $override }
  if ($fallback) { return $fallback }
  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path $candidate)) { return $candidate }
  }
  throw "could not find the tool; set the matching environment variable"
}

$DshCli = Find-Tool $env:DSH_CLI $null @(
  'D:\ProgramFiles\dsh\resources\runtime\cli\bin\dsh.cmd',
  (Join-Path $env:LOCALAPPDATA 'Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd')
)
$Chrome = Find-Tool $env:CHROME $null @(
  (Join-Path ${env:ProgramFiles} 'Google\Chrome\Application\chrome.exe'),
  $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} 'Google\Chrome\Application\chrome.exe' }),
  (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
)
function Find-Python {
  # A `python` on PATH may be the Store stub or lack Pillow, so every candidate
  # is proved by importing PIL before it is accepted.
  $candidates = @()
  if ($env:PYTHON) { $candidates += $env:PYTHON }
  $candidates += @(
    'python',
    'py',
    (Join-Path $env:USERPROFILE '.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe')
  )
  foreach ($candidate in $candidates) {
    $resolved = $candidate
    if ($candidate -eq 'python' -or $candidate -eq 'py') {
      $command = Get-Command $candidate -ErrorAction SilentlyContinue
      if (-not $command) { continue }
      $resolved = $command.Source
    } elseif (-not (Test-Path $candidate)) {
      continue
    }
    & $resolved -c 'import PIL' 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { return $resolved }
  }
  throw 'no Python with Pillow found; set PYTHON to a 3.x interpreter that can import PIL'
}

$Python = Find-Python
$Node = Find-Tool $env:NODE 'node' @()

$ServerPid = $null
$ChromePid = $null

function Log([string]$message) { Write-Host "`n==> $message" }

function Stop-PortOwner([string]$port) {
  foreach ($connection in Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
    Stop-Process -Id $connection.OwningProcess -Force -ErrorAction SilentlyContinue
  }
}

function Write-Theme([string]$theme) {
  $patch = @"
- id: ui-settings-general
  name: "@deepseek-ai/dsh-client-ui-settings-general"
  config:
    welcomeNoticeVersion: 2026-09-28.01
- id: ui-theme
  name: "@deepseek-ai/dsh-client-ui-theme"
  config:
    preference: $theme
"@
  Set-Content -Path (Join-Path $Work "dshhome\profiles\$Profile\cordis.patch.yml") -Value $patch -Encoding utf8
}

function Start-Server {
  # DSH_HOME must be set for the child only: the second start (dark) would
  # otherwise fall back to the real DSH home, where the demo profile is absent.
  $env:DSH_HOME = Join-Path $Work 'dshhome'
  $script:ServerPid = Start-Process -FilePath 'cmd.exe' `
    -ArgumentList '/c', "`"$DshCli`" --profile $Profile --no-open --port $Port" `
    -WorkingDirectory (Join-Path $Work 'cwd') `
    -RedirectStandardOutput (Join-Path $Work 'server.log') `
    -RedirectStandardError (Join-Path $Work 'server.err.log') `
    -PassThru
  $env:DSH_HOME = $null
  for ($i = 0; $i -lt 60; $i++) {
    Start-Sleep -Milliseconds 1000
    $log = Join-Path $Work 'server.log'
    if (Test-Path $log) {
      $match = Select-String -Path $log -Pattern 'token=([A-Za-z0-9_-]+)' | Select-Object -First 1
      if ($match) { return $match.Matches[0].Groups[1].Value }
    }
  }
  $detail = ''
  if (Test-Path (Join-Path $Work 'server.err.log')) {
    $detail = (Get-Content (Join-Path $Work 'server.err.log') -Tail 8) -join "`n"
  }
  throw "server did not print a token; see $Work\server.log`n$detail"
}

function Stop-Server {
  if ($script:ServerPid) { Stop-Process -Id $script:ServerPid.Id -Force -ErrorAction SilentlyContinue }
  Stop-PortOwner $Port
  $script:ServerPid = $null
  for ($i = 0; $i -lt 20; $i++) {
    if (-not (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)) { break }
    Start-Sleep -Milliseconds 500
  }
}

function Start-Chrome {
  $script:ChromePid = Start-Process -FilePath $Chrome -ArgumentList @(
    '--headless=new', '--no-sandbox', '--disable-gpu',
    "--remote-debugging-port=$CdpPort", "--user-data-dir=$Work\chrome",
    '--window-size=1440,1043', '--force-device-scale-factor=4',
    '--hide-scrollbars', 'about:blank'
  ) -RedirectStandardOutput (Join-Path $Work 'chrome.log') -PassThru
  for ($i = 0; $i -lt 30; $i++) {
    try {
      Invoke-WebRequest -Uri "http://127.0.0.1:$CdpPort/json/version" -UseBasicParsing -TimeoutSec 2 | Out-Null
      return
    } catch { Start-Sleep -Seconds 1 }
  }
  throw 'headless Chrome did not expose CDP'
}

function Stop-Chrome {
  if ($script:ChromePid) { Stop-Process -Id $script:ChromePid.Id -Force -ErrorAction SilentlyContinue }
  Get-CimInstance Win32_Process -Filter "Name = 'chrome.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -and $_.CommandLine.Contains("user-data-dir=$Work\chrome") } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  $script:ChromePid = $null
}

function Invoke-Node([string[]]$scriptArgs, [hashtable]$environment) {
  Push-Location (Join-Path $Repo 'tools\screenshots')
  try {
    $saved = @{}
    foreach ($key in $environment.Keys) {
      $saved[$key] = [Environment]::GetEnvironmentVariable($key)
      [Environment]::SetEnvironmentVariable($key, $environment[$key])
    }
    & $Node @scriptArgs
    if ($LASTEXITCODE -ne 0) { throw "node $($scriptArgs -join ' ') failed with exit code $LASTEXITCODE" }
  } finally {
    foreach ($key in $environment.Keys) { [Environment]::SetEnvironmentVariable($key, $saved[$key]) }
    Pop-Location
  }
}

function Invoke-Crop([string]$theme, [string]$out, [switch]$Preview) {
  $arguments = @((Join-Path $Repo 'tools\screenshots\crop.py'), '--raw', (Join-Path $Work 'raw'), '--theme', $theme, '--out', $out)
  if ($Preview) { $arguments += '--preview' }
  & $Python @arguments
  if ($LASTEXITCODE -ne 0) { throw "crop.py failed with exit code $LASTEXITCODE" }
}

try {
  Log "workdir: $Work"
  if (Test-Path $Work) { Remove-Item $Work -Recurse -Force }
  New-Item -ItemType Directory -Path (Join-Path $Work 'raw'), (Join-Path $Work 'cwd') -Force | Out-Null

  # 1. A throwaway DSH home with a fresh web profile.
  $env:DSH_HOME = Join-Path $Work 'dshhome'
  & 'cmd.exe' /c "`"$DshCli`" --profile $Profile --from-default-profile web --dump-config" | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "could not create the demo profile (exit code $LASTEXITCODE)" }
  $profileJson = @"
{
  "name": "dsh-profile-$Profile",
  "private": true,
  "dependencies": { "dsh-aside-note": "link:$($Repo -replace '\\', '/')" },
  "dsh": { "profile": { "bundles": ["@deepseek-ai/dsh-base", "@deepseek-ai/dsh-web-app", "dsh-aside-note"] } }
}
"@
  Set-Content -Path (Join-Path $Work "dshhome\profiles\$Profile\package.json") -Value $profileJson -Encoding utf8
  Write-Theme 'light'

  Log 'installing the plugin into the throwaway profile'
  & 'cmd.exe' /c "`"$DshCli`" plugin --profile $Profile install --offline --store-dir `"$Work\pnpm-store`"" | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "plugin install failed with exit code $LASTEXITCODE" }

  # Credentials are opt-in: the panel shots do not need a model reply, and the
  # file is the one thing in this pipeline that must never leave the machine.
  $credentials = Join-Path $env:USERPROFILE '.dsh\.credentials.yaml'
  if ($env:COPY_CREDENTIALS -eq '1' -and (Test-Path $credentials)) {
    Copy-Item $credentials (Join-Path $Work 'dshhome\.credentials.yaml')
    Log 'credentials copied for the demo conversation (COPY_CREDENTIALS=1)'
  } else {
    Log 'no credentials copied; the demo reply may be empty (panel shots are unaffected)'
  }

  Log "starting DSH web on :$Port"
  $token = Start-Server

  Log "starting headless Chrome (CDP :$CdpPort)"
  Start-Chrome

  Log 'building the demo session and notes'
  Invoke-Node @('bootstrap.mjs') @{ PORT = $Port; TOKEN = $token; SHOT_VIEWPORT = $Viewport }

  Log 'capturing light'
  Invoke-Node @('capture.mjs') @{ PORT = $Port; TOKEN = $token; SHOT_VIEWPORT = $Viewport; THEME = 'light'; OUT = (Join-Path $Work 'raw') }
  Invoke-Node @('capture.mjs') @{ PORT = $Port; TOKEN = $token; SHOT_VIEWPORT = $Viewport; THEME = 'light'; OUT = (Join-Path $Work 'raw'); PREVIEW = '1' }

  Log 'restarting in dark'
  Stop-Server
  Write-Theme 'dark'
  $token = Start-Server
  Invoke-Node @('capture.mjs') @{ PORT = $Port; TOKEN = $token; SHOT_VIEWPORT = $Viewport; THEME = 'dark'; OUT = (Join-Path $Work 'raw') }
  Invoke-Node @('capture.mjs') @{ PORT = $Port; TOKEN = $token; SHOT_VIEWPORT = $Viewport; THEME = 'dark'; OUT = (Join-Path $Work 'raw'); PREVIEW = '1' }

  Log 'cropping'
  Invoke-Crop 'light' (Join-Path $Repo 'docs\assets\features')
  Invoke-Crop 'dark' (Join-Path $Repo 'docs\assets\features')
  Invoke-Crop 'light' (Join-Path $Repo 'docs\assets') -Preview
  Invoke-Crop 'dark' (Join-Path $Repo 'docs\assets') -Preview

  Log 'done'
  Write-Host 'Review docs/assets/features/*.png and docs/assets/preview-*.png, then run: npm test'
} finally {
  Stop-Server
  Stop-Chrome
  if ($env:KEEP -ne '1') {
    if (Test-Path $Work) { Remove-Item $Work -Recurse -Force -ErrorAction SilentlyContinue }
  }
}
