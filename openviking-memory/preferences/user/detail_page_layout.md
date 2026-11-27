---
audit_status: valid
last_checked: 2026-11-27T10:17:48+08:00
verdict_note: 苏州V3 CashsaleDetail.vue 含 cashsale-info-panel 且 hide-headline=0，移除 hide-headline 显示基本信息属实。
---
- 现售备案详情页 `CashsaleDetail.vue` 移除 `cashsale-info-panel` 的 `hide-headline` 以显示「基本信息」。
- `AnnexUpload/index.vue` 在 `hideViewToggle` 时置 `showTopBar` 为 `false` 隐藏批量「选择」顶栏。
- `PresaleBuildingTable.vue` 以 `SubTableToolbar` 与 `operationButtons` 替代 `operation-button-container` 避免楼幢操作按钮遮挡表格。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "detail_page_layout",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 1,
  "memory_type": "preferences"
}
-->