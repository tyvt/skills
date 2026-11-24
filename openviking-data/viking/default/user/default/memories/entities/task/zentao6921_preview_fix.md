# Zentao 6921 Progress-Image Preview Fix
Fix of the broken thumbnail preview in the repair-order detail (报修工单详情) task-progress timeline of the zhi2-web-admin 苏住房 frontend, verified and delivered on 2026-11-24.

## Issue and fix
- Bug 6921: clicking a task-progress image thumbnail on the repair-order detail page did not open the global image viewer.
- Fix in `WorkOrderProgress.vue` at two places: replaced the `$viewerApi` call with the Vuex `preview/openPreview` call; both edits confirmed intact (line 77 and around line 272), eslint passed.
- The local dev DB referenced a server-side image that 404s locally because nginx's static block intercepts `.png`; for evidence only, the Zentao 6921 attachment (cropped ceiling-light photo) was staged at that exact URL path.

## Verification
- On the local 8101 site, clicking the thumbnail on order BX202608260002 set Vuex `preview` to `{showViewer:true, urlList:[...imageUrl], currentIndex:0}`; the viewer rendered the real photo with toolbar 1/1, zoom in/out, rotate, prev/next (correctly disabled for a single image) and close.
- Closing the viewer reset state to `{showViewer:false, urlList:[]}`.
- The first evidence screenshot showed a full-page screenshot inside the dialog and was rejected; it was redone with the cropped ceiling-light photo (naturalWidth 736) after a forced cache reload, and that version was approved.

## Delivery
- Submodule `zhi2-web-admin` commit `87fdd477e` containing only `WorkOrderProgress.vue`; parent-repo submodule pointer commit `1a782281`; both pushed and remote SHAs verified; rebases used `--autostash` and preserved three other people's dirty files (`ScreenHeader.vue`, `particles.js`, `_review.json`) plus the forbidden `env/.env`.
- Zentao writeback: bug 6921 set to resolved/fixed, resolvedBy=tiany, assignedTo=lichandan (openedBy), action id 98829 with files='24133', file 24133 attached to the bug; the DB transaction was committed and re-verified.
- Cleanup deleted `%TEMP%\zentao-6921\`, `D:\禅道附件\bug\6921\` and the staged `dist\zhi2-pro\` asset; nginx config was never changed, no leftover background jobs, gitlink confirmed at `87fdd477e`.

<!-- MEMORY_FIELDS
{
  "category": "task",
  "name": "zentao6921_preview_fix",
  "source_extraction_id": "7326d33d6f4a46ac939d97ced7a7fcca",
  "version": 1,
  "memory_type": "entities"
}
-->