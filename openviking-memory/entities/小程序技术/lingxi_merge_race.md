# 合并灵犀房屋后事件与快照竞态导致房屋信息被清
mergeLingXiHouseIntoPortalUser 合并房屋后触发 PORTAL_HOUSE_SELECTION_CHANGED_EVENT，快照未更新导致正式环境清空刚合并的房屋。

## 问题根因
- mergeLingXiHouseIntoPortalUser 合并房屋后同步触发 PORTAL_HOUSE_SELECTION_CHANGED_EVENT
- onPortalHouseSelectionChanged 立即 restorePortalSnapshotFromPageStorage() 读到旧快照（houseBoundViaAuth 仍为 false）
- 正式环境下旧快照触发 clearPortalHouseFields 清掉刚合并的房屋

## 解决方案
- onPortalHouseSelectionChanged 用 $nextTick 等 writePortalSnapshot 完成后再恢复快照
- 抽取 maybeRunLingXiSelectMyHouse 与「我的」页对齐
- 灵犀选屋成功前先同步 ctUserIdentity 再合并，保证 complexId 与房屋列表正确

## 验证与归属
- 验证证据：006.md 会话 74f04a1e 问题原因与修复：绑定房屋成功弹窗成功但首页小区卡片不显示
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue、utils/portal-user.js
- 来源会话ID：74f04a1e-e10c-4f4b-b6f4-6377b07b2a9b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "lingxi_merge_race",
  "source_extraction_id": "a05ef5444c4c40b7b614ae24c0ceaaad",
  "version": 1,
  "memory_type": "entities"
}
-->