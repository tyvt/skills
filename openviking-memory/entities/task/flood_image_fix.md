---
audit_status: valid
last_checked: 2026-11-27T21:55:43+08:00
verdict_note: 苏住房防汛C端 upload.ts 含 zhi2-dev 前缀与 ensureServerUrl，图片路径修复属实
---
# Flood Check Image Mobile Display Fix
Completed 2026-11-26 defect fix for the Suzhou Housing flood-control C-end H5, where flood mid-check site photos did not display on mobile; verified, committed and pushed to dev.

## Root Cause and Fix
- Site photos on the flood mid-check detail page failed on mobile because resolveAssetUrl-wrapped images used stale absolute URLs that could not load.
- Fix changed image URLs to root-relative paths (`./zhi2-dev/...`) at `src/utils/upload.ts:100`; added test `tests/upload-ensure-server-url.test.ts`.
- The real gateway serves the image at `/zhi2-dev/` as HTTP 200 image/jpeg (~216KB); local nginx originally proxied `/api/` only, not `/zhi2-dev/`.

## Verification
- Work order `XZXJ20261126000001` showed "site photos 1/6" correctly with naturalWidth=1920 on the root-relative path.
- Full-page screenshot `C:/Users/Administrator/AppData/Local/Temp/verify-img-20261126-180033.png` was retained and user-confirmed.
- Build EXIT=0 before and after (prior baseline reused); unit tests skipped because node_modules/vitest@5.0.5 conflicts with vite exports, a pre-existing environment issue.

## Local nginx Side Fix
- `D:/nginx/conf/env-sites/防汛C端-local.conf` had two defects: the `.jpg$` static-cache regex shadowed the `/zhi2-dev/` proxy prefix, and a `proxy_pass` trailing slash stripped the path prefix.
- Added `^~` to the three `/zhi2*` prefixes and removed the trailing slash; original backed up to `$env:TEMP/防汛C端-local.conf.bak-hop3`.
- `nginx -t` passed, reload succeeded, and the image served locally with HTTP 200; the conf is deploy-panel generated and may be overwritten on regeneration.
- Awaiting the user decision on whether to also fix the generator template to prevent recurrence.

## Delivery
- Commit `bcdee55 fix(flood): 汛中检查图片改根相对路径，修复手机端不显示` contained only `src/utils/upload.ts:100` and the new test; `origin/dev` SHA matched local.
- Dirty file `project-check/records/index.vue` was excluded; no Zentao link, so no writeback.
- Handoff section 4 unfinished items were cleared; chain terminated with no next hop scheduled.

<!-- MEMORY_FIELDS
{
  "category": "task",
  "name": "flood_image_fix",
  "source_extraction_id": "bb6949665be44800b15a4d87520cf2fc",
  "version": 1,
  "memory_type": "entities"
}
-->