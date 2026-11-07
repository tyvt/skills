# 首页 banner 数据映射错误
小程序 Su Zhu Fang C 曾优先使用本地配置 homeBanner，且 pickBannerImg 未识别 pictureUrl 等字段；已在 Home_Suzhufang.vue 中统一映射。

## 问题根因
- 小程序曾优先使用 `app.suzhufang.config` `homeBanner` 而非 APP 的接口 `/system/banner/page?bannerType=1`
- `pickBannerImg` 未识别诸如 `pictureUrl` 等字段

## 解决方案
- 在 `Home_Suzhufang.vue` 中优先使用轮播接口
- 补充 `pictureUrl` 映射，统一 `normalizeBannerItem` 映射 `linkUrl`→`url`, `jumpConfiguration`→`level`
- `homeBanner` 作为兜底

## 验证
- 验证证据: cursor 会话 5b209d2f-cd82-4005-8b65-1e07b8e31017
- 涉及文件: pages/index/home.vue, Home_Suzhufang.vue (多个路径), store/menu.js, menus.fallback.json, HotAppsHome.vue, MidModuleGrid.vue, api/system.js
- 所属项目: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：5b209d2f-cd82-4005-8b65-1e07b8e31017


<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "home_banner_mapping_error",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->
