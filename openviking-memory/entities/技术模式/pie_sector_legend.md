# 饼图扇区图例数值展示
园区物管2.0 资金全景页区县饼图需在扇区标签与底部图例同时展示金额（万元）与占比，且扇区标签需防重叠。

## 需求背景
- 底部横向图例原缺失万元数值，需同步补充
- 扇区标签原可能重叠，需防遮挡

## 解决方案
- renderDistrictPie 配置 label 两行 formatter 展示 `xx.xx万` 与 `x.x%`
- 开启 avoidLabelOverlap 并缩小 radius、上移 center 预留引导线
- legendBottom 图例同步补充万元数

## 验证与归属
- 验证证据：园区物管2.0/056.md
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、assetPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：e5b3b723-e361-45f2-aa49-be6effb295d0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_sector_legend",
  "source_extraction_id": "aa50523b6a354b449d9d0ea5f5964e57",
  "version": 1,
  "memory_type": "entities"
}
-->