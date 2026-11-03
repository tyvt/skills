# HomePage与router循环依赖致初始化前报错
太仓一网通办H5 中 router 静态引入 HomePage 与 HomePage 引入 router 造成循环依赖，触发初始化前报错。

## 问题根因
- router/index.ts 静态引入 HomePage
- HomePage.vue 引入 router 造成循环依赖
- 触发 Cannot access 'HomePage' before initialization

## 修复方案
- HomePage.vue 改用 useRouter() 去除顶层 import
- router/index.ts 首页改为懒加载 () => import('../views/HomePage.vue')

## 验证与归属
- 验证证据：src=太仓一网通办H5/001.md
- 涉及文件：d:/repository/太仓一网通办H5/src/views/owner-decision/components/MyDecisionTab.vue、d:/repository/太仓一网通办H5/src/views/decision/common/DecisionResult.vue、d:/repository/太仓一网通办H5/src/views/owner-decision/components/ResultStatisticsTab.vue、d:/repository/太仓一网通办H5/src/store/vote.js、d:/repository/太仓一网通办H5/src/views/owner-decision/OwnerDecisionResult.vue、d:/repository/太仓一网通办H5/src/views/decision/DecisionResult.vue、d:/repository/太仓一网通办H5/src/views/owner-decision/components/OptionStepChoose.vue、d:/repository/太仓一网通办H5/src/views/election/ElectionResult.vue
- 所属项目：太仓一网通办H5；来源会话：e08bc29b-be15-400b-9854-8a9070c29daa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "homepage_router_dep",
  "source_extraction_id": "257d5bae982e4b8e880e6453ec41e8c9",
  "version": 1,
  "memory_type": "entities"
}
-->