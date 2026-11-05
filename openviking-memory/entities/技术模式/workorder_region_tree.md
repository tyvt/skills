# 工单列表页区域树接口切换
产品2.0 工单列表页的区域树已切换为 /system/dept/complexTree 接口，组件支持可配置树接口。

## 改动说明
- `index.vue` 为 `region-tree-layout` 指定 `tree-url="/system/dept/complexTree"` 与 `:tree-params="{}"`（无入参）。
- `RegionTreeLayout.vue` 新增 `treeUrl`、`treeParams` 属性并透传给 `region-tree`。
- `regionTree.vue` 支持可配置树接口；`treeParams` 为空时不传查询参数。

## 兼容与逻辑
- 新接口返回 `id`、`label`、`children` 结构与现有树组件兼容（`label` 已在 `defaultProps` 支持）。
- 节点点击仍通过 `parentDeptId` → `deptId` 筛选工单列表，逻辑不变。

## 涉及文件与来源
- 文件：`src/views/property/workOrder/order/index.vue`、`RegionTreeLayout.vue`、`regionTree.vue` 等（路径前缀 `d:/repository/产品2.0/zhi2-web-admin`）。
- 所属项目：产品2.0；来源会话：ca01e574-0616-48a5-8f5a-4a6bbe304b4b。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_region_tree",
  "source_extraction_id": "d862fbde073b4aeb99df7780c2490c15",
  "version": 1,
  "memory_type": "entities"
}
-->