# custom-image-viewer
Element UI `el-dialog`-based image preview component used in the zhi2-web-admin project.

## Description
- Globally mounted as `<image-viewer />` overlay; the dev-company page triggers preview via `AnnexUpload`/`ZsImg` → `preview/openPreview`.
- Provides image preview with an X close button and a thumbnail-triggered open path.

## Architecture
- `openPreview` store action is the trigger, dispatched by `AnnexUpload`/`ZsImg` and drivable via `window.__VUE_APP_STORE__` in Playwright.
- Close behavior is driven by the preview store plus a `:visible.sync` computed property.
- Element UI is loaded externally from `public/assets`, not from node_modules; Vue is injected via a build-time `<%- injectVue %>` placeholder that loads a global `vue.js`/`vue.min.js`, and `element-ui.js` is a global `defer` script expecting global `Vue`.
- `main.js` exposes `window.__VUE_APP_STORE__` and `window.__VUE_APP_ROUTER__` globally, enabling Playwright to drive the real `ImageViewer` without login.

## Bug Hypotheses
- Hypothesis A: `dialogVisible` setter calls `handleClose()` → `closePreview`; if `handleClose` throws (e.g. `stopDrag`/`stopResize`), setter fails and `showViewer` stays `true`, so dialog never closes. RULED OUT: `stopDrag`/`stopResize` are safe, `handleClose` does not throw.
- Hypothesis B: drag directive swallows the X close click. CONFIRMED (2026-11-09): `v-dialogDrag` on `.el-dialog__header` catches the close button (`.el-dialog__headerbtn`) mousedown and sets `.el-dialog { position: absolute }`, so the browser cancels the click (mousedown/mouseup land on different nodes) and X won't close; regression from commit `a20c15dcc`.

## Bug 6373 Status
- Worktree created on submodule branch `fix/bug-6373-preview-close` based on frozen base `2eb1e3ba7` (matching parent worktree gitlink, not current `develop/v3.0.0` tip `05a1a4421`); `node_modules` junctions placed to parent root (npm workspaces hoists deps there), so build resolves from parent root as of 2026-11-09.
- Close path provably correct down to `el-dialog` internals; dev-company page triggers preview via `AnnexUpload`/`ZsImg` → `preview/openPreview`, and `<image-viewer />` is globally mounted.
- Root cause confirmed (2026-11-09): `v-dialogDrag` on `.el-dialog__header` catches the close button (`.el-dialog__headerbtn`) mousedown, sets `.el-dialog { position: absolute }`, so the browser cancels the click (mousedown/mouseup land on different nodes) and X won't close. Regression from commit `a20c15dcc`.
- Fix applied (2026-11-09): added a guard in `drag.js` so a mousedown on the close button never starts a drag; build on `fix/bug-6373-preview-close` succeeded and lint passed (exit 0).
- Fix verified (2026-11-09): against a temporary nginx 8099 site serving the fixed `dist`, Playwright repro showed dialog closes (`after: false`, `posAfter: "NO_DIALOG"`), close-button `click` fires (`diag.click: 1`, was `0` on buggy build), no console errors.
- Open issue (2026-11-09): after the fix, `git status` in the submodule worktree showed hundreds of deletions because its `.git` file pointed to a mojibake (garbled) path of `苏州市房地产监测V3`; the linked-worktree `commondir`/registration also appears affected and was still under investigation.

<!-- MEMORY_FIELDS
{
  "category": "tech_component",
  "name": "custom_image_viewer",
  "source_extraction_id": "d08d5e877fd840b79bb9bba802b8a1f8",
  "version": 5,
  "memory_type": "entities"
}
-->