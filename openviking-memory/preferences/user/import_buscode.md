- Interface matches business config by `busCode` and `path`; misusing `this.$route.meta.busCode` (e.g., `feeDeclare2Detail`) with case-mismatched `path` causes backend match failure.
- In `bulkImportDialog.vue`, import param `busCode` must be a fixed business code (e.g., `3010`); `path` should be standard lowercase value or remove after confirming required.
- Verification: src=泰兴G/003.md; project: 泰兴G (zhi2-web-admin); source session 7590eb72-ea98-4d1e-bf6a-32ed8129172e; code baseline none.
- Involved files: property/feeDeclare2/components/bulkImportDialog.vue, components/AnnexUpload/index.vue, utils/request.js, api/index.js, property/bill/components/import.vue, property/declare/components/upload.vue, zs-file-upload/zs-file-upload.vue, property/bill/components/fileUpload.vue.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "import_buscode",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 1,
  "memory_type": "preferences"
}
-->