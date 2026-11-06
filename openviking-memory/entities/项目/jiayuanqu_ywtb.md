# 家园区一网通办项目架构
家园区一网通办是基于 uni-app（无 Vue Router）的前端项目，登录态判断依赖 HTTP 响应、Pinia 与 URL 入参 token。

## Description
- 项目使用 uni-app 框架，不存在 vue-router、beforeEach 路由守卫、isLogin/checkLogin 等前端登录态工具函数
- 全项目无路由级守卫，仅 Playwright 测试文件中有 beforeEach，与业务登录无关
- uni.addInterceptor 仅注册 request 拦截器（src/http/interceptor.ts），不做登录判断

## 登录判断机制
- HTTP 响应层：接口返回 result==='fail' 且 info==='请先登录' 时跳转登录页
- Pinia userStore：以 userId/userCode 是否存在作为页面侧「已登录」依据
- URL 入参 token：从宿主（一网通办小程序 WebView）URL 解析后换票登录

## 关键文件
- 拦截器：src/http/interceptor.ts
- HTTP 封装：src/http/http.ts
- 测试：tests/*.spec.ts

## 验证与归属
- 所属项目：家园区一网通办
- 来源会话：e801dbc3-fe45-4c53-9f67-0eb8418cef3c

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "jiayuanqu_ywtb",
  "source_extraction_id": "3c9c5ceeb6ee4383884ee7e320ea30c6",
  "version": 1,
  "memory_type": "entities"
}
-->