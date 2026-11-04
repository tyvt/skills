# 首页路由循环依赖致启动报错
太仓一网通办H5 中 router/index.ts 静态引入 HomePage，HomePage.vue 又引入 router，循环依赖触发 Cannot access 'HomePage' before initialization。

## 问题根因
- router/index.ts 静态引入 HomePage
- HomePage.vue 模块顶层 import router，两边互相等待初始化
- 触发 Cannot access 'HomePage' before initialization 启动报错

## 修复方案
- HomePage.vue 改用 useRouter()，不在模块顶层 import router
- router/index.ts 首页改为懒加载 () => import('../views/HomePage.vue')

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：router/index.ts、HomePage.vue
- 所属项目：太仓一网通办H5；来源会话：e08bc29b-be15-400b-9854-8a9070c29daa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "homepage_router_circular_dep",
  "source_extraction_id": "7be04939e3014bdabe23804ada6a4c43",
  "version": 1,
  "memory_type": "entities"
}
-->