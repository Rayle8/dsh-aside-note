# 旁边记（AsideNote）自动化验收测试 SOP

本文件固定「改完代码 → 独立 profile 验收 → 出报告」这一条流程：不碰正在用的 `desktop` profile，
不复制任何凭据，测试产物全部落在工作树的 `.test/`（已 gitignore，不提交）。照此执行，任何 agent
都能得到同一种报告和同一张 UI 证据图。

**什么时候跑：** 每次要交给作者验收之前跑一遍；发版前再跑一遍，作为 `npm run release` 之前的一道闸。
只跑 `npm test` 不够——它不验证「插件真的能被 DSH 加载、面板真的能开」。

## 1. 产物与目录约定

一次运行 = 一个时间戳目录：

```text
.test/<YYYYMMDD-HHMMSS>/
├── result.md              # 报告（环境、结论、检查项、截图引用）
├── assets/
│   ├── snapshot.png       # 整窗 UI 冒烟截图（入口角标 + 面板 + 便笺）
│   ├── panel.png          # 面板特写（按 popover 矩形从同一页面裁切）
│   └── checks.json        # 机读检查结果
├── logs/
│   ├── test.log           # npm test 原始输出
│   └── ui.log             # UI 冒烟逐步日志（PASS/FAIL 行）
└── work/                  # 临时现场，跑完可删
    ├── dshhome/           # 隔离 DSH_HOME（保留可对照 profile 内容）
    ├── cwd/               # 临时工作目录（充当 default workspace）
    └── ui-smoke.mjs       # 本次用的 UI 冒烟脚本
```

`.test/` 已在 `.gitignore` 里；`result.md` 只引用相对路径 `assets/…`，整个目录可整体删除。

## 2. 前置条件

- macOS，已安装 DeepSeek Harness 与 Google Chrome；
- Node **24.13.0**（`engines` 要求 `^22.18.0 || >=24.11.0`；系统默认 Node 20 会直接起不来 CDP 驱动，
  因为全局 `WebSocket` 不存在）：
  ```bash
  export PATH="$HOME/.nvm/versions/node/v24.13.0/bin:$PATH"
  ```
- 在**工作树**里执行（不要在主工作区跑，避免覆盖正在进行的改动）；
- 端口 `61397`（DSH web）与 `9222`（Chrome CDP）空闲。

默认路径（可用环境变量覆盖）：

| 变量 | 默认值 |
| --- | --- |
| `DSH_CLI` | `/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh` |
| `CHROME` | `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` |
| `PORT` | `61397` |
| `CDP_PORT` | `9222` |
| `PROFILE` | `aside-note-wt` |

## 3. 流程总览

| 步骤 | 动作 | 产物 |
| --- | --- | --- |
| 0 | 准备工作树：确认分支、装依赖 | `node_modules/` |
| 1 | `npm test` 跑仓库自带套件 | `logs/test.log` |
| 2 | 建隔离 profile 并 `link:` 挂载本工作树插件 | `work/dshhome/profiles/aside-note-wt` |
| 3 | 起 DSH web，取启动日志里的 token | `work/server.log` |
| 4 | 起 headless Chrome（CDP） | `work/chrome.log` |
| 5 | 跑 UI 冒烟：入口、面板、写便笺、角标、持久化 | `assets/snapshot.png`、`assets/panel.png`、`assets/checks.json`、`logs/ui.log` |
| 6 | 写 `result.md` | `result.md` |
| 7 | 停服务、删 Chrome 现场、报告路径 | — |

## 4. 步骤详解

### 步骤 0：准备工作树

```bash
REPO=$(git rev-parse --show-toplevel)     # 必须是工作树，不是主仓
cd "$REPO"
git rev-parse --abbrev-ref HEAD           # 报告里要写分支与 HEAD
git rev-parse HEAD
node -v                                   # 必须是 v24.13.0
npm ci                                    # .npmrc 已带 legacy-peer-deps=true
```

### 步骤 1：自动化测试

```bash
TS=$(date +%Y%m%d-%H%M%S); OUT="$REPO/.test/$TS"; WORK="$OUT/work"
mkdir -p "$OUT/assets" "$OUT/logs" "$WORK/dshhome" "$WORK/cwd"
npm test > "$OUT/logs/test.log" 2>&1; TEST_EXIT=$?
grep -E "^ℹ (tests|pass|fail|duration_ms)" "$OUT/logs/test.log"
```

判定：`test_exit=0` 且 `fail 0`。否则直接把 `logs/test.log` 末尾贴进报告，流程到此为止。

### 步骤 2：隔离 profile（不动 desktop）

```bash
PROFILE=aside-note-wt
DSH_HOME="$WORK/dshhome" "$DSH_CLI" --profile "$PROFILE" --from-default-profile web --dump-config > "$WORK/profile.dump.log" 2>&1

cat > "$WORK/dshhome/profiles/$PROFILE/package.json" <<JSON
{
  "name": "dsh-profile-$PROFILE",
  "private": true,
  "dependencies": { "dsh-aside-note": "link:$REPO" },
  "dsh": { "profile": { "bundles": ["@deepseek-ai/dsh-base", "@deepseek-ai/dsh-web-app", "dsh-aside-note"] } }
}
JSON

DSH_HOME="$WORK/dshhome" "$DSH_CLI" plugin --profile "$PROFILE" install --offline --store-dir "$WORK/pnpm-store" > "$WORK/install.log" 2>&1
```

自检（写进报告）：`link:` 必须解析回工作树，且 profile 内 `client/client.js` 与工作树同名文件
**sha256 一致**——这才能证明加载的是本分支产物，而不是 npm 上的同版本：

```bash
P="$WORK/dshhome/profiles/$PROFILE"
readlink "$P/node_modules/dsh-aside-note"
shasum -a 256 "$P/node_modules/dsh-aside-note/client/client.js" "$REPO/client/client.js"
DSH_HOME="$WORK/dshhome" "$DSH_CLI" --profile "$PROFILE" --dump-config | grep -n "dsh-aside-note"
```

### 步骤 3：起 DSH web，取 token

```bash
(cd "$WORK/cwd" && DSH_HOME="$WORK/dshhome" exec "$DSH_CLI" --profile "$PROFILE" --no-open --port "$PORT") \
  > "$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 40); do
  TOKEN=$(grep -o "token=[A-Za-z0-9_-]*" "$WORK/server.log" | head -1 | cut -d= -f2 || true)
  [ -n "${TOKEN:-}" ] && break
  sleep 1
done
[ -n "${TOKEN:-}" ] || { echo "no token; see $WORK/server.log"; exit 1; }
APP_URL="http://127.0.0.1:$PORT/?token=$TOKEN"
```

注意：不带 token 访问会得到 `401 dsh web authentication required`，这是正常的，不要以为服务挂了。

### 步骤 4：起 headless Chrome

```bash
"$CHROME" --headless=new --no-sandbox --disable-gpu \
  --remote-debugging-port="$CDP_PORT" --user-data-dir="$WORK/chrome" \
  --window-size=1440,1043 --force-device-scale-factor=2 --hide-scrollbars about:blank \
  > "$WORK/chrome.log" 2>&1 &
CHROME_PID=$!
for _ in $(seq 1 30); do
  curl -sf "http://127.0.0.1:$CDP_PORT/json/version" > /dev/null && break
  sleep 1
done
```

`--force-device-scale-factor=2` 让 1440×1043 的窗口产出 2880×1800 的 PNG；想看更小的图就改成 1。

### 步骤 5：跑 UI 冒烟 + 截图

把附录 A 的脚本存为 `$WORK/ui-smoke.mjs`，然后：

```bash
REPO="$REPO" APP_URL="$APP_URL" OUT="$OUT/assets" LOGS="$OUT/logs" \
  node "$WORK/ui-smoke.mjs"; UI_EXIT=$?
```

脚本走真实 UI：清空插件本地存储并重载 → 需要时发一条消息让对话头出现 → 点头部入口 →
打开面板 → 在真实输入框写一条便笺并回车 → 断言列表/持久化/角标 → 整窗截图 → 按面板矩形裁特写。
7 项检查全部输出到 `logs/ui.log` 与 `assets/checks.json`。

### 步骤 6：写 `result.md`

用第 6 节的模板，把环境、两条测试结论、截图引用写进去。**截图必须在报告里直接引用**，例如：

```markdown
![UI 冒烟整窗截图](assets/snapshot.png)
```

截图是暗色还是亮色跟随系统主题，不必强求；报告里说明「1440×1043 @2x」即可。

### 步骤 7：清理

```bash
kill "$SERVER_PID" "$CHROME_PID" 2>/dev/null || true
for pid in $(lsof -ti tcp:$PORT tcp:$CDP_PORT 2>/dev/null); do kill "$pid" 2>/dev/null || true; done
rm -rf "$WORK/chrome" "$WORK/chrome.log"       # 浏览器现场约 80MB
# 保留 dshhome（几十 KB）供对照；要彻底清就删整个 .test/<ts>
```

## 5. 检查项与判定

| # | 检查 | 失败通常意味着 |
| --- | --- | --- |
| 1 | 无 `Failed to load plugins` 提示 | bundle 语法/加载错误，先看 `work/server.log` 与页面控制台 |
| 2 | 头部入口挂载（`.dsh-an-headerBtn`） | `headerEntry` 没跑，或当前没有对话（先发一条消息） |
| 3 | 面板可打开（`.dsh-an-popover`） | 渲染/挂载逻辑坏了，或入口点击被拦 |
| 4 | 便笺经 UI 写入后出现在列表（`.dsh-an-row`） | 输入框事件或 store 写入坏了 |
| 5 | 便笺持久化到 `dsh.aside-note.workspaces` | 存储层坏了，或 scope 选错（会话/工作区） |
| 6 | 角标显示未完成数 `1` | 计数刷新时序或 `header.tooltip` 文案回归 |
| 7 | 入口 `aria-label` 带计数 | i18n 文案缺 key |

判定标准：`npm test` 100/100 且 UI 冒烟 7/7 才写「PASS」；任一项失败都要写「FAIL」并把失败项与日志
位置写进报告，**不要**用「大部分通过」这类模糊结论。

## 6. `result.md` 模板

```markdown
# 旁边记 dsh-aside-note · 自动化测试报告

- 运行时间：YYYY-MM-DD HH:MM – HH:MM（Asia/Shanghai）
- 结论：**PASS / FAIL**（单元/契约测试 X/Y，UI 冒烟 A/B）
- 测试对象：分支 `<branch>` @ `<commit>`，插件版本 `<version>`
- 报告目录：`.test/<ts>/`（已加入 `.gitignore`，未提交）

## 1. 环境
| 项 | 值 |
| --- | --- |
| 工作树 | `<repo>` |
| 分支 / HEAD | `<branch>` / `<commit>` |
| Node | v24.13.0 |
| DSH | `<dsh --version>` |
| Chrome | `<CDP /json/version 里的 Browser>` |

## 2. 隔离 profile 与插件挂载
- profile：`aside-note-wt`，bundles = base + web-app + dsh-aside-note
- `link:` 指向工作树；profile 内 `client/client.js` 与工作树 sha256 一致：`<hash>`

## 3. 自动化测试
`npm test` → tests X / pass X / fail 0 / `<duration>`（[logs/test.log](logs/test.log)）

## 4. UI 冒烟
7 项检查与结果：[assets/checks.json](assets/checks.json)，步骤日志：[logs/ui.log](logs/ui.log)

![UI 冒烟整窗截图](assets/snapshot.png)

![旁边记面板特写](assets/panel.png)

## 5. 说明
- 隔离 profile 无凭据；对话轮次显示 `MISSING_CREDENTIAL` 属预期，不影响面板检查。
- 未复制凭据、未提交代码；临时服务与 Chrome 已停止。
```

## 7. 失败排查

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| `WebSocket is not defined` | 用了默认 Node 20 | `export PATH=…/v24.13.0/bin:$PATH` 后重跑 |
| 页面 `401 authentication required` | 没带 token 或 token 过期 | 重启服务，从 `work/server.log` 重新取 |
| `no token; see server.log` | 端口被占 / profile 起不来 | `lsof -ti tcp:61397` 清端口；看 server.log 的报错 |
| 头部入口一直不存在 | 当前没有对话（空会话没有 conversation header） | 脚本会先发一条消息；若仍失败，检查 composer 选择器 |
| 截图里是 `MISSING_CREDENTIAL` | 隔离 profile 没有 API Key | 预期行为；需要真实回复时才 `COPY_CREDENTIALS=1`（须用户明确同意） |
| `.test/` 内容突然消失 | 有人跑了 `git clean -fd`（忽略文件不受影响，但未忽略时会） | 确认 `.gitignore` 里有 `.test/` |
| `npm ci` 失败 | 锁文件与 registry 不匹配 | `npm install` 重试；报告里记录失败即可 |

## 8. 安全边界

- 只在工作树里跑；不读写主工作区的会话与 `.dsh/storages`。
- **不复制** `~/.dsh/.credentials.yaml` 到临时 home；确需真实回复时先征得用户同意，并在报告里注明。
- 不改现有的 `desktop`/`web` profile；临时 profile 只存在于 `.test/<ts>/work/dshhome`。
- 不提交任何东西：`.test/` 在 `.gitignore` 里；报告与截图随目录可整体丢弃。

## 附录 A：UI 冒烟脚本（`ui-smoke.mjs`）

```js
// UI smoke test for the linked worktree build of dsh-aside-note.
// env: REPO（工作树根）, APP_URL, OUT（assets 目录）, LOGS（logs 目录）
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const { connect, evaluate, shot, sleep } = await import(
  pathToFileURL(`${process.env.REPO}/tools/screenshots/lib/cdp.mjs`).href
)

const out = process.env.OUT
const logs = process.env.LOGS
fs.mkdirSync(out, { recursive: true })
fs.mkdirSync(logs, { recursive: true })
const log = (...a) => { const line = `[${new Date().toISOString()}] ${a.join(' ')}`; console.log(line); fs.appendFileSync(path.join(logs, 'ui.log'), line + '\n') }

const checks = []
const check = (name, ok, detail = '') => { checks.push({ name, ok: !!ok, detail: String(detail ?? '') }); log(ok ? 'PASS' : 'FAIL', name, detail ?? '') }

const s = await connect()
await s.send('Page.navigate', { url: process.env.APP_URL })
await sleep(7000)

const clickText = t => evaluate(s, `(() => { const el=[...document.querySelectorAll('button,[role=button],a')].find(e=>e.textContent.trim()===${JSON.stringify(t)}); if(el) el.click(); return !!el })()`)
const pressEnter = async () => {
  await s.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' })
  await s.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
}
const NOTE = '自动化冒烟：面板入口、输入与列表渲染正常'

await clickText('继续')
// Deterministic start: wipe the plugin's local store, then reload.
await evaluate(s, `(() => { localStorage.removeItem('dsh.aside-note.workspaces'); localStorage.removeItem('dsh.aside-note.drafts'); return true })()`)
await s.send('Page.reload')
await sleep(7000)
await clickText('继续')
await sleep(800)

check('no "Failed to load plugins" banner', !(await evaluate(s, `document.body.innerText.includes('Failed to load plugins')`)))

// The conversation header (and our entry) only exists once a session has a turn.
if (!(await evaluate(s, '!!document.querySelector(".dsh-an-headerBtn")'))) {
  await evaluate(s, `(() => { const el = document.querySelector('textarea,[contenteditable=true],[role=textbox]'); el.focus(); return true })()`)
  await s.send('Input.insertText', { text: 'UI 冒烟测试：验证旁边记入口是否挂载' })
  await sleep(600)
  await pressEnter()
  await sleep(9000)
}

check('header entry mounted by the plugin', await evaluate(s, '!!document.querySelector(".dsh-an-headerBtn")'))

await evaluate(s, '(() => { document.querySelector(".dsh-an-headerBtn").click(); return true })()')
await sleep(1500)
check('panel opened', await evaluate(s, '!!document.querySelector(".dsh-an-popover")'))

await evaluate(s, '(() => { const ta = document.querySelector(".dsh-an-input"); ta.focus(); return true })()')
await s.send('Input.insertText', { text: NOTE })
await sleep(500)
await pressEnter()
await sleep(2500)

check('note rendered in the list', await evaluate(s, `[...document.querySelectorAll('.dsh-an-row')].some(r => r.innerText.includes(${JSON.stringify(NOTE)}))`))
check('note persisted to localStorage', await evaluate(s, `(localStorage.getItem('dsh.aside-note.workspaces') || '').includes(${JSON.stringify(NOTE)})`))
check('header badge shows the open count', await evaluate(s, `document.querySelector('.dsh-an-headerCount')?.textContent?.trim() === '1'`))
check('entry tooltip carries the count', await evaluate(s, `/1 项未完成/.test(document.querySelector('.dsh-an-headerBtn')?.getAttribute('aria-label') || '')`))

await sleep(500)
await shot(s, path.join(out, 'snapshot.png'))
// Panel close-up cropped from the live page, not a doctored DOM.
const rect = await evaluate(s, `(() => { const r = document.querySelector('.dsh-an-popover').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height } })()`)
const { data } = await s.send('Page.captureScreenshot', { format: 'png', fromSurface: true, clip: { ...rect, scale: 2 } })
fs.writeFileSync(path.join(out, 'panel.png'), Buffer.from(data, 'base64'))

fs.writeFileSync(path.join(out, 'checks.json'), JSON.stringify({ at: new Date().toISOString(), checks }, null, 2))
s.ws.close()
const failed = checks.filter(c => !c.ok)
console.log(failed.length ? `FAILED ${failed.length}/${checks.length}` : `ALL ${checks.length} CHECKS PASSED`)
process.exit(failed.length ? 1 : 0)
```

## 附录 B：给 agent 的下发指令模板

> 按 `docs/auto-test-sop.md` 跑一遍旁注插件的自动化验收测试：
> 在工作树里建 `.test/<timestamp>/`，先 `npm test`，再用隔离 DSH profile（`aside-note-wt`，`link:` 本工作树）
> 起 web + headless Chrome 跑 UI 冒烟，产出 `result.md`、`assets/snapshot.png`、`assets/panel.png`。
> 不要碰 desktop profile，不要复制凭据，不要提交任何东西；跑完告诉我结论与报告路径。

## 参考

- 截图流程：[`screenshot-sop.md`](./screenshot-sop.md)（本 SOP 复用了其中的 `lib/cdp.mjs` 与隔离 profile 思路）
- 首次执行记录：`.test/20261112-181000/result.md`（工作树内，未提交）
