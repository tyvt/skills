# 全局宽度致弹窗按钮纵向堆叠修复
苏州市房地产监测V3 全局 `width:100%` 规则使弹窗按钮撑满整行纵向堆叠，通过为特定选择器增加 `width:auto` 例外修复。

## 问题根因
- 全局 `width: 100%` 规则导致 `.el-form-item__content > .el-button` 撑满整行纵向堆叠

## 修复方案
- 在 `element-ui.scss` 中为该选择器增加 `width: auto` 例外
- 覆盖 `cbyh/WdmcDialog`、`OpenBankDialog` 等约 12 处弹窗
- 已用 `zs-button-group` 或 `<div>` 包裹的弹窗不受影响

## 涉及文件
- zhi2-web-admin/src/views/supervision/bank/superviseBank/components/WdmcDialog.vue
- zhi2-web-admin/src/views/supervision/bank/cbyh/components/WdmcDialog.vue
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- zhi2-web-admin/src/views/maintenance/bank/components/WdmcDialog.vue
- zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue
- zhi2-web-admin/src/views/supervision/bank/superviseBank/detail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/143.md
- 来源会话ID：19d6d8f6-68f7-4cfd-b84b-1da2e685865a
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_width_button",
  "source_extraction_id": "0925c1b461604fd789523e8d04997112",
  "version": 1,
  "memory_type": "entities"
}
-->