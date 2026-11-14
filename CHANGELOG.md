# Changelog

The 1.0.0–2.0.1 iterations were development builds of the same plugin; the 2.x line was withdrawn from npm before it became public and the changelog was consolidated at 0.9.10, the first public release under the `dsh-aside-note` name. The public line resumes here at 1.0.0, the first stable release.

This file records user-visible changes only. Screenshots, marketplace listing material, documentation structure and the release pipeline are tracked in [CHANGELOG-OPS.md](./CHANGELOG-OPS.md), so the notes the panel shows never carry build or operations chores.

## next-released

## 1.1.2

<!-- app-update-notes:en:start -->
### Added
- **Anonymous feature statistics:** the panel reports a small set of anonymous events to the Tencent Cloud Observability Platform — panel opened, note created/completed/edited/deleted/forwarded, scope switched, update checked — to see which features are used and where people get stuck. Events carry the action and outcome, the plugin version, an anonymous visitor ID and basic environment details such as network, region and device type; note text, conversations and account details are never read. Only custom events are sent: page performance, web vitals, JS errors, API and asset speed are off, and Do Not Track drops reports.
- **Privacy switch:** Settings › Privacy now has an “Anonymous feature statistics” switch, on by default. Turning it off stops reporting immediately; the final event only records that choice, and the preference stays in this browser.

### Changed
- **In-app updates now run through the host:** the plugin no longer uses the plugin market. The host installs over the running copy and verifies the version on disk; prerelease builds also read the `next` dist-tag, while stable builds keep reading `latest` only.
- **Failed updates stay actionable:** a failed update states its cause. When the host has no update route or refuses an in-place install, the card hands over a command pinned to the offered version; prereleases also pin the npmjs registry, and the installer retries npmjs when the configured mirror has not caught up.
- **No more waiting on unrelated work:** updates no longer queue behind the plugin market or wait for an unrelated agent to finish.
- **No “Restart DSH” button:** after an update the card offers a page refresh and says the new version lands at the next start.
- **One neutral footer line:** both the workspace and session scopes now read “Notes are saved only on this device”; the switch under the title shows which list is visible.

### Fixed
- **Settings card scrolling:** in a short window the settings card now scrolls inside the panel instead of being cut off below its bottom edge, while a tall panel still shows the whole card.
- **Manual update command:** when an older host sends a fallback command without the offered version, or without the npmjs pin for a prerelease, the card replaces it with its own pinned command so it cannot install the stable line.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 新增
- **匿名功能统计：** 面板通过腾讯云可观测平台上报少量匿名事件——打开面板、新建/完成/编辑/删除/转发便笺、切换清单、检查更新等，用来判断哪些功能常用、哪里容易卡住。事件带操作类型与结果、插件版本、匿名访客 ID，以及网络、地域、设备类型等基础环境信息；不读取便笺正文、对话或账号信息。只上报自定义事件，页面性能、Web Vitals、JS 报错、接口与资源测速均关闭，浏览器开启 DNT 时丢弃上报。
- **隐私开关：** 设置 › 隐私新增「匿名功能统计」开关，默认开启。关闭后不再上报，最后一条事件只记录这次选择；开关状态仅保存在本机。

### 变更
- **应用内更新改走宿主：** 不再使用插件市场。宿主就地覆盖安装并回读磁盘版本；预发布版同时读取 `next` 标签，稳定版仍只读 `latest`。
- **更新失败仍可继续：** 失败时说明原因；宿主没有更新路由或拒绝就地覆盖时，卡片给出固定目标版本的命令。预发布还会固定 npmjs registry，安装器在默认镜像缺版本时也会用 npmjs 重试。
- **更新不再被无关任务阻塞：** 不再排队等插件市场，也不会因为别的 agent 正在运行而拒绝更新。
- **不再提供「重启 DSH」按钮：** 更新完成后提供「刷新页面」，并说明新版本在下次启动生效。
- **页脚统一为一条中性说明：** 工作区与会话都显示「便笺数据仅保存在本地」，当前清单只由标题下方的切换表示。

### 修复
- **设置卡滚动：** 窗口偏矮时设置卡在面板内滚动，不再被面板下沿裁掉；面板够高时仍完整显示。
- **手动更新命令：** 旧宿主返回的兜底命令如果没带目标版本、或预发布没带 npmjs 固定，卡片会换成自己生成的固定版本命令，避免装回稳定版。
<!-- app-update-notes:zh:end -->


## 1.1.2-beta.8

<!-- app-update-notes:en:start -->
### Fixed
- **Manual update command:** when a host from an older build sends a fallback command without the offered version, or without the npmjs pin for a prerelease, the card now replaces it with its own pinned command instead of handing over one that could install the stable line.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 修复
- **手动更新命令：** 旧宿主返回的兜底命令如果没带目标版本、或预发布没带 npmjs 固定，卡片会用自己生成的固定版本命令替换它，避免把用户带回稳定版。
<!-- app-update-notes:zh:end -->

## 1.1.2-beta.7

<!-- app-update-notes:en:start -->
### Changed
- **Updates:** the plugin no longer probes or calls the plugin market. An update is one request to the host, and when that route is unavailable the card states a command pinned to the offered version; prereleases also pin the npmjs registry. The installer retries a prerelease against npmjs when the configured registry has not caught up.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **更新：** 插件不再探测或调用插件市场，更新只走宿主一个请求；宿主没有路由时，卡片直接给出带目标版本与 profile 目录的命令，预发布还会固定 npmjs registry；安装器在默认 registry 缺版本时也会用 npmjs 重试一次。
<!-- app-update-notes:zh:end -->

## 1.1.2-beta.6

<!-- app-update-notes:en:start -->
### Changed
- **Analytics copy:** the settings switch now says the statistics come from the Tencent Cloud Observability Platform and what they are for — seeing which features are used and where people get stuck — and spells out what travels with each event: an anonymous visitor ID plus basic environment details such as network, region and device type. Notes, conversations and account details are never read.
### Fixed
- **Settings:** opening Settings in a short window no longer cuts the card off below the panel edge with no scrollbar. The card now scrolls on its own rail, and the note list gives up its height first, so the whole card still fits whenever the panel is tall enough.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **统计说明：** 设置开关现在写明统计通过腾讯云可观测平台完成，用途是找出常用功能和卡点；同时写明事件会带上匿名访客 ID，以及网络、地域、设备类型等基础环境信息；不读取便笺、对话或账号信息。
### 修复
- **设置：** 窗口偏矮时打开设置，设置卡不再被面板下沿裁掉、也没有滚动条。设置卡改为在面板内的轨道里滚动，列表先让出高度，面板够高时整张卡片仍然完整显示。
<!-- app-update-notes:zh:end -->

## 1.1.2-beta.5

<!-- app-update-notes:en:start -->
### Added
- **Privacy switch:** Settings now has a switch for anonymous usage statistics. Turning it off stops reporting immediately and sends one final event recording the choice; the preference is stored only in this browser.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 新增
- **隐私开关：** 设置里新增「匿名使用统计」开关。关闭后立即停止上报，并在关闭这一刻发送最后一条事件记录该选择；开关状态只保存在本机。
<!-- app-update-notes:zh:end -->

## 1.1.2-beta.4

<!-- app-update-notes:en:start -->
### Added
- **Anonymous usage statistics:** the panel reports a few anonymous events to Tencent Cloud RUM — panel opened (first / repeat), panel closed with a dwell-time bucket, settings opened, update checked (auto / manual + result), update started (host / market / copy-update-prompt + result), note created, completed/uncompleted, edited, deleted, forwarded, scope switched, and how many completed notes a clear removed. Events carry the scope kind and a `done` / `open` status only, plus an anonymous visitor id (`uin`) so the console can count unique users. Only custom events are reported: page performance, web vitals, global JS errors, API and asset speed stay off, the reported page name is a constant, and Do Not Track drops the reports.

### Changed
- **Footer:** the panel footer no longer names the Workspace/Session scope; both scopes now read “Notes are saved only on this device”, and the switch under the title says which list is showing.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 新增
- **匿名使用统计：** 面板会向腾讯云 RUM 上报几条匿名事件——打开面板（首次 / 再次）、关闭面板（停留时长按 `<5s` / `5-30s` / `30-120s` / `2-10m` / `>=10m` 分档）、打开设置、检查更新（自动 / 手动 + 结果）、开始更新（宿主 / 应用内市场 / 复制更新提示词 + 结果）、新建、完成/取消完成、编辑、删除、转发便笺，切换清单范围，以及一次清空删掉了多少条已完成。事件只带清单范围（`workspace` / `session`）、`done` / `open` 状态和一个匿名访客 ID（`uin`，用于统计 UV），不含便笺正文、会话 ID 或对话内容；只上报自定义事件，页面性能、web vitals、全局 JS 报错、接口与资源测速都关闭，页面名固定为常量，浏览器开启「请勿追踪」时丢弃上报。

### 变更
- **页脚：** 面板页脚不再区分工作区 / 会话，两种范围都显示「便笺数据仅保存在本地」；当前清单看标题下方的范围切换。

## 1.1.2-beta.3

<!-- app-update-notes:en:start -->
### Changed
- **Updating no longer requires the plugin market:** the card asks the host first and reads the market only when the host has no update route, so a DSH without the market can still update in-app. The terminal command now appears after an attempt finds no path, instead of whenever the market is missing.
- **No more "Restart DSH" button:** this panel does not own the host's lifecycle. After an update it offers a page reload and says the new version lands at the next start.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **更新不再依赖插件市场：** 卡片先问宿主，只有宿主没有更新路由时才去读市场，所以没装市场的 DSH 也能在应用内更新。终端命令改为「尝试过、确实无路可走」才出现，而不是一发现市场缺失就出现。
- **去掉「重启 DSH」按钮：** 宿主生命周期不归这个面板管。更新后提供刷新页面，并说明新版本在下次启动生效。
<!-- app-update-notes:zh:end -->

## 1.1.2-beta.2

<!-- app-update-notes:en:start -->
### Changed
- **Second beta:** 1.1.2-beta.2 follows the first beta so the in-app update can be exercised between two prerelease builds; nothing outside the update path changed.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **第二个 beta：** 1.1.2-beta.2 接在首个 beta 之后，用于验证两个预发布版本之间的应用内更新；除更新链路外没有其它行为变化。
<!-- app-update-notes:zh:end -->

## 1.1.2-beta.1

<!-- app-update-notes:en:start -->
### Changed
- **In-app update works on Desktop:** the panel now installs a newer build from the host instead of only asking the plugin market. The market replaces a package by removing it first, and Desktop refuses to remove a bundle that is in use — which this panel always is while it is open. The host installs over the running copy (DSH's installer, then `dsh plugin add`, then the profile's own package manager) and checks the version on disk before reporting success.
- **Update failures name their cause:** refusals such as `bundle-in-use`, `already-installed` and `management-required` now say what happened and offer the terminal command, instead of a bare "update failed".
- **Pre-release builds update themselves:** a build installed from the `next` dist-tag now reads that tag too, so a beta tester is offered the next beta (and its notes). Stable builds keep reading `latest` alone, so a pre-release can never reach a regular user.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **桌面端可在应用内更新：** 面板现在由宿主安装新版本，不再只依赖插件市场。市场的更新会先移除再安装，而桌面端不允许移除正在使用的插件——面板打开时恰好一直是这个状态。宿主改为就地覆盖（DSH 安装器 → `dsh plugin add` → profile 自带包管理器），并在报告成功前核对磁盘上的版本。
- **更新失败会说明原因：** `bundle-in-use`、`already-installed`、`management-required` 这类拒绝现在会讲清楚发生了什么，并给出终端命令，而不是只回一句"更新失败"。
- **预发布版可自我更新：** 从 `next` 标签安装的版本也会读取该标签，beta 测试者能收到下一个 beta 及其说明。稳定版仍只读 `latest`，预发布永远不会推给普通用户。
<!-- app-update-notes:zh:end -->

## 1.1.1

<!-- app-update-notes:en:start -->
### Changed
- **Update:** when the market refuses an update because an agent is running, the card now names that refusal and hands over the terminal command plus **Copy update prompt**, the same way it already did for a busy or missing market. The command does not go through the market, so it is the way to update while an agent runs.
- **Update copy:** the card calls the in-app update **automatic update** instead of naming the plugin market — “the market is running another update” read as an internal detail the user cannot act on.
- **Drafts follow the workspace:** unsaved add and edit drafts are shared by every conversation in a workspace, so switching conversations or the Workspace/Session switch never loses half-typed text; submitting still writes the list selected at that moment. Sessions outside a workspace keep their own draft, and the first workspace open after upgrading folds the current session's old draft into the shared one.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **更新：** 市场因「有 agent 正在运行」拒绝更新时，卡片现在会说明这一点，并像忙碌/无市场那样给出终端命令与「拷贝更新提示词」。该命令不经过市场，所以 agent 运行期间也能更新。
- **更新文案：** 卡片把应用内更新称为**自动更新**，不再直呼插件市场——「市场正在执行另一个更新」读起来像用户无法处置的内部细节。
- **草稿跟随工作区：** 工作区内所有会话共用一份新增/编辑草稿，切换会话或在「工作区 / 会话」之间切换都不会丢字；提交时仍写入当前选中的清单。工作区之外的会话按会话保存草稿，升级后首次打开工作区会把当前会话的旧草稿并入共享草稿。
<!-- app-update-notes:zh:end -->

## 1.1.0

<!-- app-update-notes:en:start -->
### Added
- **Workspace-shared notes:** sessions in one workspace now read and write a single list, so switching conversations keeps the same tasks in view. Notes already recorded per session are folded in once on first open; sessions outside a workspace keep their own list.
- **Forward to the open conversation:** forwarding a shared note appends it to the composer of the conversation currently on screen, not the one the panel was opened from.
- **Workspace / session switch:** the panel header switches between the workspace list and the current session's list; the choice is remembered across panel openings.
- **Separate storage keys:** session notes stay under `dsh.aside-note` with their original shape, while workspace notes live under `dsh.aside-note.workspaces`; adding the workspace list never rewrites existing session data.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 新增
- **工作区共享：** 同一工作区的会话现在共用一份清单，切换会话也能接着看同一批事项；首次打开时会把各会话已有的便笺合并一次，工作区之外的会话仍各自独立。
- **转发到当前会话：** 共享便笺会追加到当前屏幕上打开的会话输入框，而不是面板最初打开时所在的会话。
- **工作区 / 会话切换：** 面板顶部可在工作区清单与当前会话清单之间切换，选择会被记住，下次打开沿用。
- **独立存储键：** 会话便笺仍保存在 `dsh.aside-note`，结构不变；工作区清单使用 `dsh.aside-note.workspaces`，新增工作区不会改写原有会话数据。
<!-- app-update-notes:zh:end -->

## 1.0.3

<!-- app-update-notes:en:start -->
### Fixed
- **Install:** the one-command installer runs `pnpm install` through the node and pnpm DeepSeek Harness ships (it falls back to the pnpm on PATH, and `DSH_RUNTIME_DIR` pins a runtime), so a profile is never written by another pnpm major — which surfaced as `ERR_PNPM_UNEXPECTED_STORE` on the host's next install. When pnpm asks to purge a store left by another major it re-runs once with `CI=true`.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 修复
- **安装：** 安装器改用 DeepSeek Harness 自带的 node 与 pnpm 执行 `pnpm install`（找不到运行时回退到 PATH 上的 pnpm，可用 `DSH_RUNTIME_DIR` 指定），避免 profile 被另一个主版本的 pnpm 写入、导致宿主下次安装报 `ERR_PNPM_UNEXPECTED_STORE`；pnpm 要求清空旧 store 时会自动用 `CI=true` 重跑一次。
<!-- app-update-notes:zh:end -->

## 1.0.2

<!-- app-update-notes:en:start -->
### Fixed
- **Update:** when the market is busy with another operation, “Update now” waits and retries before reporting it. If the market stays busy — or is not installed at all — the card now states the command (`npx -y dsh-aside-note install`, or the Plugins page) and offers **Copy update prompt**, instead of stopping at “another update is already running — try again shortly”.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 修复
- **更新：** 市场正在执行别的操作时，「立即更新」会先等待并重试；如果市场一直忙、或根本没有安装市场，卡片不再停在「市场正在执行另一个更新，请稍后再试」，而是直接给出命令（`npx -y dsh-aside-note install`，或到「插件」页更新），并提供「拷贝更新提示词」。
<!-- app-update-notes:zh:end -->

## 1.0.1

<!-- app-update-notes:en:start -->
### Changed
- **Install:** the installer now closes by telling the user that the 旁边记 entry sits at the top right of the conversation after install — no restart — and, when it is still missing, to refresh the Plugins page and toggle the plugin off and on once, which recomposes the running host.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **安装：** 安装器结束时不再只说「无需重启」，而是明确告诉用户安装后会话右上角即可看到「旁边记」；入口没出现时，到「插件」页刷新并把插件关闭再开启一次，运行中的 Host 会随之重新组合。
<!-- app-update-notes:zh:end -->

## 1.0.0

<!-- app-update-notes:en:start -->
### Changed
- **Naming:** the Chinese product name is now **旁边记** (English: AsideNote) with the tagline “让想法留在对话旁边” / “Keep your ideas beside the conversation”. The panel title, empty state and composer placeholder carry the new name, and Settings › About shows the tagline.
- **Storage:** local storage keys now follow the package name: the notes key is `dsh.aside-note`, with `.drafts`, `.forwarded`, `.sections`, `.panel-width`, `.panel-height`, `.send-shortcut` and `.forward-prefix` beside it. The old `dsh.aside-notes.*.v2` keys and the 1.x `dsh.session-memos.v1` / `dsh.memo.*.v1` keys are not read or migrated; rename your data under `localStorage` after upgrading to keep it.
- **Install:** the installer defaults to `^1.0.0` now, so a fresh `npx dsh-aside-note install` follows the stable 1.x line instead of pinning the profile to 0.9.x.

### Fixed
- **Update check:** a manual check no longer flashes the running version as a newly available release before settling on “up to date”.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **命名：** 产品中文名定为**旁边记**（英文名沿用 AsideNote），slogan 为「让想法留在对话旁边」。浮窗标题、空状态与输入占位改用新名字，设置 › 关于展示 slogan。
- **存储：** 本地存储键统一到包名：便笺键为 `dsh.aside-note`，其余为 `.drafts`、`.forwarded`、`.sections`、`.panel-width`、`.panel-height`、`.send-shortcut` 与 `.forward-prefix`。旧的 `dsh.aside-notes.*.v2` 与 1.x 的 `dsh.session-memos.v1` / `dsh.memo.*.v1` 键不再读取，也不自动迁移；升级后如需保留数据，请在 `localStorage` 中手动改名。
- **安装：** 安装器默认范围改为 `^1.0.0`，`npx dsh-aside-note install` 会接入稳定的 1.x 线，而不是把 profile 固定在 0.9.x。

### 修复
- **检查更新：** 手动检查不会再先把当前版本短暂显示为新版本，再回到「已是最新版本」。
<!-- app-update-notes:zh:end -->

## 0.9.10

<!-- app-update-notes:en:start -->
### Changed
- **Identity:** the npm package, plugin id and repository are now `dsh-aside-note`; install with `npx dsh-aside-note install`. Storage keys (`dsh.aside-notes.*.v2`) and CSS prefixes are unchanged, so existing notes and settings carry over.
- **First public release:** 0.9.9 was withdrawn before it became public; this version starts the name cleanly.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 变更
- **命名：** npm 包名、插件 id 与仓库统一为 `dsh-aside-note`；安装命令为 `npx dsh-aside-note install`。存储键（`dsh.aside-notes.*.v2`）与 CSS 前缀保持不变，已有便笺和设置直接沿用。
- **首个公开版本：** 0.9.9 在公开前已撤回，本版本以新名字重新开始。
<!-- app-update-notes:zh:end -->

## 0.9.9

<!-- app-update-notes:en:start -->
### Added
- **Panel:** a top-right header entry with an open-count badge opens a floating, resizable right panel; Open and Completed keep their own sticky, collapsible sections, and the panel size, drafts and section state are restored per session.
- **Notes:** quick add, edit, complete, copy, forward to the composer, delete, and clear completed behind an inline confirmation; the composer and editor grow with wrapped text.
- **Settings:** a send/newline shortcut (⌘ or Ctrl aware), a one-click forward prefix, the version and author in About, and the full Chinese/English copy from one dictionary.
- **Update centre:** Settings › About checks npm (npmmirror, then the GitHub Release fallback), lists pending releases newest-first, and updates in place through the plugin market with a refresh hint.
- **Installer:** `npx dsh-aside-note install` (`scripts/install.mjs`, shipped as the package's `bin`) resolves the DSH profile (`DSH_PROFILE_DIR`, `--profile`, `--profile-dir`), backs up the manifest and lockfile, adds the dependency plus the `dsh.profile.bundles` entry, runs `pnpm install` and verifies the installed `client/client.js`; `--dry-run` and `--no-install` keep it reviewable and re-running is idempotent. `docs/install-prompt.md` carries a shareable agent prompt, and a page reload is enough after install or upgrade.

### Changed
- **Design:** the panel is rebuilt on DSH semantic tokens — a 12/13/14 type scale at weight 500 or less, 0.5px hairlines, shared radii and elevation, the DSH scrollbar skin, and hover styles gated behind `@media (hover:hover)` — with feedback routed through `shell.overlay` toasts.
- **Identity:** renamed 一点待办 → Memo → Notes → **AsideNote** (`dsh-aside-note`); storage moved to `dsh.aside-notes.*.v2` with a one-time copy of 1.x data, and the old keys are kept so a rollback still works.
<!-- app-update-notes:en:end -->

<!-- app-update-notes:zh:start -->
### 新增
- **面板：** 右上角标题栏入口带未完成计数角标，点开是可拖拽缩放的浮动右侧面板；「未完成」「已完成」各自保留可折叠的吸顶分组，面板尺寸、草稿和分组状态按会话恢复。
- **便笺：** 快速添加、编辑、完成、复制、转发到输入框、删除，以及带内联确认的清空已完成；输入框与编辑器会随换行自动增高。
- **设置：** 发送/换行快捷键（识别 ⌘ 与 Ctrl）、一键转发前缀、关于区的版本与作者，以及由同一份词典提供的中英文文案。
- **更新中心：** 设置 › 关于 会检查 npm（失败时回退 npmmirror，再到 GitHub Release），按版本从新到旧列出待更新说明，并通过插件市场就地更新、完成后提示刷新。
- **安装工具：** `npx dsh-aside-note install`（`scripts/install.mjs`，随包发布为 `bin`）会定位 DSH profile（支持 `DSH_PROFILE_DIR`、`--profile`、`--profile-dir`）、备份清单与 lockfile、写入依赖和 `dsh.profile.bundles` 条目、执行 `pnpm install` 并校验安装后的 `client/client.js`；`--dry-run` 与 `--no-install` 便于先审阅，重复执行是幂等的。`docs/install-prompt.md` 提供可直接交给 agent 的安装提示词；安装或升级后刷新页面即可，无需重启。

### 变更
- **设计：** 面板改用 DSH 语义 token 重建——12/13/14 字号、字重不超过 500、0.5px 描边、统一圆角与投影、DSH 滚动条皮肤，悬停样式只在支持悬停的设备生效，操作反馈统一走 `shell.overlay` toast。
- **命名：** 一点待办 → Memo → Notes → **AsideNote**（`dsh-aside-note`）；存储迁移到 `dsh.aside-notes.*.v2`，首次加载时复制 1.x 数据，旧键保留以便回退。
<!-- app-update-notes:zh:end -->
