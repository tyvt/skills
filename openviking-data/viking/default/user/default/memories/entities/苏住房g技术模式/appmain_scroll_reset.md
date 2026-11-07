# 跳新页面后内容停在中部：滚动容器是 #app-main 而非 window，scrollBehavior 对它完全无效
从「物业管理区域查询」详情页进入子页面时新页面从中段显示，根因是 SPA 实际滚动发生在 #app-main 而非 window，router 的 scrollBehavior 对其无效。

## 问题根因
- 项目 router 已配 scrollBehavior: () => ({x:0, y:0})，但 Vue 中 #app-main 带 overflow-y: auto，window 几乎不滚
- vue-router 的 scrollBehavior 只处理 window 滚动，对 #app-main 内部滚动容器无效，跨路由保留 scrollTop

## 解决方案
- 在 router/index.js 的 afterEach 守卫显式重置滚动：定义 resetPageScroll()（getElementById('app-main') 置 scrollTop=0，同时 window.scrollTo(0,0) 兜底）
- 必须包在 Vue.nextTick 里执行，等新页面 DOM 渲染完成后再置零，否则设置被后续渲染顶掉
- 一处改动对所有路由跳转生效，同类布局（#app-main / #app-content 类内部滚动容器）适用同一套路

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 a1789e06 用户反馈跳转新页面滚动位置问题需全局修改；结论给出根因及 afterEach + Vue.nextTick 的 resetPageScroll 修复代码
- 涉及文件：src/router/index.js、src/layout/components/AppMain.vue、src/views/publicQuery/complex/index.vue、src/views/publicQuery/complex/components/propertyContractTable.vue
- 所属项目：苏住房G；来源会话ID：a1789e06-01db-41b3-b240-eb61d9addf8b；代码基线：e590ffa

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术模式",
  "name": "appmain_scroll_reset",
  "source_extraction_id": "fc9114db6f08406fa42b32567924ccee",
  "version": 1,
  "memory_type": "entities"
}
-->