
# 房地产市场运行监测决策大屏
Vue 源码大屏（zhi2-web-admin/src/views/property/marketMonitor/），2026-11-12 对齐至 market-monitor.v2.html（编译版 React 包）。

## 当前对齐状态（as of 2026-11-12）
- 参考源：market-monitor.v2.html（Vite/React 编译包，较旧参考更新），仅对齐下方图表区，navbar（MarketHeader）未改动
- 图表区像素相似度 86.17% → 98.06%（Playwright + pixelmatch，门禁 ≥98% PASS）
- KPI 行 5 格：商品房上市/网签合并、存量房挂牌/网签合并、测绘（竖排）、租赁（竖排）、经纪机构 compact，数据视图去环比箭头
- 第一行为全宽 TradePanel（商品住房/存量住房，含 donut+bar 趋势），grow-[1.35]
- 第二行 3 面板：商品房累计可售、未售房源、购房人画像
- AreaStructurePanel 已从 index.vue 引用/注册/模板/数据中移除（组件文件保留但不再使用）

## 构建与部署
- 子模块 zhi2-web-admin `npm run build` 产物直输门户/dist（D:/repository/门户/dist），经 nginx 8092 站点访问
- dashboard.css 由 scripts/gen-mm-css.mjs 从 v2 编译 CSS 重新生成（补 grid-cols-48/col-span-9-10/grow-[1.35] 等，作用域 .mm-dashboard）
- 2026-11-12 提交：子模块 ea3860a58、父仓 ea601d1，均推 origin/develop/v2.6.2-portal

## 验收与 E2E
- 测试脚本 tests/e2e/market-monitor-similarity.cjs，报告 test-results/mm-similarity/
- 结构断言：10 面板标题齐全、无「成交面积段结构」、KPI 无环比、7 canvas、监测范围切换生效、零 console 报错
- public/version.json 为构建产物未提交；market-monitor.standalone.html 为离线备用非部署对象

## 历史与注意事项
- 2026-11-09 字体清晰度修复：移除 index.html 外部 JetBrains Mono，--font-sans 改系统字体栈，.mm-dashboard .font-mono 改纯系统栈
- nginx 对 js/css 设 immutable, max-age=2592000，index.html no-cache；浏览器静态缓存可致旧 chunk 误判，强刷生效
- PORTING-SPEC.md / market-monitor-alignment.md 为遗留文档


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "market_monitor_dashboard",
  "source_extraction_id": "5e28bfd933f94709b10b769b3e6049fe",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 9,
  "memory_type": "entities"
}
-->