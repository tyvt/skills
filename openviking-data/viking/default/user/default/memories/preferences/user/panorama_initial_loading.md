- In zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue and fundPanorama/index.vue, the root container uses v-loading='pageLoading'; mounted() awaits loadPanoramaData() then finally sets pageLoading=false to prevent roughly 10-second white screen on first load.
- Timed or periodic refresh must NOT show the loading state.
- Evidence: src=苏住房G/056.md; files: assetPanorama/index.vue, fundPanorama/index.vue, mapOverview/index.vue, bankAccountSupervision/index.vue.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "panorama_initial_loading",
  "source_extraction_id": "4d5aade41f6344da9fefe4ce3287d49a",
  "version": 1,
  "memory_type": "preferences"
}
-->