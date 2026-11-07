# 登录状态持久化修复
苏住房C小程序登录状态未缓存，关闭重开即退出，已将Pinia持久化改为全平台生效。

## 问题根因
- `user.js` 中 Pinia 状态本地持久化被包在 `#ifdef H5` 条件编译，仅 H5 生效，微信小程序端跳过
- 登录时调用 `userStore.setToken()` 仅存内存，关闭小程序后 Pinia 状态重置表现为退出登录

## 修复内容
- `uni.setStorageSync` / `uni.getStorageSync` 持久化改为全平台生效（含微信小程序）
- H5 仍保留 `sessionStorage` 逻辑

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译运行小程序，登录后完全关闭重开，「我的」页仍显示已登录
- 涉及文件：user.js、vote.js、login/index.vue、App.vue、owner.js
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：81967bea-0ba8-4625-a47d-4edeb016e86b

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "user_store_persist_fix",
  "source_extraction_id": "d4aeab4b2dbf4b6c807c6259816b7573",
  "version": 1,
  "memory_type": "entities"
}
-->