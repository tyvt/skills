# ZenTao Bug 6369
ZenTao defect 6369: emergency-plan attachment download produced a .txt suffix instead of the original file extension. A fix was committed to branch `fix/bug6369-download-txt-ext` (`8d5f9c0ce`) on 2026-11-11 and written back as resolved in ZenTao, but it was never merged into trunk, so the bug still reproduces online as of 2026-11-12.

## Description
- Module: emergency-plan attachment download, involving `DetailTemplate.downloadAttachmentFile` in `zhi2-web-admin/src/components/detail-template/detail-template.vue`.
- Symptom: downloaded file extension became `.txt` ("下载后，文件后缀变成了txt").
- History: tiany previously changed the method to `downloadGet` + `window.open` fallback, but the bug was re-activated.

## Root Cause
- Old code used `res.blob()` preserving server MIME type → `downloadBlobFile(blob, filename)`.
- tiany's fix replaced it with `downloadGet` → `saveBlobToFile`, where `new Blob([data])` dropped the MIME type and the passed `filename` could miss the extension.
- Project convention (`zipdownload.js`) requires explicitly setting blob MIME type and extracting the filename from `Content-Disposition`.
- 2026-11-12 复现的具体链路：`detail-template.vue` 的 `downloadAttachmentFile` 仅按 `file.name || URL末段` 取文件名；本记录 `planFileName` 为“访问地址和账号密码配置”（无扩展名），导致 `a.download` 无后缀，而 MIME 已被上一步丢弃，浏览器默认成 `.txt`。

## Fix and Verification
- Fix: `saveBlobToFile` preserves blob type + `Content-Disposition` fallback; `downloadGet` adds `returnRawResponse`; new `getAttachmentDownloadName` added.
- `saveBlobToFile` is shared by `download`/`downloadJson`/`downloadGet` (117 call sites, mostly explicit `.xlsx` exports), so the fix stays backward-compatible (only overrides when filename lacks extension, keeps blob type).
- Verification: ESLint 0 errors, `npm test` exit 0; fix committed on branch `fix/bug6369-download-txt-ext` (`8d5f9c0ce`). As of 2026-11-12 this branch was never merged into `develop/v2.6.2-suzhufang-li` or `develop/v2.6.2-suzhufang`; the main repo submodule pointer `e8e82a8496` still points to old code, so online still reproduces the bug.

## ZenTao Writeback
- ZenTao 6369 set `status=resolved`, `resolution=fixed`, `resolvedBuild=trunk`, `resolvedBy=tiany`, `assignedTo=lichandan` (returned to reporter).
- New `zt_action` id `90930` (actor=tiany, action=resolved); note covers root cause, fix points, verification, commit, and pending customer-test regression.
- Metadata: `openedBy=lichandan`, `product=79`, `project=141`, `execution=142`.
- Remaining: real-account/backend download joint-debug verification marked "待客测回归" (pending customer-test regression), handed to lichandan for acceptance.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6369",
  "source_extraction_id": "d95db0b8f7bd4a6187642fcde806f320",
  "version": 4,
  "memory_type": "entities"
}
-->