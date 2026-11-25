---
audit_status: invalid
last_checked: 2026-11-25T17:38:46+08:00
verdict_note: 与现状不符-记忆称新增 safeListeners 计算属性替换 v-on 绑定，但全库 grep safeListeners 零命中，各副本 SearchFormItem.vue 仍为原始 v-on=item.listeners || $listeners 写法，未落地修复
---
- `SearchFormItem.vue` 中 `v-on="item.listeners || $listeners"` 在 Vue3 因 `$listeners` 移除且值为 `undefined` 时触发告警。
- 新增 `safeListeners` 计算属性确保始终为对象并替换原绑定，避免 v-on 右侧非对象告警。
- 验证证据：extracted source=cursor session=858525f8-3326-418d-8a6b-132a98ff4714；涉及文件：SearchFormItem.vue；代码基线：none

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->