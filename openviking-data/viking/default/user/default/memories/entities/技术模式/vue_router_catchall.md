# 动态路由首跳 catch-all 兜底
在 constantRoutes 增加 catch-all 路由消除首帧 No match 警告，动态路由仍按原守卫 replace。

## 问题根因
- 刷新直进 `/system/config` 等权限路由时，Vue Router 4 先打 `[Vue Router warn]: No match found`。
- `beforeEach` 里 `GenerateRoutes` + `addRoute` 再 `replace` 到目标，页面能开但控制台吵。
- 与「落地页未注册」类问题不同，本条专消首次匹配前的 warn。

## 解决方案
- 在 `router/index.js` 的 `constantRoutes` 增加 `path: '/:pathMatch(.*)*'` 指向 404 组件，让首帧至少匹配一条静态路由。
- 动态路由挂上后仍按原守卫 `replace` 到真实页面。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 e69bf570「进入路由之前会报这个错，但是实际上路由可以正常打开」；加 catch-all 兜底。验证文档：src=2-0/019.md。
- 涉及文件：zhi2-web-admin/src/router/index.js。
- 所属项目：2-0；来源会话ID：e69bf570-f1df-461a-a4e3-2caf768354d7；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_router_catchall",
  "source_extraction_id": "07d76519daf74721861ef48c23fa6ca0",
  "version": 2,
  "memory_type": "entities"
}
-->