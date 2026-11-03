# 门户双Tab小区不同步Bug
wygl小程序首页home与externalWebview双Tab切换时小区/房屋选择不同步，onShow全量拉profile冲掉picker选中项。

## 问题根因
- 两个Vue页面onShow均跑全量刷新（refreshFromServer/initializePage），互相覆盖门户状态
- 「我的」页onShow拉profile可能清空houseId再合并ctUserIdentity，无记录默认选第一套
- clearPortalHouseFields/refreshPortalProfile清houseId但picker选择无独立持久化

## 解决方案
- 增加独立存储（如__ew_portal_active_house__），picker切换写入houseId/project，恢复时优先
- Tab切回onShow只做本地快照恢复+轻量同步房屋列表，不跑完整initializePage（首次onLoad再拉）
- mergeCtUserIdentityHouseIntoPortalUser拉列表后先恢复用户上次选择，无记录再用第一套

## 验证与归属
- 验证：会话7ebdef37用户反馈两边切换小区不同步；第二轮归纳onShow全量刷新覆盖picker
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue、utils/portal-user.js、components/custom-tabbar/custom-tabbar.vue
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：7ebdef37-14ee-44a0-8372-b1a08283e34e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_tab_sync",
  "source_extraction_id": "5b1a1539eea94bb4b9838ae7267a7ef1",
  "version": 1,
  "memory_type": "entities"
}
-->