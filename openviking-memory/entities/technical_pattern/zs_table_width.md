# ZS Table Column Width Pattern
Writing a fixed width on zs-table-column bypasses the component's automatic column width calculation.
## Behavior
- Without explicit width, zs-table-column uses flexible layout, auto-computing min-width from header and content and distributing remaining width equally.
- Manual fixed width overrides the adaptive sizing.
## Usage
- Reference depositNotice/company/components/AddDialog.vue: keep only label and prop to fill dialog and adapt.
- Apply this pattern to avoid unexpected column sizing in maintenance module dialogs.
## Affected Files
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/depositRegister/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/accountSplit/components/accountNameDialog.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAccount/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDeposit/deposit/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDeposit/components/detail.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDeposit/components/AddDialog.vue
- d:/repository/榆林G/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
## References
- Verification: src=榆林G/002.md
- Source session: ca119077-96d7-4634-b180-497cbdf98617

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "zs_table_width",
  "source_extraction_id": "e1c3fbfa59ed434c814aef9091c76c5a",
  "version": 1,
  "memory_type": "entities"
}
-->