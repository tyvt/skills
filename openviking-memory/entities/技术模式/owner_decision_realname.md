# 业主决策菜单点击先校验实名后确认
新增 promptPortalRealNameAuth() 对齐 externalWebview.vue 的 handleUserEntry，业主决策菜单点击先校验实名后进入二次确认。

## 实现要点
- 新增 promptPortalRealNameAuth() 对齐 externalWebview.vue 的 handleUserEntry 逻辑
- 业主决策菜单点击先校验实名：未登录弹门禁、未实名弹 showAuthModal
- 实名校验通过后进入二次确认

## 关联清理
- 确认弹窗内移除重复 ensureOwnerVerified()
- 其它功能仍用原逻辑

## 验证与归属
- 验证证据：extracted source=cursor session=6ee1f9e2-e92a-4b85-a26a-c8d8507a5363
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue
- 项目：物管微信小程序（wygl-wxxcx-dev-slh）；来源会话：6ee1f9e2-e92a-4b85-a26a-c8d8507a5363；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_decision_realname",
  "source_extraction_id": "d9e19cb54d224c039e43fdf024031f38",
  "version": 1,
  "memory_type": "entities"
}
-->