# Real Estate Market Operation Monitoring Decision Dashboard
房地产市场运行监测决策大屏模块，2026-11-04 从压缩 React 单文件包移植到 zhi2-web-admin（Vue2 + Element UI + echarts + Vite）并完成构建部署验收，目标像素级还原。

## 源材料
- 源为压缩 React 包，抽取至 D:\repository\门户\.workbuddy\（p-Fe.js 页头、p-Ie.js KPI、p-Ree.js 交易面板、p-ze.js 中介机构、p-Re.js 面积段、p-zee.js 累计可售、p-Bee.js 购房人总览、p-Vee/Hee/Uee.js 弹窗、dashboard-src.html）
- 完整单文件参考：C:\Users\Administrator\Documents\WXWork\...\房地产市场运行监测决策大屏-单文件版.html
- 工作参考渲染：.workbuddy\test-scoped.html（截图对比保真度）

## 页头与KPI组件
- MarketHeader.vue：渐变页头，含 logo/标题、实时时钟、统计周期与监测范围下拉、全屏切换
- KpiCards.vue：6 张 KPI 卡，期房/现房切换（computed）、环比徽标（箭头图标 + emerald/rose 文字/箭头色，无边框无背景色）
- DistrictPie.vue：仅图例列表（双列，Q9 颜色 / Z9 顺序），不含图表

## 基础集成
- assets/dashboard.css（.mm-dashboard 作用域隔离编译 Tailwind，已拆 @layer 与项目 UnoCSS 正常竞争层叠）、LucideIcon.vue、ChartBox.vue（props option, height）、data.js（导出 Y9,X9,S,C,w,Iee,Lee,Z9,Q9,b,themes,Pe,districtInfo）、supplement.css（.mmd-screen/.mmd-row1/.mmd-row2）
- index.vue 根布局（.mm-dashboard 根 + 页头 + KPI + 两行栅格）汇总所有面板；组件位于 src/views/property/marketMonitor/components/
- 路由新增 #/market-monitor（白名单，hash 模式），首页 index-new.vue 的 handleStatsMore 改为 this.$router.push('/market-monitor')

## 部署
- 构建后由本地 nginx 站点 门户.conf（端口 8092，root=D:/repository/门户/dist）提供，访问 http://127.0.0.1:8092/index.html#/market-monitor

## 验收
- npm run build 通过；E2E 29 项断言全通过（tests/e2e/market-monitor-visual.spec.ts）；像素对比原版 @1920x1080 差异 2.43%（97.57% 相同）
- 分辨率兼容 1920x1040 整页无遮挡（docH=winH=1040）/ 1366x768 平滑滚动不重叠；三处调整（付款方式左图右表、未售情况改 tab、未售柱状图加高）；其余 100% 还原（差异仅限调整 + 实时时钟 + 抗锯齿）；原包 Gee 弹窗 l/d/p 从未触发，移植后保持同样不触发

## 单文件导出
- 2026-11-05 应需求将大屏导出为无依赖单文件 HTML：market-monitor.standalone.html（约 1.28MB，位于工作区根目录）
- 构建方式：建独立 Vite 构建（standalone-build/ 目录：vite.standalone.config.mjs + assemble-html.mjs），内联 Vue 2.7.16 运行时、echarts 5.4.3、全部组件与数据、dashboard.css + supplement.css 至单一 HTML
- 项目耦合点处理：vuex mapState/$store.dispatch 与 resolveServerAssetUrl 做最小 stub（logo 走 lucide 兜底图标，无后端请求）
- 验证（Playwright）：零外链（仅 1 script + 1 style，无外部 src/href/link/url(http)，www.w3.org 仅为 SVG 命名空间）、file:// 直接打开 0 报错 0 网络请求、UI 与参考图逐区块一致、范围筛选与各面板 tab 切换正常
- 源码三个详情弹窗（l/d/p）原本未接线触发，导出后保持一致不可达
- 用户选择暂不提交 Git；临时验证 nginx 站点（端口 8099）已删除释放；standalone-build/ 脚手架保留以便后续重跑生成

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "market_monitor_dashboard",
  "source_extraction_id": "530d6e2afa57440798c80691d931692c",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 6,
  "memory_type": "entities"
}
-->