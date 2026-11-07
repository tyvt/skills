# 业主端子页面间距修复
苏住房C 业主端「我有话说」与「我要报修」两个子页面存在网格/列表间距不均问题，已按原版固定高度与内边距修复。

## 问题根因
- 「我有话说」卡片使用 `min-height`，同行左右高度不同时网格撑高留白
- 「我要报修」列表间距未对齐原版布局

## 修复要点
- `category-feedback.vue`：`li` 固定高度 `176rpx`，卡片 `height:100%`，标题 `-webkit-line-clamp:2`，页面内边距 `24rpx 0`，列表 `padding:0 24rpx`
- `category-repair.vue`：`li` 与卡片固定高度 `192rpx`，列表内边距 `0 24rpx`，卡片间距 `gap:24rpx`
- 若仍见旧合并页需重新编译或清缓存

## 涉及文件
- `category-feedback.vue`
- `category-repair.vue`
- `add.vue`（旧合并页）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：f240ab83-5e55-4643-91c8-a291d7ec92fd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subpage_spacing_fix",
  "source_extraction_id": "613eaf05d69d4f6fb7772b66d4276670",
  "version": 1,
  "memory_type": "entities"
}
-->