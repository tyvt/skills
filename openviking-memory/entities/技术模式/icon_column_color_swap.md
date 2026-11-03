# 图标按列索引绑定修复板块换位配色
园区物管2.0 中图标与汇总卡主题色原通过 card.key 绑定业务类型，板块换位后配色未交换，改为按列索引绑定。

## 问题描述
- 图标与汇总卡主题色通过 card.key 绑定业务类型
- 板块换位后第2、3列配色未跟随视觉交换

## 解决方案
- 改为按列索引调用 metricColumnIcons[index] 与 metricColumnTones[index]
- 固定列1蓝、列2青（停车泊位）、列3绿（经营资源）、列4紫

## 验证与归属
- 验证：园区物管2.0/046.md
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/mock.js
- 所属项目：园区物管2.0；来源会话：86476217-b0d8-45ac-8656-d64ffe59ced8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "icon_column_color_swap",
  "source_extraction_id": "de8a6947a0e14949a53e7349a4441c17",
  "version": 1,
  "memory_type": "entities"
}
-->