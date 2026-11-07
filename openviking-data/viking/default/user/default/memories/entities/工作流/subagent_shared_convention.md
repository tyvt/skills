# 多subagent并行开发共享约定清单
拆分HTML原型给多个subagent并行开发看板页面前，需固化共享约定清单以避免不一致隐患。

## 背景与问题
- 把HTML原型拆成商品房/存量房/租赁/行业管理/热力等一批Vue菜单页，拆给多个subagent并行，各agent只负责自己1-2个页面，公共mock/图表封装/地图loader由另一agent提供。
- 各agent看不到彼此实现，易各自造轮子：注册名大小写错误（DaEChart vs DaEchart）、字段名照任务描述写错（heatStock vs实际heatStockList/heatStockDeal）、图表配色硬编码不一致。

## 约定清单
- 图表组件统一 import DaEchart from '../components/EChart.vue' + components:{DaEchart} + 模板<da-echart>，注册名必须精确DaEchart，禁写DaEChart。
- 数据一律来自 ../mock/index.js 具名导出，字段名以实际导出为准，先核对再写（本次描述写heatStock实际heatStockList/heatStockDeal）。
- 图表option配色/字号统一取 theme.js 的 C/PALETTE/base token，禁页面写死色值。
- 各自只改自己页面文件，公共mock/components/router/mapLoader由专人先落地维护，agent不得越界。
- 落盘后由Lead统一构建，不让每个agent各跑一次build。

## 验证与归属
- 验证：会话 session-6c46bea2-2d63-4a2d-b33f-f111655982f2（基线a86bf95）子agent结论反复强调统一DaEchart、数据来自mock、option用theme.js、未跑build。
- 涉及文件：zhi2-web-admin/src/views/dataAnalysis/pages/NewHouse.vue、StockHouse.vue、Rent.vue、IndustryManage.vue、heat/HeatNewProject.vue、heat/HeatStock.vue、heat/HeatRent.vue。
- 所属项目：zhi2-web-admin；来源会话ID：session-6c46bea2-2d63-4a2d-b33f-f111655982f2；代码基线：a86bf95。

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "subagent_shared_convention",
  "source_extraction_id": "17610b81bcb7473e99c75e4ee8483cbb",
  "version": 1,
  "memory_type": "entities"
}
-->