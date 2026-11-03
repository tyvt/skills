# 体验版无需 authCode 直拉绑定房屋
体验版已登录时直接调 ctUserIdentity 房屋接口展示全部绑定房屋，不依赖 query 的 authCode。

## 行为变更
- hasHouse 体验版以 houseList/houseId 有值即视为已绑定
- 新增 maybeLoadTrialHouseList() 体验版调 mergeCtUserIdentityHouseIntoPortalUser 写快照
- refreshFromServer 结束自动拉体验版房屋列表，不再因 houseBoundViaAuth===false 清空房屋字段
- 正式版仍要求灵犀 authCode 选屋成功

## 验证与归属
- 验证：012.md 会话 6e874fea 体验版直接调用房屋接口展示绑定房屋
- 涉及文件：pages/webview/externalWebview.vue、utils/portal-user.js
- 来源会话ID：6e874fea-3404-4455-9e9d-3e8d774fa49d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "trial_no_authcode",
  "source_extraction_id": "fcb833032af14e8ea003acd1fc6646fe",
  "version": 1,
  "memory_type": "entities"
}
-->