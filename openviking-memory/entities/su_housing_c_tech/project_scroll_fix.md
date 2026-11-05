# 苏找房页滚动加载修复
苏住房C 修复苏找房(project)Tab页因自定义AppTabBar导致滚动加载更多失效的问题。

## 问题原因
- 该页使用 z-paging 页面滚动模式(use-page-scroll=true)，需页面级 onReachBottom 转发
- 自定义 Tab 页高度/滚动容器与首页不一致，触底事件常触发不到

## 修复方案
- project.vue 改为 height:100%+overflow:hidden flex 布局，去掉 onPageScroll/onReachBottom 转发
- Project_Suzhufang.vue 改 use-page-scroll=false，由内部 scroll-view 监听 scrolltolower；补全高度链样式
- pages.json 为 project 页增加 disableScroll:true，避免双重滚动

## 验证与归属
- 重新编译后列表内滚动到底部自动加载下一页，底部显示 z-paging 状态
- 涉及文件：project.vue、Project_Suzhufang.vue、pages.json、useReachBottom.js、Project_Jiayuanqu.vue
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：ab547a32-fb28-436d-b850-9344b46f646a

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "project_scroll_fix",
  "source_extraction_id": "2d3f203c03d84e25a3c003479966ebf2",
  "version": 1,
  "memory_type": "entities"
}
-->