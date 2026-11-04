# 偏离的功能选择对话框样式
在 Suzhou Real Estate Monitoring V3 项目中，`SelectDialog.open` 有多余的边框且布局偏离标准组件。

## 问题
- `SelectDialog.open` 带有多余边框的 `list-card` 以及紧凑页脚中右对齐的类
- 分页放置在表格内部导致错位

## 修复
- 移除 `list-card` 和紧凑页脚类；将分页移到表格外部，在 scoped 样式中使用 `margin-top:12px; padding:12px 0 0`
- 与 `zs-select-dialog.vue` 中的 `select-dialog-table-wrap` 结构和居中的 `dialog-footer` 对齐
- 保持前端分页逻辑 `clientPagination` 不影响布局

## 涉及文件
- `views/company/companyCancel/index.vue`
- `components/zs-select-dialog/zs-select-dialog-func.vue`
- `views/company/companyApplyAudit/index.vue`
- `components/zs-dialog/zs-dialog.vue`
- `components/zs-pagination/zs-pagination.vue`
- `views/presale/cashsale/components/CashsaleSelectBuildingDialog.vue`
- `views/building/houseLimit/components/HouseSelectDialog.vue`
- `views/property/workOrder/order/components/BatchReplyDialog.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/025.md
- 会话 ID: 81825ca3-8f1a-442f-a106-ef98a5c8c238
- 所属项目: Suzhou Real Estate Monitoring V3; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_style",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->