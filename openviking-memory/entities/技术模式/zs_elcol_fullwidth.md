# 全局样式挤压 zs-form 的直接子元素 el-col
在 zs-dialog 中，全局样式 `.form-box .zs-form > .el-col` 仅对 zs-form 的直接子元素 el-col 强制设置 `width:100%`；原始结构 `zs-form > el-row > el-col` 未受影响，保持了多列布局。

## 问题根因
- 选择器 `.form-box .zs-form > .el-col` 仅对 zs-form 的直接子元素应用 `width:100%`
- 结构 `zs-form > el-row > el-col` 与选择器不匹配，从而保留了多列布局

## 解决方案
- 将 `el-row` 移到 `zs-form` 外部，使 `el-col` 成为直接子元素
- 遵循 `PaymentBuildingDialog.vue` 的结构，以实现单行单列

## 涉及文件
- NodeDetailsDialog.vue, PaymentBuildingDialog.vue, NodeDetailsTable.vue
- detail-form.scss, index.scss, zs-dialog.vue, BuildingChangeDialog.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：dababdf0-87af-4d0b-95f2-6a4f1ceb21fd
- 验证证据: src=苏州市房地产监测V3-rest/139.md
- 源会话: dababdf0-87af-4d0b-95f2-6a4f1ceb21fd; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_elcol_fullwidth",
  "source_extraction_id": "11e2b1a202ee409c843bf7caaf319a48",
  "version": 1,
  "memory_type": "entities"
}
-->