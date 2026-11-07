# userTable 的复选框因缺少 bizState 未渲染
userTable.vue 中的复选框列有 v-if="bizState=='0'"，但 selectUserDialog 未传递 bizState。

## 描述
- userTable.vue 将选择列限制为 bizState === '0'。
- selectUserDialog 未传递 bizState，导致其未定义并隐藏了列。

## 解决方案
- 移除了 v-if 以永久显示复选框列。
- 已选用户仍通过 isSelectable 保持禁用。

## 文件
- zhi2-web-admin/src/views/benefit/pubUseMoneyApply/detail.vue
- zhi2-web-admin/src/views/msg/notice/components/selectUserDialog.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_table_bizstate_missing",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->