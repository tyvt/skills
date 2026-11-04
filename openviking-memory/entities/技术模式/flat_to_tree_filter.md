# 平铺切树状未清筛选字段致列表不同步
切换树状展示时 `syncListParentDeptFilter` 未清除 `queryParams` 中平铺筛选字段，导致 `handleTreeReady` 调用 `getList()` 时旧行政区域筛选生效、列表不同步。

## 问题根因
- 切换树状展示时 `RegionTreeLayout.vue` 的 `syncListParentDeptFilter` 未清除 `queryParams` 中平铺筛选字段（`region`、`subdistrict`、`community` 等）
- `handleTreeReady` 调用 `getList()` 时旧行政区域筛选仍生效，列表与树状视角不同步

## 解决方案
- 在 `RegionTreeLayout.vue` 的 `syncListParentDeptFilter` 中切回树状时清除平铺字段
- 交由 `handleTreeReady` 按树默认节点刷新列表

## 验证与归属
- 验证证据：src=产品2.0/077.md
- 涉及文件：property/complex/components/RegionTreeLayout.vue、property/complex/index.vue、regionTree.vue、mixins/listMixins.js、mixins/table.js、property/complexChange/index.vue
- 所属项目：园区物管2.0；来源会话：47d34879-47c4-4fc8-beb8-6a3e1375d999；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flat_to_tree_filter",
  "source_extraction_id": "cf643038b5164e918e636fbbab3a205f",
  "version": 1,
  "memory_type": "entities"
}
-->