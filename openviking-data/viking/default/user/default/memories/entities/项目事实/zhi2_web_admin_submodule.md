# zhi2-web-admin 子模块与门户部署结构
zhi2-web-admin 是房产综合服务平台门户（父仓库「门户」）的 git 子模块，承载 Vue2 大屏前端代码，开发分支 develop/v2.6.2-portal。

## 构建与部署
- 部署目标 nginx 8092 站点，root `D:/repository/门户/dist`；子模块内 `npm run build` 产物直输门户/dist，无需改 nginx 或重载。
- 组件包含 AreaStructurePanel-*.js；根目录 `market-monitor.standalone.html` 为离线备用产物，非部署对象。
- 构建命令 `node scripts/vite-build.mjs build`；`dashboard.css` 由 `gen-mm-css.mjs` 手动生成未接入构建链，直接改不被覆盖（2026-11-09 fix/marketMonitor-chart-font-clarity 确认）。
- 2026-11-12 为对齐 market-monitor.v2.html 用 gen-mm-css.mjs 从 v2 编译 CSS 重新生成 dashboard.css（补 grid-cols-48/col-span-9-10/grow-[1.35] 等，作用域 .mm-dashboard）；marketMonitor 大屏对齐提交子模块 ea3860a58、父仓 ea601d1 推 origin/develop/v2.6.2-portal。
- 2026-11-09 字体清晰度修复：移除 `index.html` 外部字体 `JetBrains Mono` 引入，`--font-sans` 改系统字体栈，`.mm-dashboard .font-mono` 硬编码外部字体改纯系统栈。
- nginx 对 js/css 设 `immutable, max-age=2592000`，`index.html` no-cache；2026-11-10 用户复报文字不清，实为浏览器缓存旧 chunk 或根目录陈旧 `market-monitor.standalone.html`（2026-11-09 10:31 构建、早于 18:20 修复、含 26 处 #64748b），portal dist 21:36 重建含修复。

## 并行任务隔离
- 主工作区可能有并行未提交改动（TradePanel.vue、BuyerOverviewPanel.vue、vite.config.js、public/version.json），改动须避免夹带。
- fix/portal-summary-two-per-row（2026-11-09 楼幢列表顶部信息卡三列 flex→两列网格）提交 226061cf9、合并 14affaef2 入 develop/v2.6.2-portal（HEAD 77a7e6dee），wt zhi2-web-admin-wt-portalsummary 已移除，父 gitlink 同步。
- fix/portal-broker-transactions-loading（2026-11-09 BrokerPages.vue 骨架屏挂起修复）提交 e2d7219dd、快进推 166c325c8..60808eac1，wt zhi2-web-admin-wt-brokertrans 已移除，父 gitlink 未 bump。
- fix/portal-house-detail-overview-align（2026-11-09 PropertyDetailDialog.vue 概览六列对齐）合并 f3556a5b3 入 develop/v2.6.2-portal，wt zhi2-web-admin-wt-housedetail-align 已移除未推送；并行 RentalDetailDialog.vue(c20b0443c) 未触碰。
- 迭代惯例：默认主工作区就地改、改动留 working tree；用户亦可仅提交自己改动。

## 关键组件位置
- 市场监管大屏「成交面积段结构」面板：src/views/property/marketMonitor/components/AreaStructurePanel.vue（2026-11-12 已从 index.vue 布局移除，组件保留但不再引用）
- 详情弹窗 DetailModalC 用 data.js 的 commercialShare/existingShare 字段。
- 楼幢列表顶部信息卡：src/views/home/publicPortal/pages/PropertyPages.vue，2026-11-09 三列 flex→两列网格（项目名称|公司名称 / 项目地址|代理公司名称），窄屏两列、<768px 单列。
- 房屋详情弹窗：src/views/home/publicPortal/components/PropertyDetailDialog.vue，2026-11-09 概览六列（室号(编号)/房屋性质/层高(m)/单元号/所在自然层/套型）标签值对齐（分支 fix/portal-house-detail-overview-align，合并 f3556a5b3）。

## 验证与归属
- 所属项目：门户 / zhi2-web-admin；来源：2026-11-09 房产大屏改动会话。

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "zhi2_web_admin_submodule",
  "source_extraction_id": "5e28bfd933f94709b10b769b3e6049fe",
  "version": 12,
  "memory_type": "entities"
}
-->