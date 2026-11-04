# 小程序分包路由完整路径不变规则
uni-app / 微信小程序分包只改变打包位置，页面完整路径保持不变。

## 核心结论
- 分包后业务跳转路径不需要改，当前代码路由写法与 pages.json 一致，无需再改一轮
- 例如 root: "pages/face" + path: "bdc" → 实际路径仍是 pages/face/bdc，navigateTo / redirectTo 继续用 /pages/face/bdc
- 上次主包大小优化没有改任何跳转 URL，这是正确做法

## pages.json与文件路径对照
- pages/face/verify.vue → pages/face + verify → 完整路由 pages/face/verify
- pages/face/bdc.vue → pages/face + bdc → 完整路由 pages/face/bdc
- pages/face/face.vue → pages/face + face → 完整路由 pages/face/face
- pages/face/user-agreement.vue → 分包配置 → 完整路由 pages/face/user-agreement

## 验证与归属
- 验证证据：会话 404cce7e 主包大小超限优化，核对分包后路由无需改动
- 涉及文件：pages.js、pages/face/verify.vue、pages/face/bdc.vue
- 所属项目：小程序；来源会话ID：404cce7e-39c8-4d87-8c7d-0d9d3fe66028；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "subpackage_routing_rule",
  "source_extraction_id": "7265b7fedf1548a680e2fa560dd69120",
  "version": 1,
  "memory_type": "entities"
}
-->