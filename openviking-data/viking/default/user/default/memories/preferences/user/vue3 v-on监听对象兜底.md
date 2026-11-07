- `SearchFormItem.vue` 中 `v-on="item.listeners || $listeners"` 在 Vue3 因 `$listeners` 移除且值为 `undefined` 时触发告警。
- 新增 `safeListeners` 计算属性确保始终为对象并替换原绑定，避免 v-on 右侧非对象告警。
- 验证证据：extracted source=cursor session=858525f8-3326-418d-8a6b-132a98ff4714；涉及文件：SearchFormItem.vue；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue3 v-on监听对象兜底",
  "source_extraction_id": "8acaeb731028406db10b63ee3f286186",
  "version": 1,
  "memory_type": "preferences"
}
-->