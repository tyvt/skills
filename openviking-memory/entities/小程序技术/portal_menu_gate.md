# 门户菜单门禁分叉规则
wygl门户菜单维修资金要bound houseId，业主决策每次强制灵犀选屋，门禁与登录恢复不同。

## 规则对比
- 维修资金：requiresBoundHouseId:true，hasBoundHouseId()（ctUserIdentity的houseId），不走灵犀，跳H5须带complexId+houseId
- 业主决策：登录+实名即可，ownerDecisionVoteExternal每次二次确认后强制pages/face/bdc重新选屋

## 登录恢复
- 维修资金须已有houseId才自动进入；业主决策登录后走确认+灵犀不依赖已有绑定
- 未登录点功能弹窗确认登录后，若满足门禁则自动打开原菜单（维修资金还需houseId）

## 验证与归属
- 验证：会话bb99cf34用户区分两菜单房屋要求不同并要求登录后自动恢复点击
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue、utils/portal-h5-webview.js、utils/portal-user.js、components/portal-gate-modal/portal-gate-modal.vue
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：bb99cf34-6840-4cc5-a121-c5b077a88a73；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_menu_gate",
  "source_extraction_id": "5b1a1539eea94bb4b9838ae7267a7ef1",
  "version": 1,
  "memory_type": "entities"
}
-->