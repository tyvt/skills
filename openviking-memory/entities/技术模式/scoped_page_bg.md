# scoped样式不作用于page根节点背景失效
微信小程序 scoped 样式不应用于页面根节点 page，导致背景为默认白色，通过将背景移至非 scoped 块并配置 pages.json 解决。

## 问题根因
- 微信小程序 scoped 样式不应用于页面根节点 `page`，导致背景为默认白色。
- `add.vue` 中 `page` 背景在 scoped 块中无效。

## 解决方案
- `add.vue` 将 `page` 背景移至非 scoped 块并为 `.add-record-page` 添加 `min-height:100vh`。
- `pages.json` 为 `record/add` 设置 `backgroundColor:#f7f7f7`。

## 验证与归属
- 验证证据：src=泰兴小程序/009.md
- 涉及文件：src/staff/pages_facility/record/add.vue、src/pages.json、src/components/ZsPicker/ZsPicker.vue、src/components/ZsDatePicker/ZsDatePicker.vue、src/components/ZsTextarea/ZsTextarea.vue、src/components/ZsBottomPopup/ZsBottomPopup.vue、src/App.vue、src/uni.scss
- 来源会话ID：7fb6aec0-5b23-4dcc-b12b-ba50b64b55e9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scoped_page_bg",
  "source_extraction_id": "4c3a967cfa754abaaf0971d44b2c61e6",
  "version": 1,
  "memory_type": "entities"
}
-->