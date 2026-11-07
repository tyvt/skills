# 正式版房屋卡片展示逻辑
wygl正式版房屋卡片展示用ctUserIdentity，业主决策仍单独校验灵犀绑房houseBoundViaAuth。

## 问题根因
- 体验版连生产接口能显示卡片，正式版有ctUserIdentity房屋数据却显示「去添加房屋」
- 正式版曾把「有房屋」与houseBoundViaAuth（灵犀选屋成功）绑死，混用两套口径

## 解决方案
- hasPortalHouse()：有houseId或houseList即视为有房屋；正式版合并ctUserIdentity不因未灵犀绑定清空
- 单独hasOwnerDecisionLingXiBinding()仅在openOwnerDecisionVoteH5校验houseBoundViaAuth
- 恢复快照时勿因「未灵犀绑定」清空已展示房屋；卡片看ctUserIdentity，业主决策强制灵犀选屋

## 验证与归属
- 验证：会话59b45a58用户问正式版有返回却不显示卡片；结论新增hasPortalHouse等
- 涉及文件：utils/portal-user.js、pages/webview/home.vue、pages/webview/externalWebview.vue
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：59b45a58-ecb6-4c2a-aae6-55308e7e54f5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "formal_house_card",
  "source_extraction_id": "5b1a1539eea94bb4b9838ae7267a7ef1",
  "version": 1,
  "memory_type": "entities"
}
-->