# Summary
On 2026-11-03, a bug was fixed where `mountSelectDialogComponent` used `propsData: { visible: true }` to mount dialogs, but old dialogs like `superviseDialog` did not declare the `visible` prop, causing Vue 2 to discard it and hide the dialog. The fix changed `mountDialog.js` to use Shell `render` and pass `visible` via both `props` and `attrs`; `superviseDialog.vue` added `visible`/`syncVisible` props and removed the problematic `before-close`. Verification source: 苏州市房地产监测V3-rest/013.md.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】弹窗未声明visible被Vue2丢弃致隐藏
【内容】`mountSelectDialogComponent` 用 `propsData: { visible: true }` 挂载，但 `superviseDialog` 等旧弹窗未声明 `visible` prop 被 Vue 2 丢弃致隐藏。`mountDialog.js` 改用 Shell `render` 并通过 `props` + `attrs` 同时传 `visible`；`superviseDialog.vue` 增加 `visible` / `syncVisible` 并移除问题 `before-close`。
【验证证据】src=苏州市房地产监测V3-rest/013.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/riskmanage/riskregister/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/riskmanage/riskregister/components/superviseDialog.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/utils/selectDialog/index.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/utils/selectDialog/superviseProject.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/utils/selectDialog/generic.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/utils/selectDialog/mountDialog.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/detailMixins.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-input/zs-input.vue
【来源会话ID】643201ce-b344-4b8f-9d1d-ca5948636201
【代码基线】none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "event_name": "dialog_visible_fix",
  "goal": "Fix hidden dialog bug",
  "summary": "On 2026-11-03, a bug was fixed where `mountSelectDialogComponent` used `propsData: { visible: true }` to mount dialogs, but old dialogs like `superviseDialog` did not declare the `visible` prop, causing Vue 2 to discard it and hide the dialog. The fix changed `mountDialog.js` to use Shell `render` and pass `visible` via both `props` and `attrs`; `superviseDialog.vue` added `visible`/`syncVisible` props and removed the problematic `before-close`. Verification source: 苏州市房地产监测V3-rest/013.md.",
  "ranges": "0-6",
  "source_extraction_id": "291e87acf6c04172af7e4add2ede74d6",
  "version": 1,
  "memory_type": "events"
}
-->
