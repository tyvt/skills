# 业主房屋详情页 UI 紊乱修复
苏住房C 小程序 `pages_owner/house/detail.vue` 因 flex 布局导致卡片错位、按钮压缩，已修复。

## 问题原因
- `.house-page` 使用 `display:flex` + `align-items:center`，小程序内子组件按内容宽度收缩并居中
- `BaseCard`、`ZsButton` 等未铺满屏幕，出现卡片宽度不一致、左右错位、区块叠在一起
- 「撤销添加」按钮被压成小块

## 修复内容
- 去掉 flex 居中布局，改为与 `housekeeper/detail.vue` 一致的普通块级流式布局
- 统一内边距为 `20rpx`
- 为底部按钮补充 `width:100%`，确保全宽显示

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_owner/house/detail.vue`、`housekeeper/detail.vue`、`baseCard.vue`、`CellCard.vue`、`owner/detail.vue`
- 来源会话ID：a0fa70c1-04b5-4e88-bb03-c924fab3eae3
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "house_detail_ui_fix",
  "source_extraction_id": "9e1222fc5f614dea9c5ae5cd01eb602c",
  "version": 1,
  "memory_type": "entities"
}
-->