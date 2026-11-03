# Summary
The B-end hid the left 'property management area' selector but `complexId` was not auto-bound from `$store.getters.currentProjectId`, causing 'add' validation to fail. Fixed by adding `resolveComplexFromProject()` in `facility/index.vue` to auto-fill `complexId`/`complexName` from the top nav, called in `init` and `handleAdd`, and optimizing B-end prompt text.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】B端新增设施未绑顶部项目ID致校验失败
【内容】B端隐藏左侧「物业管理区域」选择框，但 `complexId` 未从 `$store.getters.currentProjectId` 自动绑定，导致点击「新增」校验失败。在 `zhi2-web-admin/src/views/maintenance/facility/index.vue` 新增 `resolveComplexFromProject()` 从顶部导航栏自动填充 `complexId`/`complexName`，并在 `init`、`handleAdd` 等方法中调用，同步优化B端提示文案。
【验证证据】src=园区公共收益/015.md
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/facility/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/facilityChange/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/store/modules/user.js ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubAccountBalance/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/layout/components/Navbar.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/property/serviceItem/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubCommunityBook/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/property/complex/index.vue
【来源会话ID】2e2052e0-5af7-4539-ad66-24c40bd630fb
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "facility_complexid_fix",
  "goal": "Fix B-end facility validation",
  "summary": "The B-end hid the left 'property management area' selector but `complexId` was not auto-bound from `$store.getters.currentProjectId`, causing 'add' validation to fail. Fixed by adding `resolveComplexFromProject()` in `facility/index.vue` to auto-fill `complexId`/`complexName` from the top nav, called in `init` and `handleAdd`, and optimizing B-end prompt text.",
  "ranges": "20-26",
  "source_extraction_id": "7edae260dc5b4c619dbc8dc085a84546",
  "version": 1,
  "memory_type": "events"
}
-->