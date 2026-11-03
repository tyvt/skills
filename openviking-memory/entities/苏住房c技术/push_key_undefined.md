# 小程序列表逐条push加:key=index致item undefined崩溃
苏住房C小程序新房详情页因接口返回后逐条push图片且轮播用:key="index"，渲染时item变undefined报fileSite of undefined。

## 问题现象与根因
- 新房详情页报TypeError: Cannot read property 'fileSite' of undefined，堆栈落在swiperComponent.js的_sfc_render渲染阶段
- 详情页在接口返回后逐条push图片到allImg，视频插到allList最前，每次push触发重渲染，小程序真实渲染中间半成品状态
- 轮播用:key="index"，头部插入视频后索引整体后移复用上一帧key，取到undefined item读fileSite崩；排查入口应是数据一次性赋值+key稳定

## 解决方案
- 数据侧改一次性赋值this.allImg = mediaList消除中间态
- swiperComponent模板改用可选链item?.fileSite，allList加filter过滤无效项，:key改item.fileSite||index稳定键
- 兜住tabChange切「图集」时currentSlide越界、getVideoType入参空值；父组件显式传:detailData="detailData"
- 同一改动同步pages/commonNew/swiperComponent.vue与pages_transaction下两份副本

## 验证与归属
- 验证：会话db12bfb7用户贴weapp:///components/commonNew/swiperComponent.js:212:61完整堆栈；结论detail.vue逐条push+视频插前使索引偏移叠加:key=index致item undefined；修复为一次性赋值、可选链、filter、稳定key、越界空判
- 涉及文件：src/components/commonNew/swiperComponent.vue、src/pages/commonNew/swiperComponent.vue、src/pages_transaction/newHouse/detail.vue、src/pages_transaction/stockHouse/detail.vue
- 所属项目：苏住房C；来源会话ID：db12bfb7-5b5d-404f-93cd-258941957c3c；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "push_key_undefined",
  "source_extraction_id": "3ba05a2df0ba496eb9f6fc33290d5132",
  "version": 1,
  "memory_type": "entities"
}
-->