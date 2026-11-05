# 应用冷启动清空登录态
在 Pinia 持久化 token 的前提下，通过 stores/user.js 新增 clear() 并在 App.vue 的 onLaunch 调用，实现每次打开应用都重新登录。

## Description
- 原 user store 通过 persist 用 uni.setStorageSync 持久化整个 store，导致重新打开应用恢复旧 token 复用登录态。
- 新增 clear() 清空 token、userDetail、项目/房屋等登录相关 state，401 时也会调用退出登录。

## 修改要点
- stores/user.js 中新增 clear() 方法重置登录态。
- App.vue 的 onLaunch 开头调用 userStore.clear() 实现冷启动清登录态。

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 涉及文件：stores/user.js、App.vue、api/index.js
- 来源会话ID：76c1a853-e824-48f0-9797-ceb46726df69
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "app_launch_clear_token",
  "source_extraction_id": "2b613728a85544a581e8279650d99ee9",
  "version": 1,
  "memory_type": "entities"
}
-->