# display:flex 居中导致小程序中子组件收缩

在项目 苏住房C (zhi2-mobile-shimin) 中，使用居中 flex 的 `.house-page` 使子组件收缩而非填充。

## 问题根因
- `pages_owner/house/detail.vue` 中的 `.house-page` 使用 `display: flex` + `align-items: center`
- 小程序子组件根据内容收缩而不是填充

## 修正
- 改为带有 `20rpx` 内边距的流式块布局
- 为底部按钮设置 `width: 100%`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目: 苏住房C (zhi2-mobile-shimin)
- 来源会话: a0fa70c1-04b5-4e88-bb03-c924fab3eae3
- 涉及文件: src/pages_owner/house/detail.vue, src/components/commonNew/baseCard.vue, src/pages_owner/house/components/CellCard.vue, src/pages_owner/house/owner/detail.vue, src/pages_owner/house/index.vue, src/components/ZsButton/ZsButton.vue, src/pages_owner/house/components/registerInfo.vue, src/pages.json
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_flex_shrink",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->