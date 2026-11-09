# ZenTao Bug 6373
ZenTao defect 6373: the attachment preview dialog on the 开发企业→企业基本信息 page cannot be closed by clicking the X button, under analysis on 2026-11-09.

## Description
- Module: 开发企业 → 企业基本信息 (same page as already-fixed bug 6363).
- Symptom: clicking the X close button on the attachment preview dialog fails to close it.
- Screenshot `关闭.gif` records the failed close attempt; first frame shows the 编辑页面 on 客户测试环境 58.210.252.230:9002; bug has no comments.
- Reproduction via `magpie-vision` frame analysis (assistant is non-multimodal): preview dialog opens with `A.png` title but stays open after the X click; frame f30 shows the close area looking odd.

## Investigation
- Preview dialog chain: `DeveloperBasicInfoDetail.vue` → `AppendixPackageSection` → `AnnexUpload` → Vuex `preview` store module → `ImageViewer/index.vue`.
- `ImageViewer/index.vue` uses a custom `v-dialogDrag` directive that attaches `mousedown` to the header where the X button lives; a buggy drag directive may swallow the X click.
- Latest commit `a20c15dcc` touching `ImageViewer` added "图片弹窗可拖动与伸缩" (draggable/resizable popup) — strong suspect for the regression.
- Commit diff `a20c15dcc` also added a resize handle; the close handler (`handleClose → closePreview`) was already present before this commit, so the regression is in the added drag/resize wiring.
- Full `<el-dialog>` template (lines ~46–79) shows the resize handle at bottom-right with `@mousedown.stop.prevent`; the X is the default el-dialog close button.
- Vuex `preview` store mutation was verified correct, isolating the close failure to component wiring rather than the store.
- `zs-dialog.vue` (also uses `v-dialogDrag` and closes fine) uses a global non-scoped style block so styles survive `append-to-body`, and wraps `@closed` to reset the drag directive's inline styles via `resetDialogPosition()`.
- `zs-dialog`'s `visible` is a normal prop from its parent, while `ImageViewer` wires `:visible.sync` to a store-backed computed setter plus `v-if` + `append-to-body` + `@closed`, making the drag directive's interference harder to reset.
- Root cause confirmed: `v-dialogDrag` binds `onmousedown` to the header containing the X button (added in commit `a20c15dcc`), swallowing the close click.

## Status
- Root cause confirmed on 2026-11-09: `v-dialogDrag` directive (added in commit `a20c15dcc`) binds `onmousedown` to the header containing the X button, swallowing the close click in `ImageViewer`. Not yet fixed or resolved.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6373",
  "source_extraction_id": "5a889b7ef6f94dd88ae585e824838b3c",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->