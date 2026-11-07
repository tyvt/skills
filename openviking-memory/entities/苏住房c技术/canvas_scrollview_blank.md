# 小程序canvas放入scroll-view必空白
苏住房C小程序中，EchartsUniapp底层canvas在微信小程序属原生组件，不能在scroll-view内正常渲染，导致年度预算页图表空白。
## 根因
- 原生组件官方限制不能在scroll-view内渲染，canvas拿不到正确位置与层级，静默不绘制
- 同scroll-view内DOM卡片正常，仅canvas区域空白，往往无报错，极具迷惑性
## 解决方案
- 图表移出scroll-view，改为「固定图表+滚动列表」两段式
- 数据更新整对象替换chartOption；切换年份/Tab用动态canvasId+key强制重建；金额先Number()转数值再喂ECharts
- 确须跟随滚动只能改用同层渲染方案
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话9446951a，Bug#3479年度预算图表不显示；修复为移出scroll-view等配套改造
- 涉及文件：budget/index.vue、echarts-uniapp.vue、balancePublicity/index.vue、api/benefit.js
- 所属项目：苏住房C；来源会话ID：9446951a-feff-46d8-9660-d4cca2cd85fd；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "canvas_scrollview_blank",
  "source_extraction_id": "b9d8b7ebce554cb182f77784992bd5df",
  "version": 1,
  "memory_type": "entities"
}
-->