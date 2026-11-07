# MultiSelect recursive update via resetInputHeight in updated()
In zhi2-web-admin, MultiSelect.vue of zs-select unconditionally calls resetInputHeight in updated(), causing "Maximum recursive updates exceeded".

## Root Cause
- Error `Maximum recursive updates exceeded` with `ElSelectDropdown` in the stack.
- MultiSelect updated() unconditionally calls `this.$refs.elSelect.resetInputHeight()`, which triggers inner dropdown update and re-enters updated() in an infinite loop.

## Solution
- Remove the forced call inside updated().
- Only trigger once when `$attrs.value` / `$attrs.options` change (dedupe + timer merge).

## Verification & Attribution
- Evidence: session 533423a8, recursive update at 8081/#/index/todo, root cause MultiSelect updated to resetInputHeight.
- Files: zhi2-web-admin/src/components/zs-select/MultiSelect.vue
- Project: 2-0; Source session: 533423a8-81bd-4094-9c97-d30615178fc1; Code baseline: none

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 来源会话：533423a8-81bd-4094-9c97-d30615178fc1


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "multiselect_recursive_updated",
  "source_extraction_id": "f56bb86d24e844988a244c2e70075655",
  "version": 1,
  "memory_type": "entities"
}
-->
