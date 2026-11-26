# Zentao Bug 6468
Zentao defect 6468 covers the 2026-11-11 certificate-dialog fix, its verification, and preparation for ZenTao resolved write-back.

## Fix and Verification
- The fix renders the validity term as a range.
- The fix makes the certificate body and seal non-overlapping.
- The fix is defensive against a missing start date.
- The changed file was `RecordCertificateDialog.vue`; after the defensive edit and cleanup, only this `.vue` change remained, eslint was clean, the production build passed, and the pre-commit hook ran `eslint --fix` cleanly.
- The fix was verified before the Git decision; the ZenTao write-back marking bug 6468 resolved was expected either way.

## ZenTao Write-back Preparation
- By 2026-11-11 08:07, the resolved/fixed write-back for bug 6468 had not been shown as executed.
- The resolve script generates an `mcp_gateway`/`dbx` call sequence and recommends `--comment-file`/`--comment-b64` to avoid shell quoting problems with HTML and Chinese.
- The exact SQL steps and connection constant were being read from the script and were not yet recorded in the conversation.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6468",
  "source_extraction_id": "ce61e01aa0944a3391e938adc440bc7d",
  "version": 1,
  "memory_type": "entities"
}
-->