# Vue3 v-on 无参展开绑定告警修复
产品2.0 中 SearchFormItem/ZsForm 沿用 Vue2 的 `$listeners` 写法，在 Vue3 下 `$listeners` 已不存在，导致 `v-on="undefined"` 触发告警，已改为永远传对象。

## 问题根因
- Vue3 下 `v-on` 无参展开绑定要求右侧必须是对象
- `SearchFormItem` 中写 `v-on="item.listeners || $listeners"`，而 `$listeners` 在 Vue3 已不存在（事件在 `$attrs`），当 `item.listeners` 为 undefined 时变成 `v-on="undefined"`
- 触发 `[Vue warn]: v-on with no argument expects an object value`

## 解决方案
- 在 `zhi2-web-admin/src/components/zs-search-form/SearchFormItem.vue` 新增 `safeListeners`：仅当 `item.listeners` 为对象时使用，否则用 `{}`
- 所有 `v-on="item.listeners || $listeners"` 改为 `v-on="safeListeners"`
- 在 `zhi2-web-admin/src/components/zs-form/zs-form.vue` 将依赖 `$listeners` 的写法改为 Vue3 正确的透传方式

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/components/zs-search-form/SearchFormItem.vue、zhi2-web-admin/src/components/zs-form/zs-form.vue
- 所属项目：2-0；来源会话ID：858525f8-3326-418d-8a6b-132a98ff4714；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_von_listeners",
  "source_extraction_id": "818f80f7eff34a4caf91327fe1f5fd03",
  "version": 1,
  "memory_type": "entities"
}
-->