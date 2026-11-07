# 行业资讯页tab竖排修复
苏住房C「行业资讯」页tab因flex收缩与换行导致竖排，已通过flex-shrink与white-space修复。
## 问题根因
- `pages_main/news/index.vue` 区域tab用 `display: flex`，但 `li` 未禁止收缩
- tab较多时被压窄，中文在 `word-break: keep-all` 下逐字换行出现竖排
## 修复内容
- `li` 加 `flex-shrink: 0` 避免压缩
- 加 `white-space: nowrap` 保证文字横向一行
- 去掉多余 `word-break: keep-all`
- `ul` 重置 `margin: 0`
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译后tab应横向显示「市住建」「张家港市」等并可左右滑动
- 涉及文件：pages_main/news/index.vue、pages/news/index.vue、ListIndex.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：9bedfd55-6428-4419-b1a7-8396206c9412；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "news_tab_fix",
  "source_extraction_id": "92d5861c1a484f0989ce3fb58fc3482b",
  "version": 1,
  "memory_type": "entities"
}
-->