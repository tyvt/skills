# 节点明细弹窗一行一列修复
苏州市房地产监测V3 项目修复节点明细弹窗字段未单列排布、仍显示多列的问题。

## 问题原因
- `zs-dialog` 内 `.form-box` 全局样式仅作用于 `zs-form` 直接子级 `el-col`（强制 `width: 100%`）
- 原结构为 `zs-form > el-row > el-col`，样式未命中，`el-row` 仍按 Element 栅格多列排布

## 修复方案
- 将 `el-row` 提到 `zs-form` 外层，使 `el-col` 成为 `zs-form` 直接子节点
- 结构与缴款楼栋弹窗 `PaymentBuildingDialog.vue` 一致，五个字段各占一行
- 需硬刷新（Ctrl+F5）或重启 dev 后查看「新增节点明细」

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：NodeDetailsDialog.vue、PaymentBuildingDialog.vue
- 来源会话：dababdf0-87af-4d0b-95f2-6a4f1ceb21fd

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "node_dialog_single_col",
  "source_extraction_id": "9e1ffa47190141f69bafb695413c998f",
  "version": 1,
  "memory_type": "entities"
}
-->