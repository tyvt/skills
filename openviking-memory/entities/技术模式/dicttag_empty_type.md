# DictTag passes illegal type to ElTag causing validation failure
Element Plus ElTag type only allows specific values or undefined. DictTag passing empty string or illegal enum (e.g. listClass="default") to ElTag type triggers Invalid prop type.

## Root Cause
- ElTag type can only be primary/success/info/warning/danger or omitted.
- DictTag binds `:type="''"` in colorMap mode or when listClass is empty, causing validation failure.
- Dict item with listClass "default" (including variant "Default") is treated as ElTag type; Element Plus rejects this enum, raising `Invalid prop: custom validator check failed for prop "type"` (stack in DictTag/ElTag).

## Solution
- Do not pass type (undefined) when colorMap is enabled.
- Return undefined instead of empty string when listClass is absent.
- In dict-tag.vue getTagType(): return undefined (no type) for `default`/empty; otherwise `trim().toLowerCase()` to avoid `Default` variants.
- DictDataTable must not map primary to empty string.

## Verification & Attribution
- Evidence: session d39becce, dict-tag.vue and DictDataTable.vue removed empty type passed to ElTag.
- Evidence: session 19b58a9e, maintenanceProject page DictTag to ElTag type validation failure (listClass=default case).
- Files: zhi2-web-admin/src/components/dict-tag/dict-tag.vue, zhi2-web-admin/src/views/system/dict/components/DictDataTable.vue
- Project: 2-0; Source sessions: d39becce-af94-4451-b0d2-6ffd7cf94261, 19b58a9e-4df5-44f1-8286-0667d6776a04; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dicttag_empty_type",
  "source_extraction_id": "f56bb86d24e844988a244c2e70075655",
  "version": 2,
  "memory_type": "entities"
}
-->