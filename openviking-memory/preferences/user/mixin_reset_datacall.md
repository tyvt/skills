---
audit_status: valid
last_checked: 2026-11-28T01:12:49+08:00
verdict_note: 苏州V3 含 $options.data.call/resetQuery/dialogMixins，reset 绑定组件实例修复属实。
---
- In mixin `resetQuery()` (`src/mixins/table.js`) and `reset()` (`src/mixins/dialogMixins.js`), use `this.$options.data.call(this)` to obtain initial data so inherited list/dialog resets bind the component instance.
- Replace `this.$options.data()` with `this.$options.data.call(this)` across extending components (e.g., `benefit/alert/index.vue` and 10 other files).

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "mixin_reset_datacall",
  "source_extraction_id": "e200e187630443f8843d3946fdef9396",
  "version": 1,
  "memory_type": "preferences"
}
-->