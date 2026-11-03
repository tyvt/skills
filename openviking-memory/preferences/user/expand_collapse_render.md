- `construction-manage.vue` conditionally renders expand/collapse button via `v-if="shouldShowExpand(item)"`; the method checks `processText.length > MAX_DESC_LENGTH`.
- `displayText` truncation logic remains unchanged.
- Verification: extracted source=cursor session=dca01c09-e670-4c59-8317-25e2f9529261.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "expand_collapse_render",
  "source_extraction_id": "1347c22671b64dc1a595c525039a2a5f",
  "version": 1,
  "memory_type": "preferences"
}
-->