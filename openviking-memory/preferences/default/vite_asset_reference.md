- Vite build does not parse `require` for handling static assets; must use `new URL(relativePath, import.meta.url).href` with relative paths.
- In src/views/benefit/statisticsMap/operatingAssets.vue, replace `require` in STAT_ICON_MAP with a `getStatIconUrl` method, and replace `@/assets/images/benefit/...` with relative path `../../../assets/images/benefit/...`.

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "vite_asset_reference",
  "source_extraction_id": "75bc95529a7c4f1fba587dcd298b2b93",
  "version": 1,
  "memory_type": "preferences"
}
-->