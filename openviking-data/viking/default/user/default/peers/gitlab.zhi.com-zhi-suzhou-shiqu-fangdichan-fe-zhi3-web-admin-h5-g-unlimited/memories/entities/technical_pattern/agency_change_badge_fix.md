# Agency Change Badge False Positive Fix
Bug 6464 in zhi2-web-admin showed false "changed" badges on agency personnel change form due to raw !== comparison.

## Root Cause
- `AgencyPersonnelBasicInfoFormFields.vue` `changeBadge(field)` used raw `!==` between current form value and snapshot `beforeForm`.
- Sibling pages use mixin `changeObjectMixins.changeBadgeValue` which normalizes dates to `yyyy-MM-dd` and casts numbers/strings via `String`.
- Initiating change without edits showed multiple red badges because of format/type mismatch (e.g., date with time, number vs string).

## Fix
- Replaced component's `changeBadge` to delegate to mixin `changeBadgeValue`, keeping original `changeActive` guard.
- Only normalized differing values show change badge, matching `AgencyBranchDetail`, `toB/personnelRecord`, `LeasePersonnelDetail`.
- Changed only one file: `src/views/institution/agencyPersonnel/components/AgencyPersonnelBasicInfoFormFields.vue`.

## Verification
- `npx eslint` on changed file: 0 error, 0 new warning (2 pre-existing `el-form-item` warnings unrelated).
- Production build blocked by pre-existing unrelated error: `LEASE_CHANGE_FLOW_BUS_CODE` missing export in `companyRecord.js` used by `company/companyManagement/components/AgencyBasicInfoDetail.vue`; not in bug scope.
- ZenTao bug 6464 written back as `resolved/fixed`, `resolvedBy=tiany`, `assignedTo=zhunan`, with root-cause HTML comment.

## Context
- Project: zhi2-web-admin (Suzhou housing portal), branch `develop/v3.0.0`.
- Submodule commit pending per user choice to commit and push on 2026-11-11.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "technical_pattern",
  "name": "agency_change_badge_fix",
  "source_extraction_id": "9e2988b6bbf64d64ab44c4e9b8cd46cc",
  "version": 1,
  "memory_type": "entities"
}
-->