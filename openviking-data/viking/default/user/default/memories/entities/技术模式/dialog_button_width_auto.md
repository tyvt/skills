# 弹窗按钮宽度auto修复全局堆叠
苏州市房地产监测V3 中全局样式 element-ui.scss 的 .el-form-item__content > .el-button 继承 width:100% 导致弹窗按钮纵向堆叠，已修复。

## 问题根因
- 全局样式 element-ui.scss 中 .el-form-item__content > .el-button 继承 width:100%
- 导致银行网点等约 12 处弹窗按钮纵向堆叠

## 修复方案
- 为该选择器增加 width:auto 例外修复
- 已用 zs-button-group 或 `<div>` 包裹的弹窗不受影响

## 涉及文件
- styles/element-ui.scss 与 components/zs-dialog/zs-dialog.vue、zs-select-dialog/zs-select-dialog.vue
- supervision/bank/superviseBank/components/WdmcDialog.vue 与 supervision/bank/superviseBank/detail.vue
- supervision/bank/cbyh/components/WdmcDialog.vue
- maintenance/bank/components/WdmcDialog.vue
- components/zs-search-form/zs-search-form.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/176.md
- 来源会话：19d6d8f6-68f7-4cfd-b84b-1da2e685865a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_button_width_auto",
  "source_extraction_id": "b7b0aa0fe086415bb2597677d3dc2469",
  "version": 2,
  "memory_type": "entities"
}
-->