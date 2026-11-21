# Operations Changelog / 运营记录

本文件记录**产品运营与工程基建**一侧的改动：README 与文档结构、截图与预览图、插件市场上架物料（图标、展示图清单）、发布链路与构建工具。

用户可见的功能变化一律记在 [CHANGELOG.md](./CHANGELOG.md)，两边按版本号对齐：

- 功能、体验、兼容性改动 → `CHANGELOG.md` 的 `## next-released`（会进入 Release 正文与面板更新卡片）。
- 截图、上架物料、文档结构、发布与构建工具 → 本文件的 `## next-released`（**不会**进入 Release 正文）。

约定：

- 本文件**不使用** `app-update-notes` 标记。那颗标记是给 `tools/release/notes.mjs` 与面板解析用的，写在这里会被误当成用户可见说明。
- 本文件**不随 npm 包发布**（不在 `package.json` 的 `files` 里），只存在于仓库。
- 发布时 `npm run release` 会像处理 `CHANGELOG.md` 那样，把本文件的 `## next-released` 改名为 `## <version>`，并在顶部插入新的空标题（前提是本文件已经 commit 进仓库）；两边版本号因此始终对得上。

## next-released

- **市场上架：** `package.json` 增加 `engines.dsh`（`>=0.2.1-alpha.3 <0.3.0-0`），插件市场不再显示「未声明宿主要求」。下限取自实际用到的能力：`conversation.hero.options` 插槽自 0.2.1-alpha.3 起才有，宿主文件存储依赖的 `storageDomain` 在 0.2.1 线已默认随 profile 装配；上限按当前验证过的 0.2.x 线收敛。

## 1.2.0-beta.1

- **测试基建：** 引入测试案例目录 `tests/catalog/`（8 个业务域、64 个稳定 ID 的案例，全部自动化）与校验器 `tools/catalog/check.mjs`，CI 增加 `npm run catalog:check`；`tests/bundle.test.mjs` 的 4 个 jsdom 集成用例拆成按案例 ID 命名的 46 个子用例，单点失败不再掩盖后续场景，`npm test` 由 130 个用例增至 197 个。字段与 ID 规则见 [`tests/catalog/README.md`](./tests/catalog/README.md)，整体流程见 [`docs/testing.md`](./docs/testing.md)。
- **有效性证据：** 新增 `npm run test:mutate`（`tools/catalog/mutate.mjs`）——对实现注入 13 个真实缺陷、重建并跑全套用例，记录哪些用例抓到变异，结果写入 [`docs/test-validity.md`](./docs/test-validity.md)。首轮 9/13，补掉两个测试盲区（存储侧超长文本、确认窗口常量被假时钟掩盖）后达到 13/13。
- **执行记录：** 新增 `tools/catalog/run.mjs`（`npm run test:run` / `test:strict`）：按用例把测试结果落成 `run.json`（PASS/FAIL/SKIPPED/MISSING、逐用例耗时、commit、按域汇总），并生成 `report.md` / `report.html`；支持与上次运行对比、复核哈希（结果被改即失效）与发布门禁。CI 改用 `test:run` 并上传运行记录作为 artifact。
- **规则评审：** 新增 `npm run design:review`：一屏索引（规则 / 分支数 / 用例数 / 评审状态）、`--since` 只看改动、`--approve` 写入审批哈希、`--strict` 作为门禁。`design.yaml` 的每条规则增加 `failure`（违反后果）与结构化 `branches`（valid / invalid / boundary / n-a），审批绑定 statement+failure+branches 的内容哈希，规则一改评审自动过期；`catalog:check` 同步增加结构、措辞与过期审批校验。2026-11-18 完成 34/34 首轮人工评审（审批人记录为 `reviewed-in-chat`），P0 相关的 16 条已纳入 CI 门禁：改动后未重新评审会直接失败。
- **用例设计：** 新增 [`tests/catalog/design.yaml`](./tests/catalog/design.yaml)（34 条业务规则 + 4 条不变量）与 [`docs/case-design-method.md`](./docs/case-design-method.md)：用例改为从规则推导、再落到测试，不再从已有测试反推；12 条已设计未实现的用例以 `state: planned` 入库，`catalog:check` 增加规则覆盖（34/34）、用例指向规则、planned 必须写理由三项校验。
- **案例规范：** 目录按 A 正常主流程 / B 合法变体 / C 规则与边界 / D 异常输入与状态 / E 故障恢复 / F 并发与交互 六类标注（当前 A4 B21 C24 D6 E5 F4，64 条全部自动化），`catalog:check` 增加分类校验与分布统计；整体流程见 [`docs/testing.md`](./docs/testing.md)——规则、用例、测试三层已打通（38 条规则全覆盖），上一版列出的 12 条 planned 已全部实现并接上测试。

## 1.1.4

- **图标：** 插件标识换成渐变便签卡叠对话气泡的母版 `docs/assets/storefront-icon.svg`，渲染出的市场上架图 `icon.png` 与插件列表的 `icon.svg` 共用同一套图形；`icon.svg` 按宿主 36 画布重绘、不再带白底，16px 下明暗两套均已核对。（[@LighghtEeloo](https://github.com/LighghtEeloo)，[#3](https://github.com/Rayle8/dsh-aside-note/pull/3)）

## 1.1.2-beta.4

- **构建：** 统计改用腾讯云 RUM（`aegis-web-sdk`），appId 直接写在 `src/client/rum.ts`。它不走构建期 `.env`：`client/client.js` 是提交进仓库的产物，本地 env 会让 CI 在无 env 时重建出不同的字节，bundle 校验必然失败。SDK 在构建时内联，所以放在 `devDependencies`。
- **体积：** 只开自定义事件（页面性能、web vitals、`onError`、接口与资源测速关闭），bundle 为 362 KB（95 KB gzip），比接 PostHog 时的 382 KB（105 KB gzip）略小。
- **版本号注入：** `tsdown.config.ts` 用 `define` 把 `package.json` 的 `version` 注入成 `__PLUGIN_VERSION__`，RUM 控制台因此能按插件版本拆分上报；取值来自已提交的文件，不破坏逐字节复现。

## 1.1.2-beta.3

- **更新路径的设计决定：** 宿主的更新端点不检查「有 agent 正在运行」，与插件市场的行为不同。理由是便笺纯属 UI、agent 从不 import 本包，而把界面插件的更新挡在别的 agent 后面成本更大；完整理由与「何时必须推翻这个决定」写在 [架构文档 §8](./docs/architecture.md)。架构文档 §1、§2 同步改为「宿主半边只做更新，不持有状态」，避免与 1.1.2 之前的「8 行 no-op」描述冲突。

## 1.1.1

- **发版前截图：** 截图 SOP 改为在 `npm run release` 之前执行，`v<version>` tag 因此自带该版本的 README 图片；发版后的补图用 `docs/<version>` 标记，不再为此发版。

## 1.1.0

- **README 截图：** 按 1.1.0 界面重拍——明暗两套都带上「工作区 / 会话」切换、工作区共享页脚与入口角标，且出自同一批便笺；Windows 上可用 `tools/screenshots/run.ps1` 复现。
- **市场上架物料：** 新增 `docs/assets/storefront-icon.svg`（主文件）与 180px 的 `icon.png`（插件卡片会裁成 16px 圆形），并新增 `screenshots.json` 声明市场展示用的图片清单，首图固定为整窗预览。
- **截图工具：** 截图脚本改为通过 CDP 固定内容视口（`SHOT_VIEWPORT=1440x900@4`），Windows 无头 Chrome 扣掉边框像素的问题不再影响成图；同时给 SOP 的便笺表加了对照 `NOTES` 的测试，改文案不会悄悄发出图文不一致的截图。

## 1.0.1

- **README 结构：** 安装说明集中为「快速安装」一节，放在「为什么做旁边记」之前，分「通过 agent 安装」与「通过命令行安装」；原先并列的 npm 依赖、git checkout、Release 包三种方式与独立的安装提示词页面一并移除，贡献者需要的 link 写法则移入「开发」。「功能」清单从 28 条合并为 10 条。
- **README 截图：** 图片按**旁边记**重新拍摄，并以 4 倍设备像素导出：浮窗标题、输入占位、空状态与设置 › 关于都已是新名字与 slogan；功能图加宽到 1080、整窗图到 1920，放大看依然清晰；四张预览图与功能图出自同一个演示会话，并隐藏侧栏账号菜单，不出现个人账号。

## 0.9.9

- **发布链路：** tag 触发的发布 workflow（含 changelog 校验）、`npm run release`，以及 `tools/release/notes.mjs`——它生成带 `app-update-notes` 标记的中英文 Release 正文（含安装链接与 Full Changelog），供面板直接读取。
- **构建：** 客户端拆分为模块，由 tsdown 构建成提交进仓库的 `client/client.js`；文案词典放在 `src/client/i18n`，`locale/*.json` 只保留包元数据。
- **CI 修复：** CSS 虚拟模块 id 统一用 `/` 分隔，Windows 构建产出的 `client/client.js` 与 Linux 逐字节一致，CI 的 bundle 校验不再失败。
