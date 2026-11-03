- Inside zs-dialog, Element UI validation error tips default to `position:absolute` (taking no height) while `.dialog-box`/`.el-dialog__body` set `overflow:hidden`, clipping multi-line text; in ResetPwdDialog.vue and ChangePasswordDialog/index.vue set `.el-form-item__error` to `position:relative`, override `overflow:visible`, and set `line-height:1.4` to support multi-line display.
- Files: ResetPwdDialog.vue, public/assets/css/element-ui.css, components/zs-dialog/zs-dialog.vue, views/login.vue, autonomy/multiply/components/VotingItemsDialog.vue, components/zs-form/zs-form.vue, layout/components/ChangePasswordDialog/index.vue, views/companyLogin.vue
- Verification: source session 1f25b0e2-be1a-4b0d-8237-80f1b1801e20; code baseline none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dialog_validation_style",
  "source_extraction_id": "5106496ed8504ce0a2fa830793207d6b",
  "version": 1,
  "memory_type": "preferences"
}
-->