# Pinia持久化旧token冷启动清理
uni-app 用 Pinia persist 持久化 user store，冷启动会恢复旧 token，需 onLaunch clear 实现每次重登。

## 问题根因
- Pinia persist(uni.setStorageSync) 将 token、userDetail、项目房屋等持久化到本地存储。
- 重开应用自动恢复旧 token，导致旧凭证被复用。

## 解决方案
- stores/user.js 新增 clear() 清空 token、userDetail、项目房屋等状态。
- App.vue onLaunch 开头调用 useUserStore().clear() 实现每次冷启动重新登录。
- src/api/index.js 的 401 处理原写 userStore.clear() 未定义，改为 useUserStore().clear()。

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证证据：009.md 会话 76c1a853（getToken 复用分析 + onLaunch clear + 401 useUserStore()）。
- 涉及文件：src/api/index.js、stores/user.js、src/App.vue。
- 来源会话ID：76c1a853-e824-48f0-9797-ceb46726df69；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pinia_token_clear",
  "source_extraction_id": "e9498e5ec3134785bc60d5eca40d3bd0",
  "version": 1,
  "memory_type": "entities"
}
-->