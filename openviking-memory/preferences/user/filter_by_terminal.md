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