# 首页无法上下滚动修复
苏住房C小程序首页因 `disableScroll: true` 且缺少高度限制导致无法滚动，已通过增加 `page-body` 包裹层修复。

## 问题根因
- 首页 `home.vue` 使用 `disableScroll: true`，滚动依赖内部 `scroll-view`
- 未像「掌服务」页用 `page-body` 限制高度，导致 `scroll-view` 被内容撑满视口，看似不能拖动

## 修复内容
- `home.vue` 增加 `page-body` 包裹层，设 `flex: 1; min-height: 0; overflow: hidden` 固定内容区高度
- `Home_Suzhufang.vue` 将 `.szf-scroll` 改为 `flex: 1; height: 0; min-height: 0`，与掌服务页一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`home.vue`、`Home_Suzhufang.vue`、`pages.json`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：74c14a7b-0504-4015-b6d9-6f7ee91882e7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "home_scroll_fix",
  "source_extraction_id": "b1410b6d519f499da0178d453601d9b1",
  "version": 1,
  "memory_type": "entities"
}
-->