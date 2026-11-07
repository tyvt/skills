# 三层登录模式
家园区一网通办基于 uni-app 构建且未引入 vue-router，不存在 beforeEach 路由级登录拦截；前端采用 URL token 换票、Pinia 持久化与接口「请先登录」拦截的三层登录机制。

## 模式要点
- 登录成功须 urlToken、ywtbLogin、userCode+tableId 均有值
- 前端已登录态据 userStore.userId 等字段判定，无独立 isLogin 函数
- 登录态判定依赖 src/http/interceptor.ts 的 HTTP 响应（result==='fail' 且 info==='请先登录'）、Pinia userStore 的 userId/userCode 及 URL token 换票

## Storage 一览
- 前端相关存储键：urlToken、isphone、user、beforeLoginPath
- beforeLoginPath 记录登录前路径，但当前未被消费

## 已知缺口
- beforeLoginPath 未被消费（记录后无后续跳转使用）
- handleLoginSuccess 为无条件跳转，未做条件分支

## 关键文件
- 登录页：src/pages/login.vue
- 请求拦截：src/http/http.ts
- 状态管理：src/store/user.ts
- 根实例：src/App.vue
- 公共接口：src/api/common.ts
- 入口文件：src/main.ts
- 首页：src/pages/home.vue
- 判定文档：docs/登录判断条件.md

## 验证与归属
- 验证证据：extracted source=cursor project=家园区一网通办
- 验证证据：src=家园区一网通办/001.md、cursor session=e801dbc3-fe45-4c53-9f67-0eb8418cef3c
- 所属项目：家园区一网通办
- 来源会话：527af833-af1a-4cfa-8e1f-f5a042a2da67、e801dbc3-fe45-4c53-9f67-0eb8418cef3c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "three_layer_login",
  "source_extraction_id": "988f0e26b2544c369974d107c496b197",
  "version": 3,
  "memory_type": "entities"
}
-->