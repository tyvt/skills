# 报废记录图标消失因未设flex-shrink防挤
物业手持B端报废记录页因 .address-box 未用 flex 且图标无 flex-shrink，长文本挤压致图标消失。

## 问题根因
- 根因：`src/pages_facility/record/addScrap.vue` 中 `.address-box` 未用 flex 且图标无 `flex-shrink`，长文本挤压致图标消失

## 解决方案
- `.address-box` 改 `display:flex; gap:12rpx`
- `:deep(.address-img/.icon-address)` 设 `40rpx` 与 `flex-shrink:0`
- 文本区加 `flex:1; min-width:0`

## 验证与归属
- 验证证据：src=物业手持B端/002.md
- 涉及文件：src/pages_facility/record/addScrap.vue、src/components/ZsImage/ZsImage.vue、src/pages_facility/record/add.vue、src/pages_facility/record/index.vue、src/pages/workbench/index.vue、src/components/ZsDialog/ZsDialog.vue、src/pages_facility/facility/index.vue、src/pages_facility/repair/submit.vue
- 来源会话ID：be2f7a12-9ddb-4fb6-9c2d-69d56e0b5c96
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrap_icon_missing",
  "source_extraction_id": "b4c8026653be44108193df34322483d4",
  "version": 1,
  "memory_type": "entities"
}
-->