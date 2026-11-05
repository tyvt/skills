# 资金全景板块高度撑满修复
园区物管2.0 的 fundPanorama 中右列板块高度已通过 align-items 调整撑满容器。

## 问题原因
- .panorama-top 使用 align-items: start，网格行高由最高左列决定
- 中右列 .panorama-block 仅按内容高度顶对齐，下方留白，资金收入/支出未撑满

## 修改方案
- 将 align-items: start 改为 align-items: stretch，三列 .panorama-block 拉满行高
- 中右列 .composition-stack 与 .chart-wrap--stack-pie 已有 flex:1，多余垂直空间落于饼图区，图表随 resize 变高
- 左侧列本身最高，高度不变，不会被拉高

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话ID：47b47b3c-2c00-4ffa-a15f-e111501a134b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_panorama_block_height",
  "source_extraction_id": "f24bdc1d36ca4cdebf2184e80fd18bb2",
  "version": 1,
  "memory_type": "entities"
}
-->