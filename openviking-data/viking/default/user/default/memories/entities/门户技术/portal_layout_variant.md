# 门户首页布局变体解析
门户仓库 zhi2-web-admin（Vue 2.7 + Vite + Element UI）登录后工作台首页按 resolveHomeLayoutVariant 切换三套布局。

## 布局逻辑
- 由 resolveHomeLayoutVariant({ terminalType, isSuperAdmin, bizSectionCodes }) 决定 admin / developer / broker 三套布局。
- 非超管 B 端设计稿无侧栏时配合 hideLayoutChrome 隐藏侧边栏。

## 接口与认证
- 门户接口前缀 /api/v3.0/portal/**（PORTAL_BASE_URL），响应 {code:200, msg, data|rows|total}。
- HTTP 404 静默 reject，其它错误走 showErrorDialog。

## E2E 测试约定
- Playwright 经 sessionStorage 注入 Admin-Token（utils/auth.js）与 Portal-UserId（utils/portalUserContext.js）绕过登录，用 mock 跑 portal-home-visual.spec.ts。
- 设计稿缺图时只留占位、不要自绘素材。

## 涉及文件与归属
- 涉及：homeLayout.js、homeDataMixin.js、index-new.vue、portal-home-visual.spec.ts、auth.js、portalUserContext.js
- 所属项目：门户；代码基线：a1e5beb；来源会话ID：ca2d1b01-7b20-4144-be0e-885935ebf70b

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "portal_layout_variant",
  "source_extraction_id": "ce4e2c50b9cb44edafa7d13db96fe90c",
  "version": 1,
  "memory_type": "entities"
}
-->