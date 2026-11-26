# 家园区一网通办uni-app登录判断机制
家园区一网通办是 uni-app 项目，无 Vue Router 与前端路由守卫，登录判断依赖 HTTP 响应层、Pinia userStore 与 URL token 三条路径。

## 架构结论
- 项目为 uni-app，无 vue-router、beforeEach 路由守卫、navigateTo 拦截器
- 不存在 isLogin / checkLogin 等前端登录态工具函数
- 仅有的 beforeEach 位于 Playwright 测试文件（tests/*.spec.ts），与业务登录无关
- uni.addInterceptor 仅注册 request 拦截器（src/http/interceptor.ts），不做登录判断

## 登录判断路径
- HTTP 响应层：result === 'fail' 且 info === '请先登录' 时跳转登录页
- Pinia userStore：userId / userCode 是否存在作为页面侧「已登录」依据
- URL 入参 token：从宿主（一网通办小程序 WebView）URL 解析后换票登录

## 关键文件与归属
- HTTP 响应拦截：src/http/interceptor.ts、src/http/http.ts（第56-124行）
- 验证证据：extracted source=cursor project=家园区一网通办
- 所属项目：家园区一网通办
- 来源会话ID：e801dbc3-fe45-4c53-9f67-0eb8418cef3c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uniapp_login_detection",
  "source_extraction_id": "bc973aaddf1c4fad9ff7fc1f53fa89a1",
  "version": 1,
  "memory_type": "entities"
}
-->