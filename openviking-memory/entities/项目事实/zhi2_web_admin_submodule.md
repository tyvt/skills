# zhi2-web-admin 子模块与门户部署结构
zhi2-web-admin 是房产综合服务平台门户（父仓库「门户」）的 git 子模块，承载 Vue2 大屏前端代码，开发分支 develop/v2.6.2-portal。

## 构建与部署
- 部署目标为 nginx 8092 站点，root 为 D:/repository/门户/dist
- 在子模块内执行 npm run build，产物直接输出到门户/dist 即部署目录，无需改 nginx 配置或重载
- 构建产物含 AreaStructurePanel-*.js 等组件包
- 根目录 market-monitor.standalone.html 为离线备用产物，非部署对象
- 构建命令为 `node scripts/vite-build.mjs build`；`dashboard.css` 由 `gen-mm-css.mjs` 手动生成且未接入构建链，直接修改 `dashboard.css` 不会被构建覆盖（2026-11-09 字体清晰度修复 fix/marketMonitor-chart-font-clarity 时确认）
- 市场监测大屏原在 `index.html` 引入外部字体 `JetBrains Mono`、`dashboard.css` 中 `--font-sans` 指向该字体；2026-11-09 字体清晰度修复已移除外部字体引入并将 `--font-sans` 改为系统字体栈；`dashboard.css` 的 `.mm-dashboard .font-mono` 工具类也曾将 `JetBrains Mono` 硬编码于 `font-family` 首位导致产物残留外部字体，同期修复中已将其改为纯系统内宽栈

## 并行任务隔离
- 主工作区可能存在并行任务的未提交改动（如 TradePanel.vue、BuyerOverviewPanel.vue、vite.config.js、public/version.json），改动时须避免夹带
- fix/portal-summary-two-per-row（2026-11-09 可售楼盘展示楼幢列表顶部信息卡由三列 flex 改为两列网格，基于 develop/v2.6.2-portal）提交 226061cf9、合并 14affaef2 并入 develop/v2.6.2-portal（HEAD 77a7e6dee），worktree zhi2-web-admin-wt-portalsummary 已移除，父仓 gitlink 同步
- fix/portal-broker-transactions-loading（2026-11-09 BrokerPages.vue 交易记录骨架屏挂起修复）提交 e2d7219dd、合并入 origin/develop/v2.6.2-portal 快进推送 166c325c8..60808eac1，worktree zhi2-web-admin-wt-brokertrans 已移除，父仓 gitlink 未 bump（详见事件记忆）
- fix/portal-house-detail-overview-align（2026-11-09 PropertyDetailDialog.vue 概览行六列对齐修复）合并 f3556a5b3 入 develop/v2.6.2-portal，worktree zhi2-web-admin-wt-housedetail-align 已移除，未推送远程；并行任务 RentalDetailDialog.vue（c20b0443c）未触碰
- 迭代惯例：默认在主工作区就地修改、保持改动于 working tree（历史会话形成）；用户亦可选择仅提交自己的改动

## 关键组件位置
- 市场监管大屏「成交面积段结构」面板：src/views/property/marketMonitor/components/AreaStructurePanel.vue
- 详情弹窗 DetailModalC 仍使用 data.js 的 commercialShare/existingShare 字段
- 可售楼盘展示楼幢列表顶部信息卡：src/views/home/publicPortal/pages/PropertyPages.vue，2026-11-09 由三列 flex 改为两列网格（项目名称|公司名称 / 项目地址|代理公司名称），窄屏保持两列、<768px 单列
- 房屋信息详情弹窗：src/views/home/publicPortal/components/PropertyDetailDialog.vue，2026-11-09 概览行六列（室号（编号）/房屋性质/层高（m）/单元号/所在自然层/套型）标签与值对齐修复（分支 fix/portal-house-detail-overview-align，合并 f3556a5b3）

## 验证与归属
- 所属项目：门户 / zhi2-web-admin
- 来源会话：2026-11-09 房产大屏改动会话

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "zhi2_web_admin_submodule",
  "source_extraction_id": "c2bd987b448a45b8acd1d99b15cd1dc6",
  "version": 9,
  "memory_type": "entities"
}
-->