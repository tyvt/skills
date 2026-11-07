# 小程序首页热门活动与APP一致性修复
苏住房C小程序首页「热门活动」轮播图与APP显示不一致，已修复数据源与字段映射问题。

## 问题根因
- 数据源优先级错误：小程序优先用 app.suzhufang.config 的 homeBanner（发布房源横幅），APP 实际用 /system/banner/page?bannerType=1 轮播图接口（房产超市等）
- 字段映射缺失：轮播图接口返回 pictureUrl、linkUrl、jumpConfiguration，但 pickBannerImg 未识别 pictureUrl 导致回退错误默认图

## 修复内容
- 热门活动优先走轮播图接口（bannerType=1），与APP一致
- 补充 pictureUrl 等字段映射
- homeBanner 配置仅作接口失败时的兜底
- 统一 normalizeBannerItem，映射 linkUrl→url、jumpConfiguration→level

## 涉及文件与归属
- 涉及文件：app.suzhufang.config、Home_Suzhufang.vue、home.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：5b209d2f-cd82-4005-8b65-1e07b8e31017；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "hotactivity_banner_fix",
  "source_extraction_id": "7abc9171dfa941c6b2fe9174722cd6ca",
  "version": 1,
  "memory_type": "entities"
}
-->
