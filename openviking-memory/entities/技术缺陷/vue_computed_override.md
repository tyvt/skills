# index.vue中重复computed选项覆盖projectId
在 `index.vue` 中定义两个 `computed` 选项，导致 `projectId` 未被注册并触发 Vue 警告，需合并为一个 computed 对象。

## 问题根因
- 第一个 `computed` 仅含 `...mapState({ projectId: ... })`，第二个含 `formItems`、`columns`、`operationButtons` 等。
- Vue 选项中同名选项只保留最后一个，第一个 `computed` 被完全覆盖，`projectId` 从未注册到实例，模板中使用的 `projectId`（如第 12、178、243 行）报警告。

## 解决方案
- 删除单独的 `computed`，把 `mapState` 的 `projectId` 合并进下方 `computed` 对象的最前面。
- 以后若需拆分多个 `computed`，必须合并为一个对象，或改用 `Object.assign` / 展开运算符合并。

## 验证与归属
- 涉及文件：`index.vue`
- 所属项目：bugfix
- 来源会话：89fc7f13-a8bf-4d3a-bbd4-188054ca21b7
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "vue_computed_override",
  "source_extraction_id": "194e06705db34ad08d741ad084ba83a5",
  "version": 1,
  "memory_type": "entities"
}
-->