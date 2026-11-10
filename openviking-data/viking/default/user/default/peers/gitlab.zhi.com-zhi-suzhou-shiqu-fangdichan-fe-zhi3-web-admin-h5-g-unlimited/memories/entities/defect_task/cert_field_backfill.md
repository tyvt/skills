# Certificate Field Backfill Fix
zhi2-web-admin personnel detail page failed to display auto-filled certificate type/code after save because loadDetail didn't backfill form fields from certificate entity.

## Root Cause
- loadDetail populates this.certificateList from persisted cert entity (lines 600-609) but never copies into basic-info form.certificateType/form.certificateCode.
- buildSavePayload sends certificateType/certificateCode top-level and educationList but not certificateList.
- Backend T_PERSONNEL_RECORD has no cert columns; cert lives in separate T_PERSONNEL_CERTIFICATE returned via certificateList.
- Detail template renders form.certificateType/Code, which stay empty so detail shows '-'.

## Fix
- Modified loadDetail to backfill basic-info cert fields from persisted certificate entity.
- Backfill robust to top-level on personnel, top-level on data, or via certificateList.
- Verified lint adds zero new hits (baseline 12080 problems; only pre-existing warning line 45).
- Production build passes (exit 0; baseline Sass @import deprecation warnings only).

## Context
- Project: zhi2-web-admin (real estate comprehensive service platform portal), submodule used by 苏住房G.
- Agent planned to load zentao-analyzer skill for status write-back (DBX transaction + zt_action/zt_history) but bug ID not specified in session.

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "defect_task",
  "name": "cert_field_backfill",
  "source_extraction_id": "a9e3366dbc1445b2bb32a37ef8523835",
  "version": 1,
  "memory_type": "entities"
}
-->