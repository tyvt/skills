# 体验版房屋首页不可见修复
体验版（ctUserIdentity）识别到的房屋在「我的」页可见，但首页菜单仍弹「请先添加房屋」。
## 问题根因
- externalWebview.vue（「我的」页）体验版支持通过 ctUserIdentity 识别绑定房屋：有 houseId 或 houseList 即视为已绑定，登录后调 maybeLoadTrialHouseList() 拉取，恢复快照不因缺少 houseBoundViaAuth 清空
- home.vue（首页菜单）沿用正式版逻辑：ensureHouseSelected() 强制要求 houseBoundViaAuth && houseId；restorePortalSnapshotFromPageStorage() 在 !houseBoundViaAuth 时 clearPortalHouseFields 清掉「我的」页已加载房屋；未调用 mergeCtUserIdentityHouseIntoPortalUser，首页不主动拉取体验版房屋
## 修复内容
- 在 home.vue 与 externalWebview.vue 对齐体验版逻辑，使首页菜单认可 ctUserIdentity 识别的房屋
## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue、utils/portal-user.js
- 来源会话ID：0058f23d-986e-4656-8a58-d2a02848f549；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "trial_house_sync",
  "source_extraction_id": "e639637956e641fd92e4d5fcac5e1554",
  "version": 1,
  "memory_type": "entities"
}
-->