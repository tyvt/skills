# 管理端板块名兼容hash路由双来源解析
门户已带portalCategory到管理端却读不到，根因是hash路由参数可能在search或hash query，且app.js在模块import期就解析，须双来源解析并在首屏URL读到。

## 问题根因
- 管理端是hash路由（vue-router 3默认mode='hash'），参数既可能在location.search也可能在hash query段，只读search会漏
- store/modules/app.js在模块import期就执行resolvePortalCategory()，早于main.js函数体，必须在首屏URL读到的参数
- 旧规则「URL带token但不带portalCategory就removeItem清空sessionStorage」会冲掉已有效板块上下文；统一登录/网关302或location.replace(origin+pathname)丢search+hash后只能靠sessionStorage兜底

## 解决方案
- 新增src/utils/portalCategory.js：search与hash query双来源解析，显式空值=清除，URL未携带则沿用上下文，持久化sessionStorage(+localStorage)
- app.js去掉带token无板块就清空规则，新增SET_PORTAL_CATEGORY/setPortalCategory/refreshPortalCategory
- main.js与router/index.js的token解析兼容hash query，跳登录页带板块，afterEach按URL同步
- 整页刷新丢参固定清单：Navbar.vue的location.replace(origin+pathname)、api/index.js的location.href='/login'（401/登出）、version-check.js的reload、permission.js的reload——这四处丢URL参数；全流程无sessionStorage.clear()，sessionStorage是唯一跨整页跳转保住板块的位置
- 补src/utils/portalCategory.test.mjs自测（门户8组/管理端7组断言全绿），Navbar标题渲染成「平台名称（板块）」

## 验证与归属
- 验证会话：session-eb30f683-df51-4286-8b54-7cbdea56c804（基线65275e9），v3-audit审查列出app.js import期执行、四处整页刷新丢参；子代理结论给出双来源解析、去掉清空规则、afterEach同步与7组自测全绿
- 涉及文件：zhi2-web-admin/src/utils/portalCategory.js、zhi2-web-admin/src/store/modules/app.js、zhi2-web-admin/src/router/index.js、zhi2-web-admin/src/main.js、zhi2-web-admin/src/layout/components/Navbar.vue
- 所属项目：zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "admin_category_resolve",
  "source_extraction_id": "35a40b74c09b4248958c07f3ca6c79bd",
  "version": 1,
  "memory_type": "entities"
}
-->