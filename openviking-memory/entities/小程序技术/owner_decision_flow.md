# 业主决策portalPostAction消费流程
wygl小程序业主决策H5打开成功后再消费缓存，普通绑房入口需清残留避免重复触发。

## 问题根因
- 首页点业主决策→web-view/灵犀选屋→回调个人中心应自动拉表决URL
- portalPostAction过早清除或残留会导致绑房回调again自动进业主决策或重复调接口
- 选屋回调页固定跳个人中心，消费逻辑须写在能接回调的页面

## 解决方案
- tryConsumeOwnerDecisionPortalPostAction在openOwnerDecisionVoteH5成功跳转后再markConsumed
- 统一清理本地storage、pendingPortalPostAction、URL参数、redirectUrl内同名参数
- 普通「绑定房屋」未带portalPostAction时先resetOwnerDecisionPendingState
- 用ownerDecisionPostActionConsuming防止请求中重复执行

## 回跳路由问题
- 灵犀选屋 backUrl 固定指向 H5 pages/index/home，小程序侧落到「我的」(externalWebview) 而非首页 (home.vue)
- 记录入口页 /pages/webview/home，回调落「我的」且有待执行动作时 redirectTo 回首页
- h5ExternalWebview 返回优先跳记录入口页

## 验证与归属
- 验证：会话5176f41c用户要求回调在个人中心消费postAction成功后清缓存防普通绑房再触发
- 回跳路由验证：会话4674d2ec 灵犀选屋 backUrl 固定致小程序落「我的」而非首页，记录入口页并 redirectTo 修复
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue、utils/portal-h5-webview.js、pages/face/bdc.vue、pages/face/verify.vue、components/custom-tabbar/custom-tabbar.vue、pages/webview/h5ExternalWebview.vue、utils/portal-user.js
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：5176f41c-4e0d-4dfb-b229-b0063e7d524b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "owner_decision_flow",
  "source_extraction_id": "be4aa91f02c141399d6ebae445df4642",
  "version": 2,
  "memory_type": "entities"
}
-->