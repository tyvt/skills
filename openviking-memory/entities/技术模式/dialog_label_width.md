# 基本信息弹窗字段标签定宽162px值左对齐
门户 publicPortal 首页基本信息弹窗（人员信息、信用记录、公司/预售许可/房屋详情等）两列布局约定：标签列固定宽度 162px，字段值统一左对齐。

## 规范要点
- 字段标签固定宽度 162px（RentalDetailDialog 已改为按列最长标签定宽 + 标签值间距 12px，详见 rental_dialog_layout 实体）
- 字段值（人员信息、信用记录、公司/预售许可/房屋详情等）统一左对齐
- 保持弹窗字段对齐规范一致
- 批量改 UI 时需遍历 PortalDialogHost 下各 DetailDialog（人员、信用、公司、预售许可、房屋等），避免只改一处
- 其余首页弹窗排查后均已是左对齐，无需重复修改

## 涉及文件与归属
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- 所属项目：门户；来源会话ID：4bae8daf-b9b1-4788-9e4b-f12564292ebb；代码基线：e1f8e0b
- 验证证据：src=门户/052.md；基本信息弹窗两列字段标签已定宽 162px，值统一左对齐，其余首页弹窗排查后均已是左对齐

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_label_width",
  "source_extraction_id": "38c4fed0fdf5450498d3c66aeea4789a",
  "version": 3,
  "memory_type": "entities"
}
-->