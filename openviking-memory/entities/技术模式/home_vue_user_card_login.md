# 在 home.vue 中点击用户卡片触发补充登录
在 `home.vue` 中，`user-card` 块调用 `handleUserEntry`；`goLogin()` 触发 `detectMiniProgramEnv()` 和 `initMiniProgramMessageListener()`，当桥接未就绪时，在 `WeixinJSBridgeReady` 之后重新发送 `requestLogin`。

## 行为
- 整个 `user-card` 绑定到 `handleUserEntry`
- `goLogin()` 调用 `detectMiniProgramEnv()` 和 `initMiniProgramMessageListener()`
- 如果环境为 `miniprogram` 且桥接未就绪，则在 `WeixinJSBridgeReady` 之后重新发送 `requestLogin`
- 每次点击均返回清晰的 toast

## 文件与验证
- 验证证据: src=i淮安公版/001.md
- 涉及文件: src/pages/index/home.vue, vite.config.ts, src/store/user.js, src/store/house.js, src/pages/index/property.vue, src/api/security.js, src/pages/login/index.vue, index.html
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_vue_user_card_login",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->