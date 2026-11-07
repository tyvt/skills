- Root cause of pagination bounce: `zs-pagination` migrated to `v-model:current-page`, but many pages still use old `:page.sync`/`:limit.sync` syntax, causing pagination to bounce back.
- Preferred fix: globally regex-replace `:page.sync=` with `v-model:page=`, `:limit.sync=` with `v-model:limit=`, and migrate `zs-select`'s `:value.sync` to `v-model:value` under `zhi2-web-admin/src`.
- Verification: extracted source=cursor session=73a5ecd2-f9fb-443b-b4b0-8e8521acce74
- Files: property/complex/index.vue, `@zhi2-web-admin/src/components/zs-pagination/zs-pagination.vue`

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "pagination_sync_migration",
  "source_extraction_id": "cf9b1ad66f7d46ee805e752b86cc78ab",
  "version": 1,
  "memory_type": "preferences"
}
-->