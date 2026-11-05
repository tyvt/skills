# 资金全景饼图标签显示区域名称修复
园区物管2.0 的 fundPanorama 饼图标签已改为显示区域名称而非金额。

## 问题原因
- renderDistrictPie 中饼图扇区外侧 label.formatter 原写为 Number(p.value).toFixed(2)，仅显示金额
- mock 数据每条含 name（锡山区、惠山区等）代表区域名称

## 修改方案
- 将 formatter 改为 (p) => p.name，与 mock 的 name 一致，标签只显示区域名称
- 数值与占比保留在 tooltip：${p.name}<br/>${Number(p.value).toFixed(2)} 万元 (${p.percent}%)

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；来源会话ID：d0dd6cf9-d65d-4e4b-b5cc-cf2bd98cd879；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_panorama_pie_label",
  "source_extraction_id": "f24bdc1d36ca4cdebf2184e80fd18bb2",
  "version": 1,
  "memory_type": "entities"
}
-->