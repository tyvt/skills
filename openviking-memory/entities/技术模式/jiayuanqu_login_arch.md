# 家园区一网通办登录架构
家园区一网通办为 uni-app 项目（无 Vue Router），登录态判断不依赖前端路由守卫，由 HTTP 响应、Pinia userStore 与 URL token 三方协作完成。

## 架构特征
- 全项目无 vue-router、beforeEach、navigateTo 拦截器
- 仅有的 beforeEach 出现在 Playwright 测试文件 tests/*.spec.ts，与业务登录无关
- uni.addInterceptor 仅注册 request 拦截器（src/http/interceptor.ts），不做登录判断

## 登录判断机制
- HTTP 响应层：接口返回 result==='fail' 且 info==='请先登录' 时跳转登录页
- Pinia userStore：以 userId / userCode 是否存在作为页面侧「已登录」依据
- URL 入参 token：从宿主（一网通办小程序 WebView）URL 解析后换票登录

## 关键文件
- HTTP 拦截与响应：src/http/interceptor.ts、src/http/http.ts
- 测试文件：tests/*.spec.ts

## 验证与归属
- 验证证据：cursor session=e801dbc3-fe45-4c53-9f67-0eb8418cef3c
- 所属项目：家园区一网通办

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jiayuanqu_login_arch",
  "source_extraction_id": "db3398da656b41a4955e049848ba9a61",
  "version": 1,
  "memory_type": "entities"
}
-->