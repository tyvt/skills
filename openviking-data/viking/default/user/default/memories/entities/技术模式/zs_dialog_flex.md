# zs-dialog 内部 flex 横排拆列修复
产品2.0 中 zs-dialog 内部 .dialog-box 默认 display:flex（row），多直接子节点会被横排拆列。
## 问题根因
- 图例、户室网格等作为多个直接子节点时横向并排，格子被拆成多列，竖排数字与图例叠在一起。
- 改版后用户反馈「排列样式混乱」，根因为 dialog-box 横向 flex。
## 解决方案
- 用一层 `div.form-box`（如 `building-table-dialog__body`）包住全部内容。
- 设置 `display:block; width:100%; box-sizing:border-box`，使 .dialog-box 仅有一个 flex 子项。
## 验证与归属
- 验证：BuildingTableDialog 改版后反馈样式混乱，定位 dialog-box 横向 flex。
- 涉及文件：zhi2-web-admin/src/views/building/unit/components/BuildingTableDialog.vue、zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue；所属项目：2-0；来源会话：cfe6a302-a8b9-458e-87b5-0eebd38dbcd3。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_flex",
  "source_extraction_id": "aeb6021c119446819b122f4f280cd7ed",
  "version": 1,
  "memory_type": "entities"
}
-->