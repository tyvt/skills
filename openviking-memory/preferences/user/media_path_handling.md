- `toMediaPath` must not include `/zs-fym/` extraction logic that wrongly rewrites generic URLs (e.g., homepage icons).
- Split rich-text-specific logic into `toRichTextMediaPath`; `resolveMediaUrl` should output full URL in the SuFuBan container.
- Verify changes against `ZsRichText.vue`, `utils/index.js`, `utils/sfb.js`, `api/gateway.js`, `ZsImage.vue`, `utils/formatter.js`, and related pages.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "media_path_handling",
  "source_extraction_id": "4656c42590084da4bf12a8a609364eb0",
  "version": 1,
  "memory_type": "preferences"
}
-->