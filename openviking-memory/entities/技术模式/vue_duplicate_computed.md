# index.vue多个computed选项覆盖
`index.vue` 声明多个 `computed` 选项导致前者被覆盖、`projectId` 未注册；合并为单一 `computed` 对象并使用展开运算符注入 `mapState` 即可消除告警。

## 问题根因
- 同一组件内声明多个 `computed` 选项，后一个覆盖前一个
- 前者中注册的 `projectId` 等状态映射丢失，触发 Vue 运行时告警

## 解决方案
- 合并为单一 `computed` 对象
- 使用展开运算符（`...mapState`）注入所需状态，避免重复声明 `computed` 选项

## 验证与归属
- 所属项目：bugfix
- 验证证据：extracted source=cursor project=bugfix
- 验证证据：src=bugfix/002.md
- 涉及文件：index.vue
- 来源会话ID：89fc7f13-a8bf-4d3a-bbd4-188054ca21b7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_duplicate_computed",
  "source_extraction_id": "1559cddcd52e48a1b50036482c6ab45c",
  "version": 1,
  "memory_type": "entities"
}
-->