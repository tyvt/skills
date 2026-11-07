# 资金全景区县饼图标签格式化位置
园区物管2.0 资金全景页收入/支出区县饼图外侧标签由 chartRenderers.js 的 formatPieSliceLabel 格式化，index.vue 仅经 renderDistrictPie 调用。

## 关键事实
- 饼图扇区 label 的类别与数值间距、去单位、百分号格式等须改 chartRenderers.js，只改 index.vue 的 ECharts option 可能不生效
- 标题/tooltip 可仍在各自 init 里保留「单位：万元」，与扇区 label 文案可分离（例如 label 去掉「万」而标题仍标万元）

## 验证与归属
- 验证证据：会话 d397b538、8988d239 中 formatPieSliceLabel 加空格；renderDistrictPie formatter 去掉标签「万」
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/chartRenderers.js、index.vue
- 所属项目：园区物管2.0
- 来源会话：d397b538-5bfd-4885-b681-4805d291c008、8988d239-72d3-4f37-83bb-9ad26f14a007
- 代码基线：f00310232

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fundpanorama_label_location",
  "source_extraction_id": "8987a09e8af843cf8262f55c4984e353",
  "version": 1,
  "memory_type": "entities"
}
-->