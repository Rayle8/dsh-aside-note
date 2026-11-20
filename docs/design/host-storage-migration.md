# 便笺存储迁移方案：localStorage → DSH 本地文件存储

- 状态：**已实施（P1–P4 完成；待 Desktop 实机验收与发布，见 §9.4）**
- 日期：2026-11-17
- 目标版本：`dsh-aside-note@1.2.0`
- 对照运行时：DeepSeek Harness **0.2.2-rc.3**（Desktop profile，见 §14 验证记录）
- 相关文档：[架构](../architecture.md)、[发布](../release.md)、[面板 UI 规则](../panel-ui-rules.md)

---

## 0. 结论摘要

1. 采用 DSH 官方存储栈（`ctx.storageDomain` + `json` 后端 + `dsh-storage-domain` 领域），把便笺写进 **`$DSH_HOME/storages/aside_note.json`**，不再以浏览器 `localStorage` 为主存储。
2. 官方存储只对**宿主半边**开放，浏览器侧没有任何官方 storage 客户端；因此浏览器侧沿用本包已有的「同源 HTTP 路由」模式（与更新卡片相同）访问宿主。
3. 浏览器侧保留**同步读的内存缓存**，界面层（`readSessionRecord` 等同步函数）几乎不用改；写操作改为「客户端算 diff → 宿主原子合并 → 回传权威记录」，失败时保持界面原状（沿用现有「保存失败，内容没有改动」的承诺）。
4. 升级后首次启动先**检查宿主存储可用性**：可用则（必要时）把浏览器旧数据迁入，此后读写都走宿主；不可用则**不切换**、本页继续用 `localStorage` 并提示用户，下次启动再试。切换是一次性的：成功后不再回退（避免两份数据分叉），旧 `localStorage` 原样保留作为恢复来源。
5. 决策已确认（§12）：草稿留在浏览器、单文件 `aside_note.json`、不做跨机器同步（保留同浏览器标签页同步）、Settings 只显示状态、命名 `aside_note` / `/dsh-aside-note/store`。切换策略（§7.1/§7.5）：启动检查、不可用不切换、成功后不回退。

预估工作量：**5–7 个工作日**（含测试与文档），分 5 个阶段（§13）。

---

## 1. 目标与非目标

### 目标

- 便笺（工作区级 + 会话级）与转发标记改存 DSH 本地文件，刷新、重启、换浏览器、清站点数据都不再丢。
- 复用 DSH 官方存储的原子写、版本戳、schema 校验与变更事件，而不是自己拼文件。
- 迁移用户已有数据，且**不破坏**现有行为：同步读、同一浏览器多标签同步、面板关闭重开、工作区合并规则（`seededSessionIds`）都不变。
- 宿主存储不可用（旧宿主、自定义 profile 未挂载 storage、文件损坏）时**不切换**，插件照旧可用并提示用户；下次启动自动重试。
- 不做运行时回退开关：切换成功后单向走宿主，避免数据分叉；旧 `localStorage` 只保留作恢复来源。

### 非目标（本期不做）

- 跨机器同步：作为本地工具本轮不考虑；只保留**同一浏览器多标签页**同步与「打开面板时刷新」。
- 便笺加密、导出/导入 UI、按工作区分文件。
- 把 RUM/匿名统计、面板几何等设备级状态搬到宿主。
- 改动 agent 侧任何东西（本插件仍然对模型不可见）。

---

## 2. 官方文档与源码研究

> 以下事实均来自安装版 0.2.2-rc.3 的文档与源码，不是凭记忆。文档路径相对 `@deepseek-ai/dsh/docs/`，源码路径相对 `dsh/node_modules/@deepseek-ai/`。

### 2.1 官方存储栈由三个包组成，`dsh-base` 默认全挂载

`docs/subsystems/storage.zh.md` 与 `dsh-base/cordis.patch.yml:179-190`：

| 角色 | 包 | 服务 | 说明 |
| --- | --- | --- | --- |
| 枢纽 | `@deepseek-ai/dsh-storage` | `ctx.storage` | 只做「后端名 → 后端」与「数据形态」注册，本身不做 IO |
| 后端 | `@deepseek-ai/dsh-storage-json` | 注册名 `json` | 把每个 unit 写成 `<root>/<unit>.json`（`single`）或 `<root>/<unit>/`（`per-record`） |
| 数据形态 | `@deepseek-ai/dsh-storage-domain` | `ctx.storageDomain`（= `ctx.storage.domain`） | schema 校验 + 版本戳 + 变更事件的类型化 KV API |

桌面 profile 的 bundle 里 `dsh-base` 默认挂载：

```yaml
- id: storage
  name: '@deepseek-ai/dsh-storage'
- id: storage-json
  name: '@deepseek-ai/dsh-storage-json'
  config:
    root: !!js dshHomePath('storages')
- id: storage-domain
  name: '@deepseek-ai/dsh-storage-domain'
  config:
    backend: json
```

也就是说：**普通 Desktop/Web profile 不需要额外装东西**，`ctx.storageDomain` 已在，根目录是 `$DSH_HOME/storages`（Desktop 实测为 `~/.dsh/storages`）。

### 2.2 落盘位置与文件格式

`dsh-storage-json/README.md`、`dsh-storage-json/src/single-unit.ts`、`dsh-storage-json/src/atomic.ts`：

- `single` 布局：整 unit 一份文件 `<root>/<name>.json`，内容形如：

  ```json
  {
    "unit": { "name": "workspace", "version": 2 },
    "global": { "initialized": true },
    "tables": { "workspaces": { "<key>": { "path": "/work/demo" } } }
  }
  ```

- 写入协议：同目录临时文件 → `fsync` → 原子 `rename()` → 父目录 `fsync`；临时文件权限 `0600`，root 目录按 `0700` 创建。
- unit 名、表名必须匹配 `^[a-z][a-z0-9_]*$`；`single` 布局的记录键是不透明字符串，`per-record` 布局要求键匹配 `[a-zA-Z0-9_-]+`。
- 实测 `~/.dsh/storages/` 已有 `workspace.json`、`schedule.json`、`session_projcache/` 等，说明该目录就是官方约定的本地数据目录。

### 2.3 `ctx.storageDomain` 的语义

`docs/subsystems/storage.zh.md`、`storage-domain/src/{spec,domain,index}.ts`：

- 消费者用 `defineDomain(spec)` 声明领域：`name`、`version`、`layout`（`single`/`per-record`）、`compatibleVersions`、`invalidRecords`、`global`、`tables`；表的记录 schema 用 **zod**（`domainTable(schema)`）。
- `await ctx.storageDomain.open(spec)` 打开领域，失败码：`already-open`、`backend-not-found`、`facet-unsupported`、`version-mismatch`、`malformed-medium`、`invalid-record`。
- 打开后：**读是同步的**（`table.get/entries/keys/size`，来自内存权威状态）；写（`put/delete/deleteMany/update/global.set`）排队到该领域唯一的写链上，**先落盘、再更新内存、再发 `domain/changed`**。
- `update(key, fn)` 是写链内的原子读改写——这是避免多标签/多客户端丢更新的关键。
- 版本：`single` 布局是 unit 级版本戳；`malformed-medium` / `version-mismatch` 会让整个 `open` 失败；`per-record` 布局单条文档坏只读作缺失。**没有值迁移 runner**，只能靠 `compatibleVersions` + owner 自己写归一化。
- 跨进程变更推送是已记录的已知限制（本期不解决）。
- 领域还未挂载或已关闭时读会抛；领域在 facility 卸载时会被统一关闭。

### 2.4 浏览器侧没有官方 storage 客户端

- `dsh-storage` README 原文：*"It is available only to host code and has no model-visible effect"*。
- 安装目录下 300+ 个 `@deepseek-ai/*` 目录中没有 client 侧 storage 包；`ctx.storageDomain` 是 Host Cordis 服务。
- DSH 自己的浏览器插件（侧栏几何、会话宽度、快捷键等）同样用 `localStorage` 保存**设备级 UI 状态**——这与我们「用户内容上宿主、设备状态留浏览器」的取舍一致。

**结论：浏览器必须通过宿主暴露的接口访问存储。** 本包已有一条成熟路径：`host/route.js` 用 `ctx.webServer.register({ kind: 'exact', path, handler })` 注册更新端点，客户端 `fetch('/dsh-aside-note/update/...')`，Desktop 实机可用（CHANGELOG 1.1.x）。新存储接口沿用同一模式。

### 2.5 路由与鉴权

`docs/subsystems/web-server.zh.md`：

- `ctx.webServer.register(route)` 返回 disposer；`exact` 先匹配，未命中走 fallback（前端静态站）。
- **carrier 不负责鉴权/Origin**：路由自己要检查。
- 官方提供 `ctx.connection.requestRejection(request)`：套用 Host/Origin 围栏 + 浏览器会话认证，返回 `401 | 403 | undefined`；另有 `admit()` 可取到 Peer。
- 未注册的路径由 `dsh-host-frontend-static` 回答：dist 内缺失文件返回**空 404**，非 GET/HEAD 返回 405（`dsh-host-frontend-static/README.md`）。所以客户端用「404 / 非 JSON」判断端点不存在是可靠的。
- Desktop 宿主同样以 loopback HTTP 提供 GUI（`dsh-desktop-host` 把 `http://127.0.0.1:<port>` 的认证 URL 交给 Electron 主进程；本会话 GUI 为 `http://127.0.0.1:53272`），相对路径 `fetch` 与已上线的更新端点同机制。

### 2.6 其它候选方案的事实

| 候选 | 官方事实 | 为何不选 |
| --- | --- | --- |
| 直接 `node:fs` 写 `$DSH_HOME/...` | 没有「插件数据目录」API（全局 `DSH_HOME` 相关文档只给 `dshHomePath`，无 `ctx.paths`） | 绕过官方语义：原子写、版本戳、schema、变更事件都要自己实现；且目录归属不明确 |
| 写进会话日志（`appendPluginRecord`，`plugin:` 事件） | `docs/subsystems/session.zh.md:786` 起；实验性、log-only | 便笺是工作区级/跨会话的，偏好也不属于任何会话；且会把用户数据写进模型可见会话文件与日志增长路径 |
| 用 `ctx.settings` 存 | `docs/subsystems/settings.zh.md`：投影 **插件 Config**，写入 profile patch | 它是配置而不是用户内容；写一次就改 profile 配置，语义不符 |
| 走 typert RPC（`ctx.remote`） | `dsh-api-gateway/README.md`：需要 `InvocationDescriptor` 生成物、`@Remote` 装饰器、业务服务继承 `TypertRemoteService` | 对第三方插件过重，强绑定 DSH 内部代码生成与版本 |

---

## 3. 方案比较

| 方案 | 客户端改动 | 官方契合度 | 风险 | 结论 |
| --- | --- | --- | --- | --- |
| A. 保持 localStorage | 无 | 低（数据仍困在浏览器） | 清站点数据即丢；不可跨浏览器 | 不满足诉求 |
| B. 通用 KV 镜像：把每个 `dsh.aside-note*` 键原样搬进宿主一张表 | 极小（只换 codec） | 中（用了后端但没有领域语义） | 旧形状永久固化；无逐条 schema 校验；以后想演进更难 | 保底方案 |
| C. **领域建模**：`aside_note` 领域 + 便笺/工作区/转发/偏好表，事件驱动 | 中 | **高** | 需要设计记录 schema 与迁移 | **推荐** |
| D. typert RPC 暴露领域 | 大 | 高 | 生成物/版本耦合，第三方维护成本高 | 不选 |
| E. 写会话日志 plugin record | 中 | 实验性 | 粒度不符、污染会话日志 | 不选 |

---

## 4. 推荐架构

```text
┌──────────────────────────── 浏览器（client bundle） ───────────────────────────┐
│  UI hooks / headerEntry                                                         │
│      │ 同步读（不变）                │ 写（async 或 fire-and-forget）            │
│      ▼                              ▼                                          │
│  storage facade ──► 内存缓存（已 hydrate 的权威快照）──► 写队列（按记录串行）      │
│      │                              │                                          │
│      │ 设备级状态（宽高/分区/统计）   │ 同源 fetch（JSON）                        │
│      ▼                              ▼                                          │
│  localStorage（保留）          /dsh-aside-note/store  (GET / POST)               │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │ 同一 Host 进程
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  Host 半边（index.js → host/store-route.js → host/store.js）                     │
│      │ ctx.webServer.register  （同源 + 浏览器会话校验）                          │
│      │ ctx.storageDomain.open(SPEC)  （懒打开，失败返回 503）                     │
│      ▼                                                                          │
│  领域 aside_note v1（single 布局）                                                │
│      tables: sessions / workspaces / forwarded     global: prefs                 │
│      │                                                                          │
│      ▼                                                                          │
│  $DSH_HOME/storages/aside_note.json   （原子写、版本戳、domain/changed）           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

关键点：

- **读同步、写异步**：缓存保证 UI 现有同步读不变；写接口返回后可回填权威记录。
- **宿主是唯一写者**：客户端永远不直接写文件；合并逻辑（工作区种子、偏好 patch）放宿主，用 `KvTable.update` 的原子读改写消除多标签丢更新。
- **官方能力最大化**：领域 schema、版本戳、原子落盘、`domain/changed` 全部复用；不自己拼 JSON 文件。

---

## 5. 数据模型与文件布局

### 5.1 领域 spec（`host/store-spec.js`，宿主侧）

```js
// 实际以 createSpec({ z, defineDomain, domainTable }) 注入依赖，便于单测；
// 这里是同一段声明的示意写法。
export const DOMAIN_NAME = 'aside_note' // 单文件即 $DSH_HOME/storages/aside_note.json
export const DOMAIN_VERSION = 1

// 记录：沿用现有 v1 形状
const noteSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(280),
  done: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
  completedAt: z.number().optional(),
})

const itemsRecord = z.object({
  updatedAt: z.number(),
  items: z.array(noteSchema),
})

const sessionRecord = itemsRecord.extend({
  sessionId: z.string().min(1).optional(),
})

const workspaceRecord = itemsRecord.extend({
  workspaceId: z.string().min(1).optional(),
  seededSessionIds: z.array(z.string().min(1)).max(200),
})

const forwardedRecord = z.record(z.string(), z.literal(true)) // { [itemId]: true }

const prefs = z.object({
  version: z.literal(1).default(1),
  scopeMode: z.enum(['workspace', 'session']).optional(),
  sendShortcut: z.enum(['enter', 'ctrl-enter']).optional(),
  forwardPrefix: z.string().max(80).optional(), // 缺省 = 未自定义；"" = 明确不加前缀
  migration: z.object({ complete: z.boolean(), at: z.number(), source: z.string() }).optional(),
})

export const SPEC = defineDomain({
  name: DOMAIN_NAME,
  version: DOMAIN_VERSION,
  layout: 'single',
  tables: {
    sessions: domainTable(sessionRecord),
    workspaces: domainTable(workspaceRecord),
    forwarded: domainTable(forwardedRecord),
  },
  global: { schema: prefs, initial: { version: 1 } },
})
```

要点：

- 表名/unit 名满足 `UNIT_NAME_RE`；`single` 布局下键不透明，会话 ID、工作区 ID、`ws:<id>` 这类 draft 键都能直接用（**如果草稿也上宿主**，`single` 是必要的，见 §12-D1）。
- 记录形状与现有 `localStorage` 形状一致，迁移就是「换介质」，不是「换 schema」，降低回归面。
- `version`/`compatibleVersions` 由官方版本戳承担；表内不再重复版本字段。
- 不用 `invalidRecords: 'backup-and-skip'`：便笺是权威数据，坏记录应该**大声失败**而不是静默丢一条（且 `single` 布局没有 `backupRecord`，该策略本来也无效）。

### 5.2 文件内容示例

```json
{
  "unit": { "name": "aside_note", "version": 1 },
  "global": {
    "version": 1,
    "scopeMode": "workspace",
    "sendShortcut": "enter",
    "migration": { "complete": true, "at": 1763420000000, "source": "localStorage" }
  },
  "tables": {
    "sessions": {
      "0f0c…": { "sessionId": "0f0c…", "updatedAt": 1763410000000, "items": [] }
    },
    "workspaces": {
      "8a11…": { "workspaceId": "8a11…", "updatedAt": 1763410000000, "items": [], "seededSessionIds": ["0f0c…"] }
    },
    "forwarded": { "ws:8a11…": { "item-1": true } }
  }
}
```

（`id` 等字段在真实文件里是完整 UUID；示例省略。）

### 5.3 迁移映射（旧 `localStorage` → 新文件）

| 旧键 | 去向 | 备注 |
| --- | --- | --- |
| `dsh.aside-note`（`{version,sessions}`） | `sessions` 表，一条记录/会话 | 拆掉外层 `version`，记录原样 |
| `dsh.aside-note.workspaces` | `workspaces` 表 | 保留 `seededSessionIds` 语义 |
| `dsh.aside-note.forwarded` | `forwarded` 表 | 键保持 `ws:<id>` 或会话 ID |
| `dsh.aside-note.scope-mode` | `global.scopeMode` | 用户偏好 |
| `dsh.aside-note.send-shortcut` | `global.sendShortcut` | 用户偏好 |
| `dsh.aside-note.forward-prefix` | `global.forwardPrefix` | 缺键 ≠ 空串，语义保留 |
| `dsh.aside-note.drafts` | **默认留在浏览器**（待拍板 D1） | 高频写、设备内临时状态 |
| `dsh.aside-note.panel-width/height`、`.sections` | 留在浏览器 | 依赖屏幕/窗口 |
| `dsh.aside-note.analytics`、`.uin`、`.panel-opened` | 留在浏览器 | 设备/隐私边界，RUM 在模块加载时读 |

### 5.4 工作区级与会话级：平级两张表，不是父子嵌套

「会话属于哪个工作区」来自 DSH 的工作区注册表（`useWorkspaces` 里每个 workspace 的 `sessionIds`），**本插件不自己维护这层关系**，文件里也不存。文件只回答两个问题：某个工作区共享的清单是什么、某个会话自己的清单是什么。

| 层级 | 表 | 记录键 | 一条记录是什么 | 谁共享 |
| --- | --- | --- | --- | --- |
| 会话级 | `sessions` | `sessionId` | 这个会话自己的清单 | 仅该会话 |
| 工作区级 | `workspaces` | `workspaceId` | 工作区共享清单 + `seededSessionIds` | 工作区所有成员会话 |
| 转发标记 | `forwarded` | `ws:<workspaceId>` 或 `sessionId` | 该清单里哪些条目已转发 | 跟随对应清单 |
| 用户偏好 | `global` | — | 范围选择 / 快捷键 / 转发前缀 / 迁移标记 | 整个 Host |
| 草稿（若上宿主） | `drafts` | `ws:<workspaceId>` 或 `sessionId` | 该范围的未提交新增/编辑 | 跟随对应范围 |

面板顶部「工作区 / 会话」切换的只是**显示哪张表的哪条记录**（选择存 `global.scopeMode`），两层数据始终同时存在、互不覆盖。

工作区清单是**独立副本**，不是会话清单的实时并集：首次见到工作区时，把成员会话当时已有的便笺并入一次（`seededSessionIds` 记住已并过哪些会话），之后各写各的。在工作区里删一条，不会删除会话列表里的同 id 条目；反过来也一样。合并只在宿主侧 `list.ensure` 发生一次，幂等。

场景对照：

- 同一工作区的两个会话：默认都读同一条 `workspaces` 记录；切到「会话」各读各的 `sessions` 记录。
- 工作区之外的会话：没有对应的 `workspaces` 记录，只有自己的 `sessions` 记录，面板不提供「工作区」选项。
- 会话被 DSH 移入/移出工作区：数据不搬家，只是之后显示与合并的对象变了；`seededSessionIds` 保证搬入时只补并一次，之后删除不会复活。

### 5.5 「整个插件只有一份文件吗」——是

领域 `aside_note` 用 `single` 布局：**所有层级、所有工作区、所有会话都在这一个 `aside_note.json` 里**，靠「表名 + 记录键」区分，不是「一个工作区/会话一个文件」。

- 数据量估算：清单条数不设上限（400 条仍可展示与新增）；按 400 条 × 280 字估算约 110 KB，实际远小于此；整份文件通常只有几 KB 到几十 KB，每次写入整文件原子替换，成本可忽略。
- 好处：备份/查看/迁移只需拷一个文件；整文件原子替换不会出现「一半新一半旧」。
- 代价：文件损坏或版本戳不支持时整个领域打不开（面板报错而不是静默丢一条）；这也是 §12-D2 备选 `per-record` 布局（目录树、一条记录一个文件）想解决的问题，本期按「单文件 + 明确报错 + 浏览器旧数据可恢复」处理。

---

## 6. Host 半边设计

### 6.1 模块划分（新增 4–5 个文件 + `index.js` 小改）

| 文件 | 职责 |
| --- | --- |
| `host/store-spec.js` | 领域 spec、zod schema、表名常量、版本常量 |
| `host/store.js` | 懒打开领域、快照、变更 op 的原子实现、迁移两阶段标记、关闭；依赖注入便于单测 |
| `host/store-route.js` | `registerStoreRoutes(server, { ctx, store })`：GET/POST、鉴权、body 上限、错误码映射 |
| `host/http.js`（可选） | 从 `route.js` 提出 `sameOrigin` / `readBody` 共用 |
| `index.js` | 保留更新端点挂载；新增 store 路由挂载（不注入 storageDomain，运行期检测） |

**为什么懒打开**：`ctx.webServer` 一定存在，`ctx.storageDomain` 可能不存在（自定义 profile）。路由先注册、请求时再解析服务：

```js
async function ensureDomain(ctx) {
  const facility = ctx.get('storageDomain')
  if (!facility) throw new StoreError('STORE_UNAVAILABLE', 'storage is not mounted in this profile')
  if (domain) return domain
  // 从安装路由解析官方包（profile-resolution 会把 @deepseek-ai/* 指到 DSH 安装目录）
  // host/store-spec.js 直接持有 zod schema；领域对象就是普通 spec 对象，
  // `open()` 只消费它的字段（与官方 defineDomain 产物同形）。
  const { createSpec } = await import('./store-spec.js')
  domain = await facility.open(createSpec())
  return domain
}
```

- 失败缓存：`open` 失败（文件损坏）后缓存 5s，避免每个请求都重试打日志；客户端显示错误态。
- 归一化：宿主端对 `upserts`/`list.ensure` 做与 `src/client/domain/items.ts` 相同的最小防御（去重、`MAX_ITEMS` 截断、`MAX_TEXT` 截断、时间戳兜底），实现为 `host/normalize.js`（约 40 行，客户端与宿主各一份，靠契约测试保证规则一致）。
- 生命周期：`ctx.effect(..., 'dsh-aside-note: store')`，dispose 时 `await domain.close()`；路由 disposer 一并释放。
- 依赖：`zod` 放进 **`dependencies`**（宿主半边的记录 schema 需要在 profile 安装时解析到，不能依赖 DSH 安装目录里的副本）；不导入 `@deepseek-ai/dsh-storage-domain`——`open()` 只消费普通 spec 对象，`defineDomain` 的校验（名称/版本/global 非 null）在 `store-spec.js` 里等价实现。
- `ctx.storageDomain` 缺失或 `open` 失败时抛 `STORE_UNAVAILABLE` / `STORE_OPEN_FAILED`；客户端按 §7.5 不切换、留在浏览器存储并提示。

### 6.2 HTTP 契约

路径：`/dsh-aside-note/store`（exact，GET/POST 同一路径）。

**GET** → 返回权威快照：

```json
{
  "ok": true,
  "rev": 42,
  "empty": false,
  "data": {
    "sessions": { "<sessionId>": { "updatedAt": 0, "items": [] } },
    "workspaces": { "<workspaceId>": { "updatedAt": 0, "items": [], "seededSessionIds": [] } },
    "forwarded": { "ws:<id>": { "<itemId>": true } },
    "prefs": { "version": 1, "scopeMode": "workspace" }
  }
}
```

- `rev`：Host 进程内的成功写入序号，仅用于客户端判断「是否需要整体重取」；重启归零无所谓。
- `empty`：三张表都为空且没有迁移标记。客户端据此决定是否迁移。

**POST** → 变更操作，body 形如 `{ "op": "...", ... }`：

| `op` | 参数 | 宿主行为（原子） |
| --- | --- | --- |
| `list.patch` | `listKey`（`ws:<id>` / 会话 ID）、`kind`（`workspace`/`session`）、`upserts: Note[]`、`deletes: string[]` | `table.update(listKey, record => 应用增改删 + normalize + 写 updatedAt)`；返回合并后记录 |
| `list.ensure` | `workspaceId`、`sessionIds` | 首次见工作区时把成员会话便笺并入一次，写 `seededSessionIds`（等价现有 `ensureWorkspaceRecord`，放宿主后天然幂等/无竞态） |
| `forward.set` | `listKey`、`itemId`、`on` | 原子增删 `forwarded` 记录 |
| `prefs.set` | `patch`（`scopeMode`/`sendShortcut`/`forwardPrefix`，`forwardPrefix:null` 表示删除自定义） | `global.set({ ...current, ...patch })` |
| `migrate` | `snapshot`（旧 localStorage 各键解析结果）、`source` | 两阶段：先写 `global.migration={complete:false}`，再逐记录 put，最后 `complete:true`；重复提交幂等 |

成功统一返回 `{ ok: true, rev, record? , data? }`。

**错误码**（HTTP status + JSON）：

| code | status | 含义 | 客户端动作 |
| --- | --- | --- | --- |
| `STORE_UNAVAILABLE` | 503 | profile 没有 storage 服务/后端 | 未切换：留在 local + 提示，下次启动重试；已切换：错误态，不回退 |
| `STORE_OPEN_FAILED` | 503 | 文件损坏、版本不支持、schema 不符 | 未切换：留在 local + 提示（不动浏览器数据）；已切换：错误态 + 恢复说明，不回退 |
| `STORE_BAD_REQUEST` | 400 | 未知 op/参数非法 | 记日志，Toast |
| `STORE_TOO_LARGE` | 413 | body 超限（暂定 2 MiB） | Toast |
| `STORE_FORBIDDEN` | 403 | 同源/会话校验失败 | 不处理（非本页发起） |
| `STORE_FAILED` | 502 | 后端拒绝（磁盘满、`unknown-state` 等） | 界面保持原状 + Toast，可重试 |

**鉴权**：

```js
const rejection = ctx.connection?.requestRejection?.(request)      // 官方：Host/Origin + 浏览器会话
if (rejection) return sendJson(response, rejection, { ok: false, code: 'STORE_FORBIDDEN' })
```

- `ctx.connection` 不存在（无 connection 的宿主）时退回现有 `sameOrigin(request)`；再退化为「Origin 缺失允许」（Desktop 代理会剥 Origin，见 `route.js` 注释）。
- POST 要求 `content-type: application/json`；`cache-control: no-store`；响应不缓存。
- 不暴露绝对路径；`STORE_OPEN_FAILED` 的 message 只给 `aside_note.json` 与错误码，路径写进 README。

### 6.3 并发与顺序

- 领域写链本身串行化；`update` 是原子读改写，多标签/多客户端同时 `list.patch` 不会互相覆盖整条记录（同一 item 仍是后写覆盖，可接受）。
- 领域到后端的路由由 profile 的 `storage-domain.routes` 决定，不写死 `json`；换成 sqlite 后端也能工作（本方案默认走 dsh-base 的 `json`）。
- 同进程只有一份领域；不同 DSH 进程（Desktop + `dsh web` 共用 `$DSH_HOME`）没有跨进程锁——官方 `workspace.json` 也是同样约束，写进 README 的已知限制。
- `list.ensure` 的合并移到宿主后，消除了「两个标签同时首次打开工作区 → 后写覆盖 `seededSessionIds`」的竞态。

---

## 7. 浏览器半边设计

### 7.1 启动时序：先探测，再决定这一页用哪个存储

```text
apply(ctx)
  ├─ 立即：注册样式/locale/slot/入口（不等存储）
  └─ bootStorage()（异步，不阻塞 UI）
        ├─ 已切换（localStorage 有 dsh.aside-note.storage-mode = host）
        │     GET /store
        │       ├─ 200          → host：装缓存、rev=…
        │       └─ 不可用        → 错误态：不读不写 localStorage（见 §7.5）
        └─ 尚未切换
              GET /store
                ├─ 200，宿主为空   → 有本地便笺就 POST migrate 迁入 → 标记 host → host
                ├─ 200，宿主非空   → 直接标记 host（不迁移；本地旧数据保留并提示）
                └─ 不可用           → 本页留 local，提示用户，**下次启动重试**
```

- “不可用”包括四种：没有 store 路由（旧宿主/插件未升级）、profile 没挂 storage、`storageDomain` 打不开文件（损坏/版本不符）、网络失败。
- **成功切换后才写标记** `dsh.aside-note.storage-mode = host`；没成功就什么都不写，下次启动重新探测。
- 切换成功后**不再自动回退**；宿主暂时不可用时是错误态，而不是偷偷改回浏览器存储。
- 启动不阻塞 UI：入口先渲染（角标 0），ready 后刷新；面板在 ready 前打开时显示轻量骨架行。
- `ensureWorkspaceRecord` 这类“首次打开才写”的逻辑在 ready 后跑；草稿若留在浏览器，`ensureDraftScope` 不受影响。

### 7.2 内存缓存 + 写路径

```ts
// storage/state.ts + ops.ts（示意）
let data: Snapshot | null = null      // 权威只读快照
const pending = new Map<string, Promise<unknown>>()  // 按记录串行
let rev = 0

export function readTable(name) { return data?.[name] ?? {} }

export async function patchList(listKey, kind, upserts, deletes) {
  // 便笺不等乐观更新：宿主确认后拿权威记录替换缓存，界面在成功后一次到位。
  const response = await postOp({ op: 'list.patch', listKey, kind, upserts, deletes })
  applyRecord(kind, listKey, response.record) // 宿主已做归一化（去重/上限/排序）
  notifyChange()
}
```

取舍：

- **便笺写操作等宿主确认再改界面**（本机回环通常几毫秒，含一次 fsync），保留现有「失败时界面完全不动」的承诺，不需要回滚逻辑；`useMemoStore.commit` 改为 async，并按 list 串行。
- **转发标记 / 偏好 / （若迁移）草稿用乐观写 + 失败 Toast**：这些是展示性/低风险状态，失败不阻塞。
- 客户端发送的是 **diff**（新增/改动的 item + 删除的 id），不是整条记录——避免两个标签同时编辑不同条目时互相覆盖。

### 7.3 同步读兼容

现有 UI 调用点（`useSessionMemoStore`、`headerEntry`、`MemoPopover`、`index.ts` 的 `readScopeMode`/`ensureWorkspaceRecord`）保持同步函数签名：

- `readSessionRecord/readWorkspaceRecord/readForwardedIds/readScopeMode/readSendShortcut/readForwardPrefix` → 从缓存读（未切换/迁移失败时仍读 localStorage）。
- `writeSessionRecord` 等改为「算 diff → POST → 返回合并后的记录」的 async 版本；`useMemoStore.commit` 随之变 async 并等待它（涉及 `useNoteActions`/`useComposerDraft` 约 6 个 handler）。转发/偏好这类展示性写仍保留 fire-and-forget 的同步外壳。

### 7.4 多标签 / 多端

- **同浏览器多标签**：`BroadcastChannel('dsh-aside-note')` 广播 `{rev, table, key, value}`；其他标签把无 pending 写操作的记录直接替换并通知 UI，有 pending 的保持乐观值等自身 ack。
- **同一 Host 的其它浏览器/窗口**：不做推送；面板每次打开时重新 GET 一次（廉价），能看到别人已写入的数据。
- **不做跨机器同步、不做健在轮询、不做 SSE**（本期）：`domain/changed` 事件已具备，但跨进程推送是官方记录的已知限制，列为后续（见 §12-D3）。

### 7.5 切换决策与失败处理（不做运行时开关）

用两个本地标记把状态机钉死：

- `dsh.aside-note.storage-mode = host`：**只在切换成功后写**，表示“以后只认宿主”。
- `dsh.aside-note.storage-notice = { code, at }`：提示去重——同一原因码 24 小时内只弹一次，原因码变化立即弹；避免每次刷新都骚扰。

| 状态 | 宿主探测 | 行为 | 用户提示 |
| --- | --- | --- | --- |
| 未切换 | 可用 + 空 | 有本地便笺则迁移 → 标记 host → host | 迁移成功 Toast（带条数） |
| 未切换 | 可用 + `migration.complete=false` | 上次迁移中断：重发快照补完 → 标记 host | 迁移成功 Toast |
| 未切换 | 可用 + 非空 | 标记 host，**不迁移**；本地旧数据保留 | 一次性提示“已使用宿主便笺；本浏览器旧便笺未合并” |
| 未切换 | 不可用 | 本页 local，行为同 1.1.x；不写标记 | Toast（原因）+ 设置页状态；下次启动重试 |
| 已切换 | 可用 | 正常 host | — |
| 已切换 | 不可用 | 错误态：只读本次加载到的快照（fresh load 则为空），禁止写；**不切回 localStorage** | 面板错误条 + 重试按钮 |
| host 模式 | 单次写失败（502） | 界面保持原状 + Toast；后续写继续 | 可重试；不落离线队列 |
| host 模式 | 网络瞬断 | 探测超时 4 s、写超时 10 s；GET/POST 重试 2 次（250/1000 ms），仍失败按上两条 | 同上 |

三条原则：

1. **未切换时失败 = 不切换**，继续用浏览器存储，数据一条不动；因为没写过宿主，下次探测/迁移是安全的。
2. **已切换后失败 = 报错**，绝不自动改回 localStorage；否则同一份便笺会分成“文件里旧的 + 浏览器里新的”两份。
3. **迁移成功后不回退**：想改回浏览器存储只能先导出/备份再人工处理（见 §12-D7）。

提示文案（i18n 新增）：`storage.migrated`、`storage.keptLocal`、`storage.notSwitched`（带原因码）、`storage.hostError`、`storage.retry`。设置页“关于”里常驻一行当前模式与最近一次失败原因。

### 7.6 切换与迁移算法（两阶段 + 标记）

```text
MODE_KEY   = 'dsh.aside-note.storage-mode'    // 只写 'host'
NOTICE_KEY = 'dsh.aside-note.storage-notice'  // { code, at } 去重提示

boot:
  if localStorage[MODE_KEY] === 'host':
      snap = GET /store
      if 失败: return host-error            // 不碰 localStorage，不写任何东西
      return host(snap)

  snap = GET /store
  if 失败:                                  // 404 / 503 / 超时
      notice('unavailable', code)
      return local                          // 不写标记，下次启动重试

  if snap.prefs.migration && snap.prefs.migration.complete === false:
      // 上次迁移中断：宿主可能已有半份数据，必须补完再切换
      POST /store { op:'migrate', snapshot: 本地快照 }
      if 失败: notice('migrateFailed'); return local
      notice('migrated', n); 写 MODE_KEY='host'; return host(snap)

  if snap.empty:
      if 本地有便笺:
          POST /store { op:'migrate', snapshot: 本地快照 }   // 宿主侧两阶段
          if 失败: notice('migrateFailed'); return local
          notice('migrated', n)
      写 MODE_KEY='host'
      return host(snap)

  // 宿主已有数据（另一个浏览器先升级，或文件已存在）
  写 MODE_KEY='host'
  if 本地有便笺: notice('keptLocal')        // 不自动合并，见 D5
  return host(snap)
```

- **为什么迁移成功后才写标记**：标记就是“以后只认宿主”的承诺；第一次成功写入/确认前绝不写，避免切到一半没法回头。
- **迁移中断可补**：宿主侧先写 `global.migration = { complete:false }`，再逐条 put，最后置 `complete:true`；下次启动看到 `complete:false` 就重发同一份快照（put 幂等）。注意分支顺序——必须先处理“未完成迁移”，否则“宿主非空”会被误判成“别的浏览器已迁好”而跳过。
- **localStorage 不清理**：它是唯一的恢复来源；也保证迁移中断后还能重发完整快照。
- **清站点数据**：会丢掉 `MODE_KEY`；下次启动当作“未切换”重新探测，宿主非空 → 直接进 host，不会重复迁移。

---

## 8. 需要改的文件清单

| 文件 | 改动 | 风险/备注 |
| --- | --- | --- |
| `host/store-spec.js` | 新增：领域 spec + zod schema | 依赖 `zod` 安装级解析 |
| `host/normalize.js` | 新增：便笺归一化（去重/截断/时间戳兜底），与 `domain/items.ts` 同规则 | 与客户端重复，靠契约测试防漂移 |
| `host/store.js` | 新增：懒打开、快照、`list.patch/ensure`、`forward.set`、`prefs.set`、`migrate`、关闭 | 核心，需单测覆盖 |
| `host/store-route.js` | 新增：GET/POST 路由、鉴权、体积上限、错误码 | 复用 `route.js` 的 sameOrigin/readBody 思路 |
| `host/http.js` | 新增（可选）：抽出 `sameOrigin`/`readBody` | 避免两处漂移 |
| `host/route.js` | 小改：改用共享 helper（行为不变） | 低 |
| `index.js` | 注册 store 路由 + dispose；保留更新端点 | 低 |
| `package.json` | `dependencies` 加 `zod`；版本 1.2.0；`files` 已含 `host` | 低 |
| `src/client/storage/host-client.ts` | 新增：fetch、超时、JSON/错误码解析 | 参考 `update/host.ts` |
| `src/client/storage/state.ts` | 新增：模式、快照缓存、rev、pending、同标签广播 | 核心 |
| `src/client/storage/ops.ts` | 新增：diff 写、串行队列、乐观/回滚、迁移 | 核心 |
| `src/client/storage/boot.ts` | 新增：探测、hydrate、迁移、ready/notice | 核心 |
| `src/client/storage/legacy.ts` | 新增：旧 `localStorage` 快照、`storage-mode`/`storage-notice` 标记与提示去重 | 低 |
| `src/client/storage/session.ts` / `workspace.ts` / `forwarded.ts` | 改为 local 实现 + 宿主实现分发；`ensureWorkspaceRecord` 调宿主 `list.ensure` | 中 |
| `src/client/storage/prefs.ts` | 拆成「设备级（localStorage）」与「用户偏好（宿主 global）」 | 中 |
| `src/client/storage/events.ts` | 增加 `onStoreReady/onStoreError`；保留 `TODO_LISTENERS` | 低 |
| `src/client/constants.ts` | 新增 store 路径、`storage-mode`/`storage-notice` 标记键、超时/重试常量 | 低 |
| `src/client/ui/useSessionMemoStore.ts` | `commit` 改 async + 串行；错误走事件 Toast | 中 |
| `src/client/ui/useNoteActions.ts` / `useComposerDraft.ts` | handler 适配 async commit | 中 |
| `src/client/ui/MemoPopover.ts` / `headerEntry.ts` / `src/client/index.ts` | ready 门控、骨架、错误态、迁移后刷新 | 中 |
| `src/client/ui/usePanelSettings.ts` | 偏好写宿主（乐观 + Toast） | 低 |
| `src/client/ui/SettingsPanel.ts` | 关于区显示存储位置/模式；可选「导入旧便笺」 | 低（若做 D5） |
| `src/client/i18n/*.ts`（8 种） | 新键：`storage.loading`、`storage.migrated`、`storage.keptLocal`、`storage.notSwitched`、`storage.hostError`、`storage.retry`；调整 `storage.failed` 文案 | 8 语言同步 |
| `client/client.js` | `npm run build` 重新生成 | CI 校验 |
| `tests/host-store.test.mjs` | 新增：spec/路由/store 单测（假 ctx + 假 domain） | 核心 |
| `tests/bundle.test.mjs` | 新增 host 模式套件；原 local 套件保留 | 中 |
| `tests/contract.test.mjs` | 更新存储相关断言；删除「不得存在 migrate.ts」旧断言；新增路由/领域/打包约束 | 中 |
| `docs/architecture.md` | §1/§4/§6/§8：宿主不再「只做更新」；数据流与目录更新 | 必做 |
| `README.md` / `README.en.md` | 「数据保存在哪里」重写：文件路径、跨浏览器、备份、切换规则、已知限制 | 必做 |
| `CHANGELOG.md` | 1.2.0 中英文条目 | 必做 |
| `docs/release.md` | 端点清单补 store 路由（若文中列了端点） | 低 |

---

## 9. 测试计划

### 9.1 宿主单测（`node --test`，不依赖 DSH）

- 用假的 `ctx`（`get('storageDomain')` 返回假 facility；假 domain 的 `table(name)` 返回带 `get/entries/size/put/delete/update` 的句柄，`global` 带 `get/set`）驱动 `host/store.js`：
  - 首次 `list.patch` 建立记录、`updatedAt` 由宿主写入；
  - 并发两次 `list.patch`（不同 item）都保留；
  - `list.ensure` 只并入一次，删除后不复活；
  - `forward.set` 增删；`prefs.set` 合并/删除 `forwardPrefix`；
  - `migrate` 幂等、两阶段标记、重复提交不重复写；
  - `open` 抛 `malformed-medium` → 路由返回 503 `STORE_OPEN_FAILED`；
  - 未挂 storage → 503 `STORE_UNAVAILABLE`。
- 路由层：方法/同源/Origin 缺失/content-type/body 超限/错误码映射；`requestRejection` 存在时优先使用（用假 connection 验调用）。

### 9.2 bundle 集成（jsdom）

- 用内存版 store 端点 stub `window.fetch`：
  - hydrate 后角标/面板读到宿主数据；
  - 新增 → 请求体是 diff → 用响应刷新界面；
  - 写失败（502）→ 界面保持原状 + Toast；
  - **未切换 + 不可用**：留在 local、发出一次提示、不写 `storage-mode`、不写宿主；
  - **未切换 + 宿主为空 + 本地有数据**：发出 migrate → 写 `storage-mode=host` → 之后从宿主读；
  - **未切换 + 宿主非空 + 本地有数据**：不迁移、写 `storage-mode=host`、提示“旧便笺保留未合并”；
  - **未切换 + 宿主 `migration.complete=false`**：重发 migrate（即使宿主非空），补完后再写标记；
  - **已切换 + 不可用**：显示错误态，断言 localStorage 的便笺键没有被新写；
  - **迁移失败**：不写 `storage-mode`、本页留在 local，宿主保留 `complete=false`，下次启动重试；
  - `BroadcastChannel` 收到变更 → 另一标签刷新（jsdom 里 fake channel）；
  - 404/非 JSON/503 → 走“未切换 + 不可用”分支（原套件覆盖 basic 行为）。
- 保留原 local 模式套件作为回归。

### 9.3 契约测试

- 客户端 bundle 不得出现 `node:`/`require('node:`（现有约束）；
- 客户端 bundle 不得包含 `storageDomain`/`zod` 字样（防止宿主代码被打进客户端）；
- 客户端与宿主的 store 路径常量一致；`storage-mode`/`storage-notice` 两个标记键只在 boot 模块读写；
- 领域名/版本/表名匹配 `UNIT_NAME_RE`；
- `host/store-spec.js` 的 schema 键与 `constants.ts` 的键一致；
- 迁移逻辑只在 boot 模块出现一次（防止多点写入）。

### 9.4 手工验收（Desktop + 浏览器）

1. Desktop 打开面板 → 写一条 → 检查 `~/.dsh/storages/aside_note.json` 出现且内容正确；
2. 刷新、重启 DSH → 便笺仍在；
3. 换一个浏览器（同 Host）→ 读到同一份便笺；
4. 清站点数据 → 便笺仍在（这是本次改动的核心收益）；
5. 旧版数据迁移：临时回退到 v1.1.4 写入数据 → 升级 → 自动迁移、内容一致、localStorage 未清；
6. **模拟不可用**：备份后把 `aside_note.json` 改名为 `.bak` 并写坏内容，或用未挂 storage 的 profile → 升级启动后留在 local、出现提示、`storage-mode` 未写；恢复文件后再次启动 → 完成迁移；
7. **已切换后不可用**：进入 host 模式后临时改坏文件 → 面板显示错误态 + 重试，localStorage 便笺键没有新增写入；
8. 两个标签同时勾选不同条目 → 都不丢；同一条目 → 后写覆盖（可接受）；
9. 首页 → 打开面板期间无闪烁/报错；更新卡片仍正常。

### 9.5 测试体系落点

按仓库的规则 → 用例 → 测试三层补齐宿主存储：

| 规则 | 用例 | 测试 |
| --- | --- | --- |
| `R-STORE-HOST-FILE` | `STORE-019`、`STORE-026` | `tests/host-bundle.test.mjs`、`tests/host-store.test.mjs` |
| `R-STORE-HOST-SWITCH` | `STORE-019/020/021/024` | 同上 |
| `R-STORE-HOST-UNAVAILABLE` | `STORE-020/022/025` | 同上 |
| `R-STORE-HOST-MERGE` | `STORE-023` | `tests/host-store.test.mjs` |
| `R-STORE-CAPACITY` | `STORE-027`（宿主 401 条） | `tests/host-store.test.mjs` |
| `R-STORE-HOST-PATH` | `STORE-028`（路径、拷贝、定位） | `tests/host-store.test.mjs`、`tests/host-bundle.test.mjs` |

`STORE-001` 的验收语从「启动不写迁移标记」改为「宿主不可用时启动保留便笺且不切换」；宿主可用时的迁移由 `STORE-019` 承担。规则变更已通过 `design:review --approve --by reviewed-in-chat`，执行结果由 `test:run` 写入 `.test/runs/`。

---

## 10. 文档与发布

- README 的「数据保存在哪里」重写为：

  > 便笺保存在 DSH 宿主（不是浏览器）：`$DSH_HOME/storages/aside_note.json`（默认 `~/.dsh/storages/aside_note.json`）。
  > - 同一个 Host 上，所有浏览器/标签页读到同一份便笺；换浏览器、清站点数据都不丢。
  > - 换设备（不同 Host）不会同步；需要自行拷贝该文件或备份 DSH home。
  > - 卸载插件不会删除该文件；删除前请自行备份。
  > - 升级后首次打开会先检查宿主存储：可用就把浏览器里已有的便笺一次性迁入，之后只读写宿主；不可用则继续保存在浏览器并提示，下次启动重试。迁入后不会自动回退，旧 `localStorage` 仅作恢复来源。

- 记录已知限制：多进程同写无锁（Desktop + CLI 共用 `$DSH_HOME`）；文件损坏时面板报错而不是自动重建。
- `CHANGELOG` 1.2.0：**Breaking-ish**——存储位置从浏览器改为宿主；升级首次启动自动检查并迁移，不可用时留在浏览器并提示；切换成功后单向使用宿主（不提供运行时回退开关）。
- 发布前跑 `npm run check` + Desktop/Web 手工验收（§9.4）。

---

## 11. 风险与缓解

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| DSH 版本差异：无 `storageDomain` | 宿主 503 | 启动探测：未切换就留在 local + 提示，下次重试；文档写明支持的 DSH 版本下限（实测 0.2.2-rc.3） |
| 文件损坏 / 版本不兼容 | 面板读不到便笺 | 503 + 明确错误态 + README 恢复步骤（先备份再重命名 `aside_note.json`，重启生成空文件；旧数据仍在 localStorage，可重新迁移） |
| 多进程写同一文件 | 后写覆盖 | 已知限制；写进 README；单文件原子替换保证不会写坏（最坏丢一次更新） |
| 多标签丢更新 | 编辑互相覆盖 | 客户端发 diff + 宿主 `update` 原子合并；首次合并 `list.ensure` 移宿主 |
| 迁移中断 | 部分数据 | 两阶段 `migration.complete` + 幂等重试 + 保留 localStorage |
| 同步读改异步导致时序 bug（角标/合并重复执行） | 小 | ready 门控 + `ensure*` 只在 ready 后执行；集成测试覆盖 |
| 写延迟（fsync） | 点击后 ~1–10 ms | 等确认再更新 UI；批量操作一次请求 |
| Electron 路由可达性 | 功能在 Desktop 失效 | 复用已上线的 update 路由模式；发布前 Desktop 实机验收 |
| 隐私：便笺落盘 | 同机其他用户/备份可读 | 目录 0700/文件 0600（官方保证）；README 明示；不做额外加密 |

---

## 12. 决策记录（D4/D7 已定，其余待拍板）

| # | 决定 | 推荐 | 备选 |
| --- | --- | --- | --- |
| D1 | **草稿是否上宿主** | **已定：留在浏览器**（高频写、设备内临时状态；README 说明「草稿不跨浏览器」） | 上宿主（本期不做） |
| D2 | **布局** | **已定：`single` 单文件** `aside_note.json`（整文件原子替换、易备份、迁移简单） | `per-record`（本期不做） |
| D3 | **多端同步** | **已定：不做跨机器同步**；保留同浏览器多标签 BroadcastChannel + 打开面板时刷新 | 跨机器/SSE（后续，不在本期） |
| D4 | **切换失败策略** | **已定（你要求）：未切换时不可用 → 不切换、留 local、提示、下次重试；已切换后不可用 → 错误态，不回退 local（避免分叉）** | — |
| D5 | **Settings 存储入口** | **已定：v1 只显示状态**（模式 + 文件名 + 最近失败原因）+ 一次性迁移提示 | 导入/导出/合并 UI（后续） |
| D6 | **命名** | **已定**：领域/文件名 `aside_note`，版本 `1`，路由 `/dsh-aside-note/store` | — |
| D7 | **运行时回退开关** | **已定（你要求）：不做**。改为启动时检查宿主可用性：不可用不切换并提示，可用则迁移后单向使用宿主 | —（详见下方说明） |

### D7 说明：为什么不做运行时回退开关，改成启动检查

原方案里的 `storage: local` 配置项取消。理由：一个“随时能切回浏览器”的开关意味着两份数据都可能被写，之后还要决定谁合并谁、怎么合并——这正是数据分叉的复杂度来源。改成**一次性的切换判定**后，规则简单得多：

1. **升级后第一次启动**：探测宿主存储是否可用。
2. **可用**：宿主为空且有浏览器旧数据 → 迁移 → 写标记 `storage-mode=host`；宿主非空 → 直接写标记，不迁移（宿主优先，提示用户旧数据保留）。
3. **不可用**：**不切换**，本页继续用浏览器存储，提示原因；不写任何标记，下次启动重新探测。期间新增的便笺还在浏览器里，等下宿主可用时一起迁走（因为宿主仍为空）。
4. **切换成功后**：后续读写只走宿主；宿主再不可用是错误态（面板提示 + 重试），不会自动回退。

这样每个浏览器最多只会经历一次“未切换 → 已切换”，之后只有一个写者，不存在“文件里一份、浏览器里一份”的长期分叉。

用户可见的提示（不新增设置开关）：

- 迁移成功：一次性 Toast“已把本浏览器的 N 条便笺迁入 DSH 本地文件”。
- 未切换（不可用）：Toast“宿主存储暂不可用（原因），便笺仍保存在本浏览器；下次启动会重试”。
- 宿主非空且本浏览器有旧数据：一次性提示“已使用宿主便笺；本浏览器旧便笺保留未合并”。
- 已切换后不可用：面板内错误条 + “重试”按钮。
- 设置 › **数据存储**独立成组（位于「隐私」之上）：当前存储模式、完整文件路径、拷贝与在文件管理器中定位、最近一次失败原因；不再放在「关于」里。

开发/验收没有开关怎么办？用环境构造而不是配置项：临时用未挂 storage 的 profile、临时改 `storage-json.root`、或备份后改名 `aside_note.json`（模拟打开失败）。这些都是测试手段，不进入用户配置面。

---

## 13. 分阶段实施

| 阶段 | 内容 | 产出 | 估时 |
| --- | --- | --- | --- |
| P1 | 宿主：spec/store/routes + 单测 | 可 `curl` 读写的真实端点 | ✅ 1.5 d |
| P2 | 客户端：host-client/cache/boot/mode/facade + 单测 | 浏览器侧能探测、hydrate、写、迁移、记录模式标记 | ✅ 2 d |
| P3 | UI 适配：async commit、ready 门控、提示/错误态与重试、设置页存储状态、8 语言 | 行为与现在一致，切换与失败都有可见反馈 | ✅ 1.5 d |
| P4 | 集成测试 + 契约测试 + 手工验收 | 单元/集成/契约全绿；Desktop 实机验收待做 | ✅ 1.5 d |
| P5 | 文档/变更日志/发布准备 | 文档与 next-released 已写；版本号由发布流程升到 1.2.0 | ✅ 0.5 d |

依赖顺序：P1 → P2 → P3 → P4/P5 可并行。

---

## 14. 验证记录（本次研究实际确认的事实）

- 运行时：DSH `0.2.2-rc.3`，profile `desktop`；GUI `http://127.0.0.1:53272`。
- `~/.dsh/storages/` 实际存在 `workspace.json`（`unit.version = 2`）、`schedule.json`、`session_projcache/`、`forge_panel_change_requests/`，与 `dsh-base` 的 `storage-json.root = dshHomePath('storages')` 一致。
- `dsh-base/cordis.patch.yml:179-190` 挂载 `storage` / `storage-json` / `storage-domain`；`dsh-web-app/cordis.patch.yml:183/238` 挂载 `webserver` 与 `connection`。
- `dsh-storage-domain/src/index.ts`：`domainCtx.provide('storageDomain', facility)`；`open()` 校验 zod schema；`storage-domain/src/domain.ts` 读同步、写走写链。
- `dsh-storage-json/src/atomic.ts`：临时文件 `0600`、`fsync`、`rename`、父目录 `fsync`。
- `dsh-host-frontend-static/README.md`：未命中的 named route 由 fallback 回答，缺失路径返回空 404（客户端可用 404/非 JSON 探测端点）。
- `dsh-client-connection/src/rpc-host.ts:123`：`requestRejection(request) -> 401 | 403 | undefined`。
- 本包现有宿主路由（`host/route.js` + `index.js`）通过 `ctx.inject(['webServer'], ...)` 挂载，桌面端更新已可用——新路由沿用同一模式。

> 未验证（落地时需确认）：Desktop 渲染进程对**新增自定义路由**的 fetch（与 update 路由同源同机制，风险低，但发布前必须实机跑一遍 §9.4）。`zod` 随插件依赖安装，不依赖 DSH 安装目录的副本。
