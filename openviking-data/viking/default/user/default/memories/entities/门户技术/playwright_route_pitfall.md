# Playwright 路由通配符误拦 Vite 模块
门户 e2e 在 Vite dev 下注册 Playwright page.route mock 时，宽泛 glob 会误拦源码模块请求。

## 问题现象
- catch-all 模式如 **/api/** 会匹配并拦截浏览器对 /src/api/*.js 源码模块的请求（路径含 api 子串），导致页面白屏或接口层未加载。

## 修复做法
- 应收窄 route glob 到真实后端前缀，如 /api/v3.0/portal/**。
- 记住后注册 route 优先生效，避免用过于宽泛的 API 通配。

## 涉及文件与归属
- 涉及：tests/e2e/portal-home-visual.spec.ts、playwright.config.ts
- 所属项目：门户；代码基线：a1e5beb；来源会话ID：ca2d1b01-7b20-4144-be0e-885935ebf70b

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "playwright_route_pitfall",
  "source_extraction_id": "ce4e2c50b9cb44edafa7d13db96fe90c",
  "version": 1,
  "memory_type": "entities"
}
-->