# 首页disableScroll未限高致scroll-view滚动失败
苏住房C 小程序首页home.vue设disableScroll:true依赖内部scroll-view，但未用page-body限制高度致其撑满视口无法滚动，需加包裹层并修正滚动容器高度。
## 现象与根因
- home.vue 设 `disableScroll: true` 依赖页面内 scroll-view 滚动，但缺少 page-body 限制高度
- 未限高时 scroll-view 撑满视口，内部内容无法滚动
- 多页（community.vue、project.vue 等）共用首页滚动结构，受影响面广
## 解决方案
- home.vue 增加 `page-body` 包裹层，设 `flex:1; min-height:0; overflow:hidden`
- Home_Suzhufang.vue 的 `.szf-scroll` 改为 `flex:1; height:0; min-height:0` 以正确撑开滚动区
- 同步核对 AppTabBar.vue、Community_Suzhufang.vue 等共用结构
## 验证与归属
- 验证证据：src=苏住房C/066.md；加 page-body 包裹并修正 .szf-scroll 高度后滚动恢复
- 涉及文件：pages.json、home.vue、Home_Suzhufang.vue、AppTabBar.vue、community.vue、project.vue、Community_Suzhufang.vue、uni.scss
- 所属项目：苏住房C；来源会话ID：74c14a7b-0504-4015-b6d9-6f7ee91882e7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "home_scroll_fail",
  "source_extraction_id": "b1017c16efbe49578723df1f2aed4396",
  "version": 1,
  "memory_type": "entities"
}
-->