# 因子表边框和禁用表单导致的按钮失效
具有 border 属性的子表显示垂直线条，并且当放置在禁用的 zs-form 中时，福利弹窗中的按钮失效。

## 描述
- 带有 border 的子表组件产生了可视的垂直分隔线。
- 未与 subVenueDialog 对齐的弹窗导致过多的空白空间。
- 位于禁用的 zs-form 中的子表触发了 fieldset disabled，使按钮失效。

## 解决方案
- 从 subOtherTable 及类似组件中移除了 border。
- subOtherDialog 等使用 mini/medium 尺寸配合 fullRowLayout 和 el-row。
- 将子表移到 zs-form 外部，并替换为 el-button。

## 文件
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subOtherDialog.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subOtherTable.vue
- zhi2-web-admin/src/mixins/dialogMixins.js
- zhi2-web-admin/src/mixins/form.js
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/detail.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueTable.vue

## 关系
- 会话来源: 92e30909-1160-4e65-bfae-414e923ee760 (cursor)
- 所属项目: 产品 2.0 (zhi2-web-admin)

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：92e30909-1160-4e65-bfae-414e923ee760


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_border_button_fail",
  "source_extraction_id": "3ed2caa86cad46b99e3c76309691f9f6",
  "version": 1,
  "memory_type": "entities"
}
-->
