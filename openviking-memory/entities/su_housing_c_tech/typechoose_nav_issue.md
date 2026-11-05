# 业主房源「前往添加」相对路径跳转失败
苏住房C小程序业主房源页「前往添加」按钮因相对路径写法导致 `navigateTo:fail page "TypeChoose?..." is not found`。

## 问题根因
- 报错来自 `pages_owner/house/index.vue` 中「前往添加」按钮，使用了相对路径 `TypeChoose?unauthorizedHouseNum=${unauthorizedHouseNum}`
- `goto` 内部调用 `normalizeLegacyPageUrl`，对不以 `/` 开头的路径只补一个前导斜杠
- `TypeChoose?...` 被转成 `/TypeChoose?...`，小程序找不到该页面

## 涉及文件与归属
- 涉及文件：src/pages_owner/house/index.vue、src/utils/route-map.js、success.vue、guardApply/step1.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：d7258436-2f74-40b3-a7d1-bb994d1239c1

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "typechoose_nav_issue",
  "source_extraction_id": "aac1b2384e6740f491121840123bb125",
  "version": 1,
  "memory_type": "entities"
}
-->