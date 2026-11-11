
# ZenTao Bug 6369
ZenTao defect 6369: emergency-plan attachment download produced a .txt suffix instead of the original file extension; fixed, committed, pushed, and written back as resolved on 2026-11-11.

## Description
- Module: emergency-plan attachment download, involving `DetailTemplate.downloadAttachmentFile` in `zhi2-web-admin/src/components/detail-template/detail-template.vue`.
- Symptom: downloaded file extension became `.txt` ("下载后，文件后缀变成了txt").
- History: tiany previously changed the method to `downloadGet` + `window.open` fallback, but the bug was re-activated.

## Root Cause
- Old code used `res.blob()` preserving server MIME type → `downloadBlobFile(blob, filename)`.
- tiany's fix replaced it with `downloadGet` → `saveBlobToFile`, where `new Blob([data])` dropped the MIME type and the passed `filename` could miss the extension.
- Project convention (`zipdownload.js`) requires explicitly setting blob MIME type and extracting the filename from `Content-Disposition`.

## Fix and Verification
- Fix: `saveBlobToFile` preserves blob type + `Content-Disposition` fallback; `downloadGet` adds `returnRawResponse`; new `getAttachmentDownloadName` added.
- `saveBlobToFile` is shared by `download`/`downloadJson`/`downloadGet` (117 call sites, mostly explicit `.xlsx` exports), so the fix stays backward-compatible (only overrides when filename lacks extension, keeps blob type).
- Verification: ESLint 0 errors, `npm test` exit 0; commits: submodule `fix/bug6369-download-txt-ext` (`8d5f9c0ce`) and parent `develop/v2.6.2-suzhufang-li` (`738b010`) gitlink pushed.

## ZenTao Writeback
- ZenTao 6369 set `status=resolved`, `resolution=fixed`, `resolvedBuild=trunk`, `resolvedBy=tiany`, `assignedTo=lichandan` (returned to reporter).
- New `zt_action` id `90930` (actor=tiany, action=resolved); note covers root cause, fix points, verification, commit, and pending customer-test regression.
- Metadata: `openedBy=lichandan`, `product=79`, `project=141`, `execution=142`.
- Remaining: real-account/backend download joint-debug verification marked "待客测回归" (pending customer-test regression), handed to lichandan for acceptance.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6369",
  "source_extraction_id": "ae4627d904c64a18a1805f90f32facd5",
  "version": 3,
  "memory_type": "entities"
}
-->