# 页面迁分包后旧路由路径残留导致page not found
苏住房C登录页从 pages/login 迁到 pages_main/login 后，多处调用点仍跳旧路径，触发 navigateTo:fail page "pages/login/index" is not found。

## 问题现象
- 小程序报 navigateTo:fail page "pages/login/index" is not found
- 触发点是「未登录时访问任意需要登录的页面」
- 报错只在具体某个入口触发，不易一次发现全部遗漏

## 根因
- 登录页分包迁移时从 pages/login 移到 pages_main/login，pages.json 注册的是 pages_main/login/index
- 登录跳转逻辑散落在 utils 和一堆业务组件里，仍写旧路径 /pages/login/index
- 路由注册改了、调用点没改，必然报 page not found

## 解决方案
- 页面迁移（尤其登录页、tab 页等被到处跳的页面）完成后，必须全仓搜索旧路径字符串并逐处替换
- 本项目的实际漏点清单：src/utils/index.js（未登录跳转）、pages/index/components/My_Suzhufang.vue、components/collectBtn/collectBtn.vue、pages_my/verification/FormLocal.vue 与 FormNonLocal.vue、pages_my/onlineService/ClassDetail.vue 与 OnlineCass.vue、pages_transaction/stockHouse/detail.vue（2处）
- 长期做法：跳转路径统一引用集中常量（如 src/utils 的 PAGES.login / route-map.js），禁止各页面写字面量路径，迁移时只改常量一处

## 验证与归属
- 验证：会话 73f5531d 报错 MiniProgramError navigateTo:fail page "pages/login/index" is not found，定位登录页已迁 pages_main/login/index 但多处代码仍跳旧路径，逐文件替换（utils/index.js 改用 PAGES.login，另 6 个组件/页面共 9 处）
- 涉及文件：src/pages.json、src/utils/index.js、src/utils/route-map.js、src/pages_main/login/index.vue、scripts/migrate-pages-tab.mjs
- 所属项目：苏住房C；来源会话ID：73f5531d-ca8f-4227-9e76-d2fa4b5c98a1；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "route_migration_stale",
  "source_extraction_id": "ff4e295f73a04f89870b32c194302e72",
  "version": 1,
  "memory_type": "entities"
}
-->