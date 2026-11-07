# 苏住房G 首页入口与页面结构
苏住房G 项目 zhi2-web-admin 首页路由入口与版本分流结构的技术笔记。

## 路由入口
- 主路由在 src/router/index.js，路径 /index，组件为 index-wrapper.vue
- 路由配置：{ path: 'index', component: () => import('@/views/home/index-wrapper.vue'), name: '首页', meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true } }

## 关键文件
- 路由入口：src/router/index.js
- 版本分流：src/views/home/index-wrapper.vue
- G 端新版首页（默认）：src/views/home/index.vue

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话ID：cbcdc94a-e7c1-45b6-9945-446f231f8b3a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "home_index_structure",
  "source_extraction_id": "6c1f939346714376a840e7687a9737f5",
  "version": 1,
  "memory_type": "entities"
}
-->