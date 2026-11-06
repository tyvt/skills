# 通知对象选择弹窗勾选框丢失修复
产品2.0 项目修复 msg/notice/components/userTable.vue 勾选列不渲染的 bug。

## 问题原因
- 「通知对象选择」弹窗里 userTable.vue 勾选列写了 v-if="bizState == '0'"
- 但 selectUserDialog 未向 userTable 传入 bizState，值为 undefined，条件不成立，勾选框不渲染

## 修复内容
- 去掉该 v-if，userTable 只用于选择通知对象，勾选列应始终显示
- 已选用户仍由 isSelectable 禁用勾选
- 刷新重新打开弹窗，表格左侧应能看到勾选框

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/msg/notice/components/userTable.vue、msg/notice/components/selectUserDialog.vue、benefit/pubUseMoneyApply/detail.vue
- 所属项目：产品2.0；来源会话：5687225e-f8a8-4719-a9e7-c4013411f266；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术修复",
  "name": "user_table_checkbox_fix",
  "source_extraction_id": "c9079b3172974152be69fd2cd009cf8a",
  "version": 1,
  "memory_type": "entities"
}
-->