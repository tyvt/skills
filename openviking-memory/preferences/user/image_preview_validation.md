- Prefers ImageGrid.vue to use dictValue==='0' to detect image type and fix the index, avoiding undefined elem.remark access that broke preview.
- Prefers AgencyBranchDetail save to validate required attachments via new utils/appendix.js checkRequiredAppendix in handleSave and before cancellation or logout.
- Prefers FileList.vue extended to support additional file formats.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "image_preview_validation",
  "source_extraction_id": "90cef1a211a94d8cae6604bafd443cb9",
  "version": 1,
  "memory_type": "preferences"
}
-->