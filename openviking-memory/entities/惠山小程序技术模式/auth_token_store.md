# 惠山小程序无登录页登录态store存
项目为 JavaScript 非 TypeScript，无独立 login 页与 getPhoneNumber，登录态由 user store 持久化 token 并统一注入请求头。

## 登录与鉴权
- 项目为 JavaScript 非 TypeScript
- 无独立 login 页与 getPhoneNumber
- src/stores/user.js 用 uni.setStorageSync 持久化 token
- src/request/index.js 统一注入 Authorization: Bearer {token} 请求头

## 涉及文件
- d:/repository/惠山小程序/src/api/modules/auth.js
- d:/repository/惠山小程序/src/stores/user.js
- d:/repository/惠山小程序/src/request/index.js
- d:/repository/惠山小程序/src/api/modules/user.js
- d:/repository/惠山小程序/src/App.vue
- d:/repository/惠山小程序/src/pages_home/home.vue
- d:/repository/惠山小程序/src/pages_home/home.js
- d:/repository/惠山小程序/src/api/index.js

## 验证与归属
- 验证证据：extracted source=cursor session=88a6c8e2-8b78-41a9-99f8-2d3692fdd743
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "auth_token_store",
  "source_extraction_id": "506c6443b4d24c358b82c5a05e60bdc8",
  "version": 1,
  "memory_type": "entities"
}
-->