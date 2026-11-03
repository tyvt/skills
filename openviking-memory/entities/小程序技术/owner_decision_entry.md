# 业主决策入口完整交互流程
wygl小程序「业主决策」菜单从点击到进入表决H5的完整交互链路，涵盖登录校验、实名门禁、二次确认与灵犀选屋。

## 交互流程
- 点击「业主决策」先调 promptPortalRealNameAuth()：未登录→登录门禁；已登录未实名→弹「不动产权限授权」弹窗 showAuthModal；已实名→true
- 通过实名门禁后才弹二次确认弹窗(uni.showModal，提示实时身份核验与选对房屋)
- 确认后无论是否已绑定房屋都走第三方选屋流程 pages/face/bdc，不再跳过直接开H5
- 选屋完成重定向回首页自动 fetchOwnerDecisionVoteH5Url 获取表决H5地址并进入

## 核心机制
- 回首页自动拉取表决URL沿用 portalPostAction=ownerDecisionVote 机制(tryConsumeOwnerDecisionPortalPostAction→openOwnerDecisionVoteH5)
- 未实名时不再直接进入确认或跳转实名页，必须先过实名门禁
- 维修资金等其它功能仍用原 ensureOwnerVerified()(有手机号直跳实名页)，与业主决策入口逻辑区分

## 验证与归属
- 验证证据：008.md 会话69631682/f16e6ba9、009.md 会话24b99026
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue、utils/portal-h5-webview.js
- 来源会话ID：69631682-9401-4bb4-bd61-d、f16e6ba9-0ef7-4d9a-8278-5ef26eb7c22f、24b99026-d930-474c-94f5-946b2e5b7235；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "owner_decision_entry",
  "source_extraction_id": "d8600bf3c81e4e25b78224a443f65995",
  "version": 1,
  "memory_type": "entities"
}
-->