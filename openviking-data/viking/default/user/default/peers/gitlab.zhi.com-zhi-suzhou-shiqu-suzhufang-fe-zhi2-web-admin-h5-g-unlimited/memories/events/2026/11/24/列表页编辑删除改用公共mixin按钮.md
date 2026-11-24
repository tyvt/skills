# Summary
2026-11-24，index.vue（第 163-197 行）的编辑/删除按钮改为使用公共 mixin 的 editButton/deleteButton，并把删除按钮的 permissionType 由 remove 覆盖为 delete，以匹配菜单实际权限码。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6835
所有按钮都要加安全权限，然后回写到禅道里面，反馈进度，处置完成，其余按钮，如编辑和删除，要用公共mixin里面的
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: Now implementing. Let me update the list page `buttons()` to use mixin buttons for edit/delete.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: The plan gate accepted it. Now the delete button — override mixin's `remove` to `delete` to match the menu code.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: Now the detail page — add `:permission` to feedback/finish buttons.

<!-- MEMORY_FIELDS
{
  "event_name": "列表页编辑删除改用公共mixin按钮",
  "goal": "落实列表页权限",
  "summary": "2026-11-24，index.vue（第 163-197 行）的编辑/删除按钮改为使用公共 mixin 的 editButton/deleteButton，并把删除按钮的 permissionType 由 remove 覆盖为 delete，以匹配菜单实际权限码。",
  "ranges": "0,163-167",
  "source_extraction_id": "3c0d6f0fcadc4f89b25debe6ef5aed17",
  "version": 1,
  "memory_type": "events"
}
-->