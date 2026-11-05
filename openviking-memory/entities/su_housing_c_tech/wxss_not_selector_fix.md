# WXSS不支持:not()伪类选择器修复
苏住房C微信小程序因在WXSS中使用`:not()`伪类选择器导致编译报错，已替换为显式类名选择器修复。

## 问题根因
- 微信小程序WXSS不支持`:not()`伪类选择器
- 三个报错文件含`> :not(.page-bg)`写法，用于让PageBg背景图下方内容保持在上层
- `uni.scss`全局样式含`.page:not(.page-wrapper)`，被各页面打包进wxss

## 修复方案
- `TypeChoose_Suzhufang.vue`：`> :not(.page-bg)`改为`.type-text, .title_card_container`
- `house/index.vue`：`> :not(.page-bg)`改为`.top-empty .button`
- `tenant/index.vue`：`> :not(.page-bg)`改为`.top-empty .search-container, .project, .button`
- `uni.scss`：`.page:not(.page-wrapper)`改为`.page`

## 涉及文件
- TypeChoose_Suzhufang.vue
- house/index.vue
- tenant/index.vue
- uni.scss

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：7482cc2e-dca0-4d98-8721-da0bc1b7dffd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "wxss_not_selector_fix",
  "source_extraction_id": "8ed8cc7c612c4cff9097a608de758469",
  "version": 1,
  "memory_type": "entities"
}
-->