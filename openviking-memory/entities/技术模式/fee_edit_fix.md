# 物业费申报详情页编辑按钮补充
苏住房G 项目 feeDeclare2/detail.vue 恢复草稿状态顶部「编辑」按钮并调整申报明细表格只读逻辑。

## 修复内容
- 移除 :showEdit="false"，使用 operation-btn-group 默认行为恢复顶部「编辑」按钮
- 查看模式且制单状态为草稿(bizState=0)时，顶部显示「编辑」按钮（位于「返回」与「附件」之间）
- 申报明细表格 readOnly 改为 formMode=='view' || form.bizState!=0

## 行为效果
- 查看模式：表格只读，不显示「操作」列及「导入/选择房屋」按钮
- 点击「编辑」进入编辑模式：可编辑户室明细（行内编辑/删除及顶部导入按钮）
- 已提交/已审核(bizState≠0)：始终只读

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/property/feeDeclare2/detail.vue、components/feeBindScopeTable.vue
- 来源会话ID：2b6910b1-af76-49c6-87c1-e6cbab4a1b46

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_edit_fix",
  "source_extraction_id": "cc5f4cc126b94211921fea7c38780aa8",
  "version": 1,
  "memory_type": "entities"
}
-->