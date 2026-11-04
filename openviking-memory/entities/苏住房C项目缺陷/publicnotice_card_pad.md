# 带有上内边距的分类卡片导致标题无法居中
在 Su Housing C 项目中，仅设置了上内边距的“双曝光”分类卡片导致标题未居中。

## 问题根因
- 卡片仅定义了上内边距，并将标题和箭头垂直堆叠
- 标题无法相对于卡片高度居中

## 修复
- 在 pages_main/publicNotice/index.vue 中使用 flex 与对称 padding 32rpx top/bottom
- 左侧固定 128rpx 高度，标题 align-items:center，箭头 absolute 定位左下角

## 涉及的文件
- src/pages_main/publicNotice/index.vue
- src/pages_main/publicNotice/publicNotice.vue
- src/pages_main/publicNotice/components/ListIndex.vue
- src/pages/publicNotice/index.vue
- src/pages/publicNotice/publicNotice.vue
- src/pages/publicNotice/components/ListIndex.vue
- src/pages.json

## 验证
- 验证证据: extracted source=cursor session=0ec624e9-b4c9-406a-8cb8-9a62616cca2e
- 所属项目: Su Housing C (zhi2-mobile-shimin); 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicnotice_card_pad",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->