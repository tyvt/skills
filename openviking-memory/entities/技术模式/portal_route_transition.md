# 门户路由级过渡动画
门户在指定路径对之间启用切换过渡动画，由路由层打方向标记、App.vue 按标记切换 transition，其余路由不受影响。

## 场景与需求
- 首页点「统一平台入口」跳登录页希望切换动画：首页向左淡出略缩小、登录页从右侧滑入淡入，约 0.38s，out-in 模式
- 仅在 /UnifiedLogin ↔ /login 之间生效，后台业务页之间不加位移切换

## 实现要点
- 在 src/App.vue 把 router-view 外包一层 <transition>，定义 portal-auth-forward / portal-auth-back 两个过渡样式
- 在 src/router/index.js 的 beforeEach 里识别参与过渡的路径对，给目标路由 meta 打过渡方向标记
- 用 out-in 模式让出场动画先结束避免两页面同时在场互相遮挡；Vue2 模板 transition 单子元素时注意 v-if/v-else 包层写法

## 降级与约束
- 加 prefers-reduced-motion 降级：系统开启「减少动效」时只保留短淡入淡出，不做位移
- 只对白名单路径对启用，其它路由完全不受影响

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/App.vue；zhi2-web-admin/src/router/index.js
- 所属项目：门户；来源会话ID：session-8f747c2a-1036-4f70-91a4-eceedf79f19f；代码基线：d8addc3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_route_transition",
  "source_extraction_id": "b52d446d4244401c9fcc19d40ef516e9",
  "version": 1,
  "memory_type": "entities"
}
-->