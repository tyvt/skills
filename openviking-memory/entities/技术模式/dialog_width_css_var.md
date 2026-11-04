# 由 CSS 变量控制的对话框宽度
在 Suzhou Real Estate Monitoring V3 项目中，对话框宽度已从 props 解耦，并集中到 CSS variables 中。

## 变更
- `zs-select-dialog.vue` 定义 `inheritAttrs: false` 并从 `mergedDialogAttrs` 中移除固定的 `width: 1300px`
- scoped 样式移除 `:deep(.el-dialog)` 并使用全局样式 `building-table` 用于 wrapper 和 `.el-dialog`
- `zs-select-dialog-func.vue` 在 `sanitize` 中移除 `width`；`SelectDialog.open` 移除 Vue 2 的 slots 且不向 `zs-dialog` 传递 `width`
- `RegulatoryAccountDialog.vue` 和 `scope-select-dialog` 也停止注入 `width: 1300px`

## 涉及文件
- `views/supervision/utils/selectDialog.js`
- `views/components/SelectDialog.vue`
- `views/supervision/deposit/refund/detail.vue`
- `views/supervision/utils/selectDialog/generic.js`
- `views/supervision/utils/selectDialog/regulatoryAccount.js`
- `components/zs-select-dialog/zs-select-dialog-func.vue`
- `styles/index.scss`
- `components/zs-dialog/zs-dialog.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/026.md
- 会话ID: e2df1fba-88d3-49d5-bd1b-602953368329
- 所属项目: Suzhou Real Estate Monitoring V3; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_width_css_var",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->