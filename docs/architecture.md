# 旁边记（AsideNote）架构

面向维护者的结构说明。界面约束见 [面板 UI 规则](./panel-ui-rules.md)，截图流程见 [截图 SOP](./screenshot-sop.md)。

## 1. 形态与运行时契约

旁边记的**界面在浏览器半侧，数据在宿主半侧的本地文件**：浏览器拿不到 `$DSH_HOME`，所以宿主用 DSH 官方存储（`ctx.storageDomain` + JSON 后端）维护 `~/.dsh/storages/aside_note.json`，浏览器经同源 `fetch` 访问；宿主另外承担浏览器做不到的「把新版本装进 profile」（见 §8）。`index.js` 负责注册这两组端点，浏览器的同步读由启动时 hydrate 的内存快照兜住。

- `package.json` 的 `dsh.bundle.patch` 指向 `cordis.patch.yml`，`dsh.client` 声明 `./client` 与需要预注入的宿主模块。
- 壳把 `./client`（即 `client/client.js`）当 classic script 加载：`window.__ModuleLoader__.load({ id, factory })`。`factory(require)` 里的 `require` 绑定到冻结的模块表，只认 `react`、`react/jsx-runtime`、`react-dom`、`react-dom/client`、`@deepseek-ai/dsh-client-ui-primitives`；其余依赖全部内联。
- 样式是 `import css from './styles/panel.css?inline'`，由入口在 `apply()` 里插入**一张** `<style data-dsh-plugin="dsh-aside-note">`，dispose 时移除。面板与输入框 dock 不在同一棵 React 树里，所以不能做面板级 `<style>`。
- 浏览器侧只依赖两个服务：`slots`（`conversation.composer.dock` 捕获当前会话、`conversation.hero.options` 捕获空白新会话、`shell.overlay` 承载全局 Toast）与 `locale`（注册字典、绑定 `t`，并订阅 `locale/change` 让已打开的面板就地换语言）。宿主侧依赖 `webServer`（路由）与 `storageDomain`（领域），后者缺失时路由回答 503，客户端据此不切换。
- 存储切换是**一次性**的：启动探测宿主 → 可用则迁移后单向使用，不可用则留在 `localStorage` 并提示；标记只在成功后写，之后不再回退（详见 `docs/design/host-storage-migration.md` §7）。
- 顶部入口是注入宿主 header 的原生 DOM 按钮，不是 React portal——宿主重渲染会回收 portal。

## 2. 目录

```text
src/client/
├─ index.ts              # apply(ctx)：样式、locale、slot 注册、入口、Toast 座位
├─ constants.ts          # 包身份、存储键、上限、平台相关常量
├─ scope.ts              # 会话 → 工作区绑定；按工作区/会话选择解析清单，工作区外回落会话
├─ dsh.d.ts              # 宿主 ctx / locale / slots 的最小 ambient 类型
├─ i18n/                 # zh.ts（键的唯一来源）、其余 7 种 DSH 官方语言、index.ts（fill / makeSay）
├─ domain/               # id、clipboard、forward（写回输入框）、items（归一化/排序/时间）
├─ storage/              # 设备本地：codec（含损坏备份）、merge（本地回落时的并发合并）、drafts、设备级 prefs；
│                        # 宿主：host-client（HTTP）、state（缓存/模式）、boot（探测/迁移）、
│                        # ops（diff 写）、legacy（迁移来源与标记）；session/workspace/forwarded/prefs 双介质分发
├─ ui/                   # 面板外壳与纯展示组件、hooks、primitives、定位
│                        # 更新中心：useUpdateCenter（检查/说明/更新与命令兜底）、UpdateNotice
├─ update/               # latest（版本与 Release 探测）、releaseNotes（标记解析）、
│                        # releaseHistory（多版本区间）、
│                        # host（宿主更新端点客户端）
└─ styles/panel.css      # 全局 .dsh-an-* 规则与 --an-* 尺度
host/                    # 宿主半边：
                         # route（两个更新端点）、apply-update（三级安装）、profile、versions、exec
                         # store-spec（aside_note 领域与 zod schema）、store（懒打开/快照/原子变更/迁移）、
                         # store-route（GET/POST /dsh-aside-note/store、GET /store/location、POST /store/reveal）、normalize、http
client/client.js         # tsdown 产物，入库，CI 校验与源码一致
index.js                 # 宿主半侧：注册更新端点与便笺存储端点
cordis.patch.yml         # profile 组合里的一行
tests/                   # catalog/（业务规则与用例）、*.test.mjs（契约 / 集成 / 韧性）、testkit/（jsdom 启动器）
tools/screenshots/       # 截图流水线（见 screenshot-sop.md）
docs/assets/             # README 截图（preview-* 与 features/）
```

## 3. 模块职责

| 层 | 模块 | 职责 |
| --- | --- | --- |
| 入口 | `index.ts` | 注入样式 → 注册字典 → 座位入口/Toast/slot |
| 身份 | `constants.ts` | 包与插件的 id、`dsh-an-*` 相关的键与上限 |
| 文案 | `i18n/` | `zh.ts` 定义键集合与 `MessageKey`；其余 7 种 DSH 官方语言用 `Record<MessageKey, string>`，缺键编译失败；运行时未知语言或缺键一律回退英文 |
| 领域 | `domain/items.ts` | `normalizeItems`（防御性清洗、去重、上限）、排序、相对时间文案 |
| 领域 | `domain/forward.ts` | 把便笺写回**当前会话**的 Lexical contenteditable 或 textarea，保留光标与换行语义；按 `[data-conversation-session]` 限定输入框 |
| 存储 | `storage/session.ts` | 会话便笺的读写；宿主模式走缓存 + `list.patch` diff（宿主原子合并），本地复用 v1 键并做损坏备份与并发合并；失败返回 `false`，由调用方保留 UI 原状 |
| 存储 | `storage/workspace.ts` | 工作区清单读写；首次见到工作区时把成员会话的旧便笺并入一次（宿主侧 `list.ensure` 原子完成），`seededSessionIds` 防重复 |
| 存储 | `storage/merge.ts` | 本地回落模式的按 id 合并：双方新增都保留，同一条目取较新的 `updatedAt`，本页相对上次读取删除的条目不再复活 |
| 存储 | `storage/boot.ts` | 启动探测、一次性迁移、模式标记与提示；不可用不切换，成功后单向 host |
| 存储 | `storage/state.ts` / `host-client.ts` / `ops.ts` | 内存快照、同标签广播、同源 HTTP、按 key 串行与乐观/回滚策略 |
| 存储 | `storage/legacy.ts` | 旧 `localStorage` 快照（迁移来源）、`storage-mode`/`storage-notice` 标记与提示去重 |
| 范围 | `scope.ts` | 记录 dock 当前会话的归属；按保存的「工作区 / 会话」选择解析清单，工作区外始终回落到会话 |
| 更新 | `update/latest.ts` | npm → npmmirror → GitHub Release 的版本探测（1 小时缓存），按版本读取 Release 正文 |
| 更新 | `update/releaseNotes.ts` | 提取 `app-update-notes` 标记块、按语言回退、压平 Markdown、上限兜底 |
| 更新 | `update/releaseHistory.ts` | 从 releases feed 选出「本地 < 版本 ≤ 最新」的区间，剔除草稿/预发布，倒序与上限 |
| 更新 | `ui/useUpdateCenter.ts` | 自动/手动检查、懒加载说明、更新状态机（starting/running/done/error）；只走宿主更新端点，没有市场分支 |
| 更新 | `ui/UpdateNotice.ts` | 关于区里的更新卡片：说明展开、完整说明链接、立即更新/刷新，宿主没有路由或拒绝时改为带版本号的命令 + 拷贝更新提示词 |
| 存储 | `storage/prefs.ts` | 用户偏好（范围、快捷键、前缀）在宿主模式走 `global`，面板宽高/分区/统计开关留在设备本地 |
| UI 组件 | `ui/MemoPopover.ts` | 面板编排：组合 hook 与展示组件，portal 到 body |
| UI 组件 | `PanelHead` / `ScopeSwitch` / `SettingsPanel` / `ComposerForm` / `NoteList` / `ClearConfirm` / `TodoRow` / `EmptyState` | 纯展示，数据与回调由面板传入 |
| UI hooks | `useSessionMemoStore` / `usePanelGeometry` / `useSections` / `useForwardMarks` / `usePanelSettings` / `useComposerDraft` / `useNoteActions` / `useClearConfirm` / `useListEdge` / `useOutsideDismiss` | 把状态与副作用从 JSX 里分离；每个 hook 只做一件事 |
| UI 基础设施 | `primitives` / `position` / `toastSeat` / `headerEntry` | 共享图标与 Tooltip、浮层定位与吸顶、跨面板 Toast、宿主 header 入口（空白新会话回落到 header corner） |

约定：`domain/` 与 `storage/` 不 import React；需要 React 的状态放 `ui/use*.ts`。浏览器半侧不碰 Node 内置模块与 `process`（契约测试会拦）。

## 4. 数据模型

便笺以 DSH 官方存储的领域写进宿主的 **`$DSH_HOME/storages/aside_note.json`**（`single` 布局，整文件原子替换）：

```json
{
  "unit": { "name": "aside_note", "version": 1 },
  "global": { "version": 1, "scopeMode": "workspace", "sendShortcut": "enter", "forwardPrefix": "…" },
  "tables": {
    "sessions": { "<sessionId>": { "sessionId": "…", "updatedAt": 0, "items": [] } },
    "workspaces": { "<workspaceId>": { "workspaceId": "…", "updatedAt": 0, "items": [], "seededSessionIds": [] } },
    "forwarded": { "ws:<workspaceId>": { "<itemId>": true } }
  }
}
```

- `sessions` 与 `workspaces` 是**平级两张表**：会话属于哪个工作区由 DSH 的工作区注册表提供，文件不存归属；工作区清单是独立副本，首次见到工作区时把成员会话已有的便笺并入一次（`seededSessionIds` 防复活）。
- `forwarded` 键是 `ws:<workspaceId>` 或会话 ID；`global` 存范围选择、发送快捷键、转发前缀、迁移标记。
- 浏览器在宿主之外仍保留设备本地状态（`localStorage`）：面板宽高、分区展开、匿名统计开关、RUM 访客 ID、首次打开标记、未提交草稿（`dsh.aside-note.drafts`，按工作区/会话共享）。
- 领域 `version` 是当前格式版本；读旧版本要配 `compatibleVersions`，删字段前必须重写所有记录（官方无值迁移 runner）。
- 设置 › **数据存储**通过 `GET /store/location` 读取该文件的完整路径，可拷贝；`POST /store/reveal` 让宿主在文件管理器中定位它。后端不是 JSON 文件时明确显示「无法定位」，不猜路径。
- `Note` 形如 `{ id, text, done, createdAt, updatedAt, completedAt? }`；`text` 上限 280，**清单条数不设上限**（400 条仍可展示与新增，见 `STORE-018`）。
- 每次写入整文件替换；数据量远小于文件系统压力，写入排队由领域写链串行化。

**切换状态机**（`docs/design/host-storage-migration.md` §7）：

| 状态 | 触发 | 行为 |
| --- | --- | --- |
| 未切换 | 宿主可用且为空 | 有浏览器旧数据则 `migrate`（两阶段）→ 写 `storage-mode=host` |
| 未切换 | 宿主可用且非空 | 写标记，不迁移；本地旧数据保留并提示 |
| 未切换 | 宿主不可用 | 留在 `localStorage`，提示一次（24h 去重），下次启动重试，不写标记 |
| 已切换 | 宿主可用 | 正常读写 |
| 已切换 | 宿主不可用 | 错误态，只读本次快照/空，禁止写，**不回退**本地 |

**本地回落模式**（尚未切换或宿主不可用时的 `localStorage` 路径）：

- `dsh.aside-note`、`.workspaces`、`.drafts` 读取前先校验；解析失败或字段类型不对，原始字符串先写到 `<键>.corrupt`（同一键只保留最后一份损坏内容），再把该键当作空清单继续，下一次写入不会静默覆盖证据。
- 写入不是整份覆盖：`writeSessionRecord` / `writeWorkspaceRecord` 先读回最新记录，再按 id 合并（`storage/merge.ts`）。两个标签页同时记便笺时双方新增都保留；同一条目冲突取 `updatedAt` 较新的一方；本页相对上次读取删除的条目不被并发写入复活（反向可能复活，宁可复活不丢）。
- 本地存储按浏览器 origin 隔离：桌面端与 `http://127.0.0.1:<port>` 是不同 origin 的两份数据；仅当整站存储被拒绝时 `storage()` 才返回 `null`，更常见的是写失败（配额/磁盘/profile 只读）返回 `false`。迁移到宿主后这一层只作为恢复来源，不会自动回退。

## 5. 构建与产物

- 源码是 TypeScript，`tsdown.config.ts` 用 rolldown 打包成**单个** CJS closure factory，`target: es2022`，不压缩、无 sourcemap，产物入库便于 review 与逐行合并。
- CSS 通过一个 `?inline` 虚拟模块进来（虚拟 id 用相对路径，避免把本机绝对路径写进产物注释）。
- 版本号在 `constants.ts`，契约测试保证与 `package.json` 一致。
- CI（Node 22 / 24）：`npm ci` → `npm run build` → `git diff --exit-code client/`（产物必须与源码一致）→ lint → typecheck → `test:run`（逐用例记录）→ `catalog:check` → `design:review --strict`。`typecheck` 同时覆盖 `tsdown.config.ts`。
- `npm run check` 本地串起 lint、typecheck、测试与构建；发布走 `npm publish`（`prepack` 会重建产物）。

## 6. 测试

| 文件 | 覆盖 |
| --- | --- |
| `tests/catalog/design.yaml` | 业务规则与不变量（用例的唯一设计来源），字段见 [测试工程](./testing.md) |
| `tests/catalog/*.yaml` | 测试用例目录：稳定 ID、优先级、规则引用、自动化指针 |
| `tests/contract.test.mjs` | 清单与 patch 形状、工具链约定、样式令牌、无障碍与交互规则、字典完整性 |
| `tests/resilience.test.mjs` | 排序与取消完成、无工作区/空白会话范围、存储读写失败、跨标签页刷新、宽度钳制、确认失效、未知语言回落、大清单 |
| `tests/testkit/bundle.mjs` | 在 jsdom 里启动构建产物的测试装置：可注入存储故障、压缩定时器、locale 与 slot props |
| `tests/bundle.test.mjs` | 在 jsdom 里执行**构建产物**：模块表、slot 注册、样式注入、入口注入，并驱动完整面板流程（添加、设置、完成、清除确认、编辑、缩放、删除、分区记忆）；另有工作区测试，验证两个会话共享清单、旧便笺只合入一次、工作区/会话切换与持久化、转发只写入当前会话输入框；还有空白新会话测试，验证入口落在 header corner、只有工作区清单，以及首轮对话后入口移到 utilities 并解锁会话清单 |
| `tests/host-store.test.mjs` | 宿主 store 契约：快照、diff/顺序/删除、并发新增保留、工作区只合并一次、转发/偏好、迁移两阶段与中断恢复、不可用/损坏错误码、路由鉴权与体积上限 |
| `tests/host-bundle.test.mjs` | 构建产物 + 假宿主端点：首次迁移后只写宿主、不可用时留在浏览器、已切换后不可用进入错误态且不写 `localStorage` |

契约测试按模块读取源码（需要时读 bundle 或 CSS），断言的是约束而不是实现细节；集成测试提供行为兜底。

## 7. 扩展时先看这里

- 新增文案：改 `src/client/i18n/*.ts` 的 8 种语言，键与占位符必须一致；插件列表文案同步改 `locale/*.json`；中文提示不加句号。
- 新增便笺字段（宿主数据）：`host/store-spec.js` 扩 zod schema（必要时升 `version` 并声明 `compatibleVersions`）→ `host/store.js`/`host/normalize.js` 处理 → 浏览器 `storage/` 模块 → 补宿主与集成测试。
- 新增设备状态：`constants.ts` 加键 → `storage/prefs.ts`/`drafts.ts` 读写 → 补契约测试；不要放进宿主领域。
- 新增面板状态：优先放 `ui/use*.ts`；纯逻辑放 `domain/`，不要 import React。
- 改样式：只动 `src/client/styles/panel.css`，遵守 [面板 UI 规则](./panel-ui-rules.md)（语义别名、三档字号、0.5px 发丝线、hover 门控）。
- 不要手改 `client/client.js`：改源码后 `npm run build`，把它和源码一起提交。

## 8. 更新路径

自 1.1.2 起，更新走**宿主**，不走插件市场。市场的更新是「先移除 bundle 再安装」，而运行中的 Desktop 拒绝移除正被 fiber 使用的插件（`bundle-in-use`）——面板打开时它永远处于这个状态。宿主改为就地覆盖，三级降级：

1. `pluginManager.installBundle('dsh-aside-note@<v>', { enabled: false })`（`enabled: false` 表示只换包，不动 profile 的 bundle 选择）
2. 若被拒为 `already-installed`：`dsh plugin add <spec> --save-exact`
3. 仍不可用：用该 profile 自带的包管理器 `add <spec> --save-exact`

装完回读 `node_modules/dsh-aside-note/package.json`，必须等于目标版本，否则报 `RESOLVED_VERSION_MISMATCH`。成功返回 `restartRequired: true`——DSH 不重载已加载的包，新版本在下次启动生效。

`GET /dsh-aside-note/update/probe` 查询版本，`POST /dsh-aside-note/update/apply` 接收 `{ target }` 并安装。两个端点都通过 DSH 检查请求来源和会话，鉴权不可用时拒绝请求。`link:` 安装会被直接拒绝，避免用 registry 版本替换工作副本。

自 1.1.2-beta.7 起，客户端不再保留插件市场客户端或探测：宿主没有路由、或拒绝码属于「终端命令能绕过」的一类时，卡片直接给出手动命令。命令由宿主生成，带目标版本与 profile 目录；预发布还会固定 `npx` 的 npmjs registry，避免装回稳定版。

### 为何不查「有 agent 正在运行」

DSH 插件市场在更新前会拒绝 `runningAgentsForGuard()` 非空的请求（除非显式 `confirmAgentsRunning`）。**本插件的更新端点刻意不做这项检查**，理由：

- 便笺是纯 UI：agent 不 import 本包的任何文件；宿主半边只是更新与存储端点及一个存储领域，且随宿主启动就已在内存里。替换包文件不改变 agent 正在执行的代码。
- 反过来，把「更新一个界面插件」挡在「别的 agent 正在跑」后面，会让用户在等待时无法升级，成本大于收益。

所以这是**有意的行为差异，不是漏检**。审查时看到 apply 里没有 `agents` 判断，请先读本节，不要直接补检查。

**需要重新评估的条件**：一旦本包出现 agent 会加载的东西——tools、skills、agent 侧 provider，或宿主半边开始被 agent 调用——就必须补上与市场一致的守卫（含 `confirmAgentsRunning` 逃生阀），并让 `useUpdateCenter` 把该拒绝码交给 `UpdateNotice` 的命令兜底路径。
