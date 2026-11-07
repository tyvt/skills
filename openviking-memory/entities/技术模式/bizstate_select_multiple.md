# 搜索表单：bizState 多选已修正
修正了表单项 `bizState` 因缺少 `multiple` 属性而错误地进行多选的问题。

## 描述
- 文件: `zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue`
- 当 `type==='select'` 且 `model==='bizState'` 时，`isMultiple` 在没有显式 `multiple` 属性的情况下变为 `false`（单选）
- 对于多选，需要在 `formItems` 的 `attrs` 中指定 `multiple: true`

## 验证
- 来源: cursor session `0bc574c1-233a-406d-9cc5-678ea3dabed5`
- 代码库: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：0bc574c1-233a-406d-9cc5-678ea3dabed5


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bizstate_select_multiple",
  "source_extraction_id": "dff9b0dfa14544cfa914d2f988a5f039",
  "version": 1,
  "memory_type": "entities"
}
-->
