- Certificate dialogs (certificatesDialog.vue and personnelRecord/ same-name files) follow form-box → zs-form(label-position="right") → zs-form-item structure, removing el-row/el-col and .certificate-form styles.
- FileUpload sets :is-show-tip="false" and adds .upload-tip text; both files keep structure in sync and pass Lint.
- Evidence: src=苏州市房地产监测V3/078.md; source session: ba8901ef-27cd-40ea-a120-41f51d8f7810

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "certificate_dialog_form",
  "source_extraction_id": "940d3b0220c74b93acf5ffa0d18bf6e4",
  "version": 1,
  "memory_type": "preferences"
}
-->