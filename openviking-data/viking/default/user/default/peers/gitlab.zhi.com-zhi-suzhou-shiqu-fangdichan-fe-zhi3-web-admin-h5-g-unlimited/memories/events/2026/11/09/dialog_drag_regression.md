# Summary
The X button in ImageViewer calls el-dialog's handleClose (emits update:visible=false), but the v-dialogDrag directive added in a regression commit swallows the close-button click. zs-dialog uses the same directive and closes fine because its visible is a plain data prop, while ImageViewer couples :visible.sync to a store-backed computed. The canonical safe fix is to stop the drag from starting on the close button.
# 2026-11-09 (Monday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: The file is minified to a few long lines, so grep returns the whole line. Let me extract the actual `el-dialog` close-handler context by locating the string offsets.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: The X button calls `el-dialog`'s `handleClose` (→ emits `update:visible=false`). The close logic itself is sound; the only thing that can intercept a header `mousedown`/click is the `v-dialogDrag` directive we added in the regression commit. `zs-dialog` uses the same directive and closes fine because its `visible` is a plain data prop, whereas `ImageViewer` couples `:visible.sync` to a store-backed computed — but more importantly this is the textbook "drag directive swallows the close-button click" regression. The canonical, safe fix is to stop the drag from starting on the close button.

Before editing, let me confirm repo state and build prerequisites (worktree paths + `node_modules` location, since the build config uses `../` relative paths).

<!-- MEMORY_FIELDS
{
  "event_name": "dialog_drag_regression",
  "goal": "Diagnose ImageViewer close bug",
  "summary": "The X button in ImageViewer calls el-dialog's handleClose (emits update:visible=false), but the v-dialogDrag directive added in a regression commit swallows the close-button click. zs-dialog uses the same directive and closes fine because its visible is a plain data prop, while ImageViewer couples :visible.sync to a store-backed computed. The canonical safe fix is to stop the drag from starting on the close button.",
  "ranges": "0-2",
  "source_extraction_id": "433bccefcb4041fdb2a5670372442e62",
  "version": 1,
  "memory_type": "events"
}
-->