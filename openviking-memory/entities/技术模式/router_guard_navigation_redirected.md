# 登录守卫重定向控制台误报
园区物管2.0 中登录后 permission 守卫内 next(replace) 触发 NavigationRedirected 控制台误报，并非登录失败。

## 现象
- 登录成功 router.push('/') 时控制台出现 "Redirected when going from "/login" to "/index" via a navigation guard"
- 实际登录成功，报错仅为误报

## 根因
- permission 守卫在 roles 为空时拉用户信息并 GenerateRoutes，随后执行 next({ ...to, replace: true }) 用新路由表重进目标页
- Vue Router 3.4+ 将该守卫内重定向记为 NavigationRedirected，push/replace 的 Promise 会 reject
- 若 router/index.js 只忽略 NavigationDuplicated 则未捕获该 reject

## 解决方案
- 在全局 push/replace 的 catch 中同时吞掉 NavigationDuplicated 与 NavigationRedirected

## 验证与归属
- 验证：会话 16b980bb 用户贴登录跳转报错，结论指向 router/index.js 第 179 行 next({ ...to, replace: true })，已增加 NavigationRedirected 忽略
- 涉及文件：zhi2-web-admin/src/router/index.js、zhi2-web-admin/src/views/login.vue
- 所属项目：园区物管2.0；来源会话：16b980bb-0cbc-469a-a6f7-ab1d9680599d；代码基线：fb0e2899f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_guard_navigation_redirected",
  "source_extraction_id": "681170c36c0a48678c1d9fd2cb28823e",
  "version": 1,
  "memory_type": "entities"
}
-->