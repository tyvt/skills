# 搜索框渐变与横幅边距移除
Su Zhu Fang C 首页的 UI 调整：搜索框采用垂直渐变，横幅图片使用 aspectFill 以移除边距，以及无数据时 news-card 不渲染。

## 调整
- 在 `Home_Suzhufang.vue` 中，`.search-strip` 改为 `linear-gradient(180deg,...)` 垂直渐变
- 在 `.banner-img-wrap` 中，图片的 `mode` 改为 `aspectFill` 以移除边距，移除灰色背景，添加 `line-height:0`
- 无数据时，不渲染 `news-card` 以避免空白块

## 涉及文件
- pages.json, pages/index/home.vue, Home_Suzhufang.vue (多个路径), OnlineServiceGrid.vue, HotAppsHome.vue, MidModuleGrid.vue, AppTabBar.vue

## 验证
- 验证证据: cursor 会话 f12bdce7-635e-42f0-b034-e806a17e8c7e
- 所属项目: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：f12bdce7-635e-42f0-b034-e806a17e8c7e


<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "home_search_gradient_banner",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->
