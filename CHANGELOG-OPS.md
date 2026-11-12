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
