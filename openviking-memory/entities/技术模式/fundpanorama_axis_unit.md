# fundPanorama 线柱混合图轴单位与图例错开
园区物管2.0 的 fundPanorama 线柱混合图中，左右 Y 轴单位曾与图例重叠，已改为轴中段竖排错开。

## 问题
- 左右 Y 轴的单位挤在轴顶端，与左右上角图例叠在一起

## 修复方案
- 左轴：nameLocation: 'middle' + nameRotate: 90，「单位：个」竖排在轴线中段
- 右轴：nameLocation: 'middle' + nameRotate: -90，「单位：万元」竖排在右轴中段
- grid.top 略收为 38，图例 top: 6、left/right: 8，给图例留稳定一行高度
- tooltip 增加 confine: true，提示框尽量画在图表区域内

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、fundPanorama/mock.js
- 所属项目：园区物管2.0；来源会话：4e63d96f-65eb-4f4f-856a-e04211eb5626；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fundPanorama_axis_unit",
  "source_extraction_id": "e7c77816b27148b4850d7d3313b3efb3",
  "version": 1,
  "memory_type": "entities"
}
-->