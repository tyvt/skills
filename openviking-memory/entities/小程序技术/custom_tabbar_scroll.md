# 自定义tabBar的Tab页滚动加载失效
苏找房页（pages/index/project）z-paging 滚动到底不加载，根因是自定义 AppTabBar 改写容器结构导致页面级 onReachBottom 触发不到。

## 根因
- 该页用 z-paging 页面滚动模式（use-page-scroll=true）依赖页面级 onReachBottom 转发
- 自定义 tabBar 的 Tab 页高度与滚动容器结构不一致，触底事件常触发不到，非分页参数或接口问题

## 解决方案
- 页面容器改 height:100% + overflow:hidden 的 flex 布局，去掉页面级 onPageScroll/onReachBottom 转发
- 列表组件改 use-page-scroll=false，由 z-paging 内部 scroll-view 监听 scrolltolower 自行加载，补全高度链样式
- pages.json 给该页加 disableScroll:true 避免双重滚动
- 注意 src/pages/index/components 与 src/pages_tab/components 下 Project_Suzhufang.vue 同名副本，确认渲染哪份

## 验证与归属
- 所属项目：苏住房C；来源会话：ab547a32-fb28-436d-b850-9344b46f646a；代码基线：4630e8e
- 涉及文件：pages/index/project.vue、Project_Suzhufang.vue（两处副本）、ZsPaging.vue、useReachBottom.js

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "custom_tabbar_scroll",
  "source_extraction_id": "3b9e083f125d45f880ff8ff4eadaf2e5",
  "version": 1,
  "memory_type": "entities"
}
-->