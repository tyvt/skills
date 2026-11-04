- 全局样式 `index.scss:265` 定义了 `flex-direction: column-reverse` 以将按钮组定位在顶部；在 `autonomy/general/detail.vue` 中，当 `bizState=='2'` 时，两个兄弟 `el-row` 被反转，导致基本信息下沉到末尾。
- 已应用的修复：调整 `detail.vue` 中的模板结构，以避免反转的副作用。
- 涉及的文件：zhi2-web-admin/src/views/autonomy/general/detail.vue, src/styles/index.scss, autonomy/general/components/DecisionRangeTable.vue, components/Headline/index.vue, mixins/detailMixins.js, indemnity/leaseOverview/index.vue, autonomy/option/detail.vue, components/OperationBtnGroup/index.vue
- 验证证据: session=workbuddy 4e97a820-f6c5-43ad-913d-4d6436b2148e

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 全局样式 column-reverse 反转详情模块",
  "source_extraction_id": "bd4b0a8c2e31430396eca479ecc7d5f4",
  "version": 1,
  "memory_type": "preferences"
}
-->
