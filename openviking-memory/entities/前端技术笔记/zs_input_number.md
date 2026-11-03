# zs-input-number
A custom number-input component used across the zhi2-web-admin Vue project.
## Purpose
- Replaces <el-input-number> in 49 business page templates.
- Registered globally in main.js, so pages need no import.
## Implementation
- zs-input-number.vue still wraps el-input-number at the bottom layer.
- Sync style changes in element-ui.scss and zs-search-form.vue.

<!-- MEMORY_FIELDS
{
  "category": "vue_component",
  "name": "zs_input_number",
  "source_extraction_id": "e0181ed368f74bb2ace2c92ca2241393",
  "version": 1,
  "memory_type": "entities"
}
-->