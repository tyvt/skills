---
audit_status: valid
last_checked: 2026-11-27T06:54:31+08:00
verdict_note: 产品2.0 zs-search-form.vue 在、searchFormVisibility.js 为 0，与记忆所述『回退并删除该文件』一致。
---
- Reverted `zs-search-form.vue` and deleted `searchFormVisibility.js` to remove the shared component's black-box logic.
- Each list page filters search conditions inside its own `formItems` computed property based on `terminalType` (e.g. hide enterprise name on B-terminal) to hide conditions by role.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "filter_by_terminal",
  "source_extraction_id": "c897409ca5db4fc997b9baffac0093bb",
  "version": 1,
  "memory_type": "preferences"
}
-->