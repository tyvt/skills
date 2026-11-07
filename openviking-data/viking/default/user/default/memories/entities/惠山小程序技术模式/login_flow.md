# 惠山小程序登录流程架构
惠山小程序为JavaScript项目，无独立login页面，登录态通过Pinia user store持久化并统一携带Bearer token。

## 核心机制
- 无独立`login`页面，无`getPhoneNumber`相关代码
- 登录态通过Pinia `user` store持久化（`uni.setStorageSync`）
- 请求头统一携带 `Authorization: Bearer {token}`

## 核心文件
- `d:/repository/惠山小程序/src/App.vue`：H5灵犀登录主入口（`requestCode`/`authCode`）
- `d:/repository/惠山小程序/src/stores/user.js`：登录态store（token、用户信息、房屋绑定状态）
- `d:/repository/惠山小程序/src/request/index.js`：Axios封装、请求签名、Bearer token注入
- `d:/repository/惠山小程序/src/api/index.js`：`getToken()`、401清登录态
- `d:/repository/惠山小程序/src/env/mp.js`：小程序`BASE_`配置

## 验证与归属
- 验证证据：extracted source=cursor project=惠山小程序
- 来源会话：88a6c8e2-8b78-41a9-99f8-2d3692fdd743；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "login_flow",
  "source_extraction_id": "7d5ef1522fbc472fbc5710e10832618d",
  "version": 1,
  "memory_type": "entities"
}
-->