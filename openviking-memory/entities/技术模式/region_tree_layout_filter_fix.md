# 平铺/树状展示筛选不同步修复
产品2.0 的 zhi2-web-admin 修复切换平铺与树状展示时列表筛选条件未同步的问题。

## 根因
- 切到平铺：`syncListParentDeptFilter` 清除 `parentDeptId` 并刷新列表
- 切回树状：树重置到第一级，但平铺模式设置的 `region`、`subdistrict`、`community` 等条件仍留在 `queryParams`
- `handleTreeReady` 设置 `parentDeptId` 并调用 `getList()`，旧行政区域筛选仍生效

## 修复方案
- 在 `syncListParentDeptFilter` 中，切回树状时清除平铺专用筛选字段（`region`、`subdistrict`、`community`、`address`、`startDate`、`endDate`）
- 再由 `handleTreeReady` 按树默认节点（第一级）刷新列表

## 涉及文件
- `src/views/property/complex/components/RegionTreeLayout.vue`
- `src/views/property/complex/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：47d34879-47c4-4fc8-beb8-6a3e1375d999；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_layout_filter_fix",
  "source_extraction_id": "adcae344ee4b4720a5c42b11e5cf062c",
  "version": 1,
  "memory_type": "entities"
}
-->