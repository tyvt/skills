# 节点弹窗单行单列布局
苏州市房地产监测V3 的节点弹窗通过让 el-col 成为 zs-form 直接子节点实现单行单列排布。

## 问题根因
- `.zs-dialog` 的 `.form-box` 全局样式仅对 `.zs-form` 直接子级 el-col 生效 width:100%
- 原 `zs-form > el-row > el-col` 结构未命中样式故仍多列排布

## 修复方案
- 将 el-row 提至 zs-form 外层使 el-col 成为直接子节点
- 结构与 PaymentBuildingDialog.vue 一致以实现单行单列

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/163.md
- 涉及文件：NodeDetailsDialog.vue、PaymentBuildingDialog.vue、NodeDetailsTable.vue、detail-form.scss、index.scss、zs-dialog.vue、BuildingChangeDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：dababdf0-87af-4d0b-95f2-6a4f1ceb21fd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "node_dialog_col",
  "source_extraction_id": "4ab1eb5ff2df476e89c5e40eba2a6f96",
  "version": 1,
  "memory_type": "entities"
}
-->