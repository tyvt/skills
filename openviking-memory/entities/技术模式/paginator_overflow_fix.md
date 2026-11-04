# paginator_overflow_fix
房产对话框左侧的分页原本采用包含 sizes 和所有页面的布局，导致宽度溢出。

## 问题根因
- 房产对话框中的分页使用了包含 sizes 和完整页面的布局，导致宽度溢出

## 解决方案
- 将布局改为 prev, pager, next, jumper，移除每页条目的下拉框
- 保持 Element UI 的 pager-count="5"，以便在超过 5 页时折叠以减少宽度
- 固定每页 10 条

## 涉及的文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/houseTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/unit/components/BuildingTableDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/unit/components/HouseScopeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/unitTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/HouseScopeDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-pagination/zs-pagination.vue

## 验证
- 验证证据: src=园区公共收益/021.md
- 源会话: f087205d-f215-464e-b55c-d86410257745; 代码库: none
- 所属项目: 园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "paginator_overflow_fix",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "entities"
}
-->