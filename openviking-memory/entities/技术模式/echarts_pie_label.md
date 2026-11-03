# 数据沙盘饼图外侧标签控制
园区物管2.0 数据沙盘 ECharts 饼图通过 label.formatter 单独控制展示名/数值/单位，数值细节放 tooltip。

## 产品需求
- 产品常要求扇区外侧只显示维度名（如区县名），金额与占比放 tooltip

## 问题根因
- series.label.formatter 若写成 `Number(p.value).toFixed(2)` 或拼接 `card.donutUnit`，标签只显示数值或「1,234个 (12.3%)」

## 解决方案
- 名称类标签用 `(p) => p.name` 或自定义单行格式如 `${valueText} (${percent}%)`（百分比放括号内、与数值同一行）
- 单位若已在卡片标题「单位：个」展示，formatter 里可不再拼单位
- 数值细节统一在 tooltip.formatter 维护，避免 label 与 tooltip 重复改两处不一致

## 验证与归属
- 验证：会话 d0dd6cf9 fundPanorama renderDistrictPie 将 formatter 改为 p.name；会话 343f11cc 改为单行「数值 (百分比%)」；会话 a281575d assetPanorama 去掉 label 上 donutUnit「个」
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：d0dd6cf9-d65d-4e4b-b5cc-cf2bd98cd879, 343f11cc-909d-4634-8fc1-daffbd6a86a1, a281575d-c847-4a84-babf-b692fa9b404a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_pie_label",
  "source_extraction_id": "00d55c383c404a0fb0e864045dac2dc7",
  "version": 1,
  "memory_type": "entities"
}
-->