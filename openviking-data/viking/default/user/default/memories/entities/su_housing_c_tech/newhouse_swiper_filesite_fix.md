# 新房详情页轮播空值报错修复
苏住房C新房详情页（detail.vue、swiperComponent.vue）因轮播数据空值保护缺失导致`Cannot read property 'fileSite' of undefined`，已修复。

## 问题原因
- `swiperComponent`渲染时对`item.fileSite`未做空值保护
- `detail.vue`逐条push图片数据引发多次重算重渲染，`:key="index"`不稳定致微信小程序下item为undefined

## 修复方案
- `swiperComponent.vue`模板改`item?.fileSite`，`allList`增加`filter`，`:key`改`item.fileSite || index`，修正`tabChange`越界，`getVideoType`加空值判断
- `detail.vue`图片/视频数据改为一次性赋值`this.allImg = mediaList`，避免多次push中间态

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：detail.vue、swiperComponent.vue等
- 来源会话ID：db12bfb7-5b5d-404f-93cd-258941957c3c

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_swiper_filesite_fix",
  "source_extraction_id": "7eca3a8230794a36a6dc360689fe3cb5",
  "version": 1,
  "memory_type": "entities"
}
-->