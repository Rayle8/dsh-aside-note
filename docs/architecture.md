# 旁边记（AsideNote）架构

面向维护者的结构说明。界面约束见 [面板 UI 规则](./panel-ui-rules.md)，截图流程见 [截图 SOP](./screenshot-sop.md)。

## 1. 形态与运行时契约

旁边记的**数据与界面全部在浏览器半侧**；宿主半侧只做浏览器做不到的一件事——把新版本装进 profile（见 §8）。`index.js` 因此仍然保留 `cordis.patch.yml` 需要的那一行，同时在宿主里注册两个更新端点，不读写任何便笺数据。

- `package.json` 的 `dsh.bundle.patch` 指向 `cordis.patch.yml`，`dsh.client` 声明 `./client` 与需要预注入的宿主模块。
- 壳把 `./client`（即 `client/client.js`）当 classic script 加载：`window.__ModuleLoader__.load({ id, factory })`。`factory(require)` 里的 `require` 绑定到冻结的模块表，只认 `react`、`react/jsx-runtime`、`react-dom`、`react-dom/client`、`@deepseek-ai/dsh-client-ui-primitives`；其余依赖全部内联。
- 样式是 `import css from './styles/panel.css?inline'`，由入口在 `apply()` 里插入**一张** `<style data-dsh-plugin="dsh-aside-note">`，dispose 时移除。面板与输入框 dock 不在同一棵 React 树里，所以不能做面板级 `<style>`。
- 只依赖两个服务：`slots`（`conversation.composer.dock` 捕获当前会话、`shell.overlay` 承载全局 Toast）与 `locale`（注册字典、绑定 `t`）。
- 顶部入口是注入宿主 header 的原生 DOM 按钮，不是 React portal——宿主重渲染会回收 portal。

## 2. 目录

```text
src/client/
├─ index.ts              # apply(ctx)：样式、locale、slot 注册、入口、Toast 座位
├─ constants.ts          # 包身份、存储键、上限、平台相关常量
├─ scope.ts              # 会话 → 工作区绑定；按工作区/会话选择解析清单，工作区外回落会话
├─ dsh.d.ts              # 宿主 ctx / locale / slots 的最小 ambient 类型
├─ i18n/                 # zh.ts（键的唯一来源）、en.ts、index.ts（fill / makeSay）
├─ domain/               # id、clipboard、forward（写回输入框）、items（归一化/排序/时间）
├─ storage/              # codec、events（同标签页总线）、session、workspace、drafts、forwarded、prefs
├─ ui/                   # 面板外壳与纯展示组件、hooks、primitives、定位
│                        # 更新中心：useUpdateCenter（检查/说明/更新与命令兜底）、UpdateNotice
├─ update/               # latest（版本与 Release 探测）、releaseNotes（标记解析）、
│                        # releaseHistory（多版本区间）、
│                        # host（宿主更新端点客户端）
└─ styles/panel.css      # 全局 .dsh-an-* 规则与 --an-* 尺度
host/                    # 宿主半边：route（两个更新端点）、apply-update（三级安装）、
                         # profile（定位与版本读取）、versions（版本比较）、exec（进程）
client/client.js         # tsdown 产物，入库，CI 校验与源码一致
index.js                 # 宿主半侧：只注册更新端点，无状态
cordis.patch.yml         # profile 组合里的一行
tests/                   # contract.test.mjs（契约）+ bundle.test.mjs（jsdom 集成）
tools/screenshots/       # 截图流水线（见 screenshot-sop.md）
docs/assets/             # README 截图（preview-* 与 features/）
```

## 3. 模块职责

| 层 | 模块 | 职责 |
| --- | --- | --- |
| 入口 | `index.ts` | 注入样式 → 注册字典 → 座位入口/Toast/slot |
| 身份 | `constants.ts` | 包与插件的 id、`dsh-an-*` 相关的键与上限 |
| 文案 | `i18n/` | `zh.ts` 定义键集合与 `MessageKey`；`en.ts` 用 `Record<MessageKey, string>`，缺键编译失败 |
| 领域 | `domain/items.ts` | `normalizeItems`（防御性清洗、去重、上限）、排序、相对时间文案 |
| 领域 | `domain/forward.ts` | 把便笺写回**当前会话**的 Lexical contenteditable 或 textarea，保留光标与换行语义；按 `[data-conversation-session]` 限定输入框 |
| 存储 | `storage/session.ts` | 会话便笺库（`sessions`）的读写；保持原 `dsh.aside-note` 的 v1 键与结构，写失败返回 `false`，由调用方保留 UI 原状并报 Toast |
| 存储 | `storage/workspace.ts` | 工作区清单（`dsh.aside-note.workspaces`）读写；首次见到工作区时把成员会话的旧便笺一次性并入，`seededSessionIds` 防重复 |
| 范围 | `scope.ts` | 记录 dock 当前会话的归属；按保存的「工作区 / 会话」选择解析清单，工作区外始终回落到会话 |
| 更新 | `update/latest.ts` | npm → npmmirror → GitHub Release 的版本探测（1 小时缓存），按版本读取 Release 正文 |
| 更新 | `update/releaseNotes.ts` | 提取 `app-update-notes` 标记块、按语言回退、压平 Markdown、上限兜底 |
| 更新 | `update/releaseHistory.ts` | 从 releases feed 选出「本地 < 版本 ≤ 最新」的区间，剔除草稿/预发布，倒序与上限 |
| 更新 | `ui/useUpdateCenter.ts` | 自动/手动检查、懒加载说明、更新状态机（starting/running/done/error）；只走宿主更新端点，没有市场分支 |
| 更新 | `ui/UpdateNotice.ts` | 关于区里的更新卡片：说明展开、完整说明链接、立即更新/刷新，宿主没有路由或拒绝时改为带版本号的命令 + 拷贝更新提示词 |
| 存储 | `storage/prefs.ts` | 面板宽高、工作区/会话范围、发送快捷键、前缀、分区状态 |
| UI 组件 | `ui/MemoPopover.ts` | 面板编排：组合 hook 与展示组件，portal 到 body |
| UI 组件 | `PanelHead` / `ScopeSwitch` / `SettingsPanel` / `ComposerForm` / `NoteList` / `ClearConfirm` / `TodoRow` / `EmptyState` | 纯展示，数据与回调由面板传入 |
| UI hooks | `useSessionMemoStore` / `usePanelGeometry` / `useSections` / `useForwardMarks` / `usePanelSettings` / `useComposerDraft` / `useNoteActions` / `useClearConfirm` / `useListEdge` / `useOutsideDismiss` | 把状态与副作用从 JSX 里分离；每个 hook 只做一件事 |
| UI 基础设施 | `primitives` / `position` / `toastSeat` / `headerEntry` | 共享图标与 Tooltip、浮层定位与吸顶、跨面板 Toast、宿主 header 入口 |

约定：`domain/` 与 `storage/` 不 import React；需要 React 的状态放 `ui/use*.ts`。浏览器半侧不碰 Node 内置模块与 `process`（契约测试会拦）。

## 4. 数据模型

所有数据在**当前浏览器**的 `localStorage`。同一个工作区默认共享一份清单与一份未提交草稿，面板头部可在工作区清单与当前会话清单之间切换；没有工作区的会话只有会话清单。

| 键 | 内容 |
| --- | --- |
| `dsh.aside-note` | `{ version: 1, sessions: { [sessionId]: { sessionId, updatedAt, items: Note[] } } }`（会话键保持原结构） |
| `dsh.aside-note.workspaces` | `{ version: 1, workspaces: { [workspaceId]: { workspaceId, updatedAt, items: Note[], seededSessionIds: string[] } } }` |
| `dsh.aside-note.scope-mode` | `workspace`（工作区，默认）或 `session`（当前会话） |
| `dsh.aside-note.drafts` | `{ version: 1, sessions: { [draftKey]: { add, edits: { [itemId]: text } } } }`；`draftKey` 为 `ws:<workspaceId>`（工作区共享）或会话 ID |
| `dsh.aside-note.forwarded` | `{ version: 1, sessions: { [listKey]: { [itemId]: true } } }`；`listKey` 为 `ws:<workspaceId>` 或会话 ID |
| `dsh.aside-note.sections` | `{ open, done }` |
| `dsh.aside-note.panel-width` / `panel-height` | 数字；高度 `0` 表示内容自适应 |
| `dsh.aside-note.send-shortcut` | `enter` 或 `ctrl-enter` |
| `dsh.aside-note.forward-prefix` | 最长 80 字符的转发前缀 |

草稿按 `draftKey` 存放：会话属于工作区时，整个工作区共用一份新增/编辑草稿，切换会话或在「工作区 / 会话」之间切换都不丢字；没有工作区的会话按会话保存。提交草稿时仍按当前选中的范围写入 `dsh.aside-note.workspaces` 或 `dsh.aside-note`，草稿本身不区分范围。升级后首次打开工作区，会把当前会话的旧草稿并入共享键并清理成员会话的旧副本。

`Note` 形如 `{ id, text, done, createdAt, updatedAt, completedAt? }`；`text` 上限 280，单份清单上限 300 条。会话数据继续使用 `dsh.aside-note` 的 v1 结构，工作区数据单独放在 `dsh.aside-note.workspaces`，因此新增范围不会改写旧键；首次进入工作区会把成员会话里已有的便笺合入一次，`seededSessionIds` 记住已合入的会话，之后删除不会因再次合并而复活。键名不带版本后缀，前缀与包名 `dsh-aside-note` 对齐。

## 5. 构建与产物

- 源码是 TypeScript，`tsdown.config.ts` 用 rolldown 打包成**单个** CJS closure factory，`target: es2022`，不压缩、无 sourcemap，产物入库便于 review 与逐行合并。
- CSS 通过一个 `?inline` 虚拟模块进来（虚拟 id 用相对路径，避免把本机绝对路径写进产物注释）。
- 版本号在 `constants.ts`，契约测试保证与 `package.json` 一致。
- CI（Node 22 / 24）：`npm ci` → `npm run build` → `git diff --exit-code client/`（产物必须与源码一致）→ lint → typecheck → test。`typecheck` 同时覆盖 `tsdown.config.ts`。
- `npm run check` 本地串起 lint、typecheck、测试与构建；发布走 `npm publish`（`prepack` 会重建产物）。

## 6. 测试

| 文件 | 覆盖 |
| --- | --- |
| `tests/contract.test.mjs` | 清单与 patch 形状、工具链约定、样式令牌、无障碍与交互规则、字典完整性 |
| `tests/bundle.test.mjs` | 在 jsdom 里执行**构建产物**：模块表、slot 注册、样式注入、入口注入，并驱动完整面板流程（添加、设置、完成、清除确认、编辑、缩放、删除、分区记忆）；另有一条工作区测试，验证两个会话共享清单、旧便笺只合入一次、工作区/会话切换与持久化、转发只写入当前会话输入框 |

契约测试按模块读取源码（需要时读 bundle 或 CSS），断言的是约束而不是实现细节；集成测试提供行为兜底。

## 7. 扩展时先看这里

- 新增文案：只改 `src/client/i18n/{zh,en}.ts`，两边键与占位符必须一致；中文提示不加句号。
- 新增持久化字段：`constants.ts` 加键 → `storage/` 对应模块读写 → 补契约/集成测试；读取旧形状时要原地升级，并在架构文档记录合并/迁移规则。
- 新增面板状态：优先放 `ui/use*.ts`；纯逻辑放 `domain/`，不要 import React。
- 改样式：只动 `src/client/styles/panel.css`，遵守 [面板 UI 规则](./panel-ui-rules.md)（语义别名、三档字号、0.5px 发丝线、hover 门控）。
- 不要手改 `client/client.js`：改源码后 `npm run build`，把它和源码一起提交。

## 8. 更新路径

自 1.1.2 起，更新走**宿主**，不走插件市场。市场的更新是「先移除 bundle 再安装」，而运行中的 Desktop 拒绝移除正被 fiber 使用的插件（`bundle-in-use`）——面板打开时它永远处于这个状态。宿主改为就地覆盖，三级降级：

1. `pluginManager.installBundle('dsh-aside-note@<v>', { enabled: false })`（`enabled: false` 表示只换包，不动 profile 的 bundle 选择）
2. 若被拒为 `already-installed`：`dsh plugin add <spec> --save-exact`
3. 仍不可用：用该 profile 自带的包管理器 `add <spec> --save-exact`

装完回读 `node_modules/dsh-aside-note/package.json`，必须等于目标版本，否则报 `RESOLVED_VERSION_MISMATCH`。成功返回 `restartRequired: true`——DSH 不重载已加载的包，新版本在下次启动生效。

端点只有两个，同源、POST 才可写：`GET /dsh-aside-note/update/probe`、`POST /dsh-aside-note/update/apply`（body `{ target }`）。`link:` 安装会被直接拒绝：覆盖 checkout 的依赖声明等于把工作副本悄悄换成 registry 版本。

自 1.1.2-beta.7 起，客户端不再保留插件市场客户端或探测：宿主没有路由、或拒绝码属于「终端命令能绕过」的一类时，卡片直接给出手动命令。命令由宿主生成，带目标版本与 profile 目录；预发布还会固定 `npx` 的 npmjs registry，避免装回稳定版。

### 为何不查「有 agent 正在运行」

DSH 插件市场在更新前会拒绝 `runningAgentsForGuard()` 非空的请求（除非显式 `confirmAgentsRunning`）。**本插件的更新端点刻意不做这项检查**，理由：

- 便笺是纯 UI：agent 不 import 本包的任何文件；宿主半边只是两个路由函数，且随宿主启动就已在内存里。替换包文件不改变 agent 正在执行的代码。
- 反过来，把「更新一个界面插件」挡在「别的 agent 正在跑」后面，会让用户在等待时无法升级，成本大于收益。

所以这是**有意的行为差异，不是漏检**。审查时看到 apply 里没有 `agents` 判断，请先读本节，不要直接补检查。

**需要重新评估的条件**：一旦本包出现 agent 会加载的东西——tools、skills、agent 侧 provider，或宿主半边开始被 agent 调用——就必须补上与市场一致的守卫（含 `confirmAgentsRunning` 逃生阀），并让 `useUpdateCenter` 把该拒绝码交给 `UpdateNotice` 的命令兜底路径。
