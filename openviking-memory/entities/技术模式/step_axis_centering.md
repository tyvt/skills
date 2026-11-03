# 步骤轴圆点垂直居中对齐修复
园区物管2.0 中 .step-axis 因 padding-top 与 align-items 冲突导致圆点偏上未对齐，需去除 padding 并改用中线对齐。

## 问题描述
- .step-axis 的 padding-top: 10px 与右侧 align-items: center 使圆点偏上未对齐
- 连接线 ::after 的定位未相对行高计算，留空不当

## 解决方案
- 去除 .step-axis 的 padding-top 并加 align-items: center 对齐中线
- 连接线 ::after 改用相对行高计算 top 与高度以留空

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/query/components/sideBar.vue
- 所属项目：园区物管2.0；代码基线：none；来源会话：09b1a4c9-aac5-4969-af5d-8a1c524b2f0e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_axis_centering",
  "source_extraction_id": "39b925c8e09649388134551189dae6f4",
  "version": 1,
  "memory_type": "entities"
}
-->