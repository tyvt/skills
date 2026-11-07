# 巡检记录add页背景灰底修复
泰兴小程序巡检记录 `add` 页背景应为灰色 `#f7f7f7`，因 scoped 样式未生效导致露白，已修复。
## 问题根因
- `page { background: #f7f7f7 }` 写在 scoped 样式里，微信小程序不会应用到页面根节点，背景仍为全局默认白色。
## 解决方案
- `add.vue`：将 `page` 背景移到非 scoped 样式块（与 `detail.vue` 一致），并为 `.add-record-page` 增加 `min-height: 100vh` 和 `background: #f7f7f7`。
- `pages.json`：为 `record/add` 增加 `"backgroundColor": "#f7f7f7"`，下拉/切换时不露白。
## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages_facility/record/add.vue、detail.vue、src/pages.json
- 来源会话ID：7fb6aec0-5b23-4dcc-b12b-ba50b64b55e9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_form_bg_fix",
  "source_extraction_id": "77ba704f1a8144e49c493206d2246a53",
  "version": 1,
  "memory_type": "entities"
}
-->