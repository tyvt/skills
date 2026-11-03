- Building auth detail table (complexBuildingAuth/detail.vue, BuildingDialogAuth.vue) should wrap dialog-right to reuse the global dialog style (index.scss).
- Remove custom row-height/font-size/border overrides; selected row uses zs-table built-in selected-row.
- Fixed height of 8 rows (tableTrCount) with 48px row height; only keep the transfer-layout styles.
- Source session: 2f2222a6-6625-4a0d-b9a5-d2cce60498f7.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "building_auth_table",
  "source_extraction_id": "9101bab5bff9401d855c4c5db50c3276",
  "version": 1,
  "memory_type": "preferences"
}
-->