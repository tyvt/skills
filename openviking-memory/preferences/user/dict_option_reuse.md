- Prefers not to append a '全部' option to option lists (e.g., bizStateOptions) that are also reused for table dict-tag display, to avoid list tag display anomalies.
- When adding a filter dropdown reusing a dict option source, pass the selected value via queryParams and clear it via the reset button, matching existing page behavior.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dict_option_reuse",
  "source_extraction_id": "c6aab03deb074150a75444d7267d5fee",
  "version": 1,
  "memory_type": "preferences"
}
-->