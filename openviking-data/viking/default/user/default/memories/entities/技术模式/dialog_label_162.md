# 基础对话框字段标签宽度固定为162px且值左对齐
在门户的基础信息对话框中，字段标签宽度固定为162px，值左对齐，保持首页对话框的规范。

## 规范要点
- 字段标签宽度固定为162px
- 字段值左对齐，覆盖首页中人员信息、信用和房产详情的对话框
- 批量修改UI时，遍历 PortalDialogHost 下的 DetailDialogs（人员、信用、房产等），避免只修复其中一个；公司/许可证详情对话框使用自有规范（通过 zs-dialog 实现标签右对齐 168px/150px），不适用此标准
- 首页的其他对话框已经左对齐，无需重复修改

## 文件与来源
- 涉及文件: PortalDialogHost.vue, PropertyDetailDialog.vue, RentalDetailDialog.vue (位于 zhi2-web-admin/src/views/home/publicPortal)
- 验证证据: src=门户/052.md
- 来源会话: 4bae8daf-b9b1-4788-9e4b-f12564292ebb; 代码库: e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_label_162",
  "source_extraction_id": "ad9fab4e29e04bf990aabad89cc7012f",
  "version": 3,
  "memory_type": "entities"
}
-->