---
status: suspect
needs_review: true
confidence: 0.3
gov_checked_at: 2026-11-25
gov_note: 高频 bug 实体·batch3·仅标记
audit_status: valid
last_checked: 2026-11-27T18:42:51+08:00
verdict_note: 园区物管2.0 group-multi-select.vue-48 仍为 this.$attrs.value.split(',')，与记忆描述的待改造风险点一致；非幻觉，代码证据吻合。
---
# group-multi-select 类型兼容修复
园区物管2.0（zhi2-web-admin）中 `src/views/property/complex/components/group-multi-select.vue` 在 `get()` 里直接 `this.$attrs.value.split(',')`，与 MultiSelect 同类写法，未来会报同类错误。

## 问题原因
- `group-multi-select.vue` 在 `get()` 中直接调用 `this.$attrs.value.split(',')`
- 该写法与 `MultiSelect.vue` 之前修复的 bug 相同，类型不兼容时易报错

## 修复方案
- 计划采用与 `MultiSelect` 相同的类型兼容方式改造 `group-multi-select`
- 避免「修一个点、另一个页面又炸」的重复报错

## 涉及文件
- zhi2-web-admin/src/views/property/complex/components/group-multi-select.vue
- zhi2-web-admin/src/components/zs-select/MultiSelect.vue
- zhi2-web-admin/src/components/zs-select/zs-select.vue

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：园区物管2.0（2-0）；来源会话：96cc05d6-f240-484b-bd44-cb2ed62f1ebc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "group_multiselect_fix",
  "source_extraction_id": "f8b4f9aed74b471bb17b7829c522f1b4",
  "version": 1,
  "memory_type": "entities"
}
-->