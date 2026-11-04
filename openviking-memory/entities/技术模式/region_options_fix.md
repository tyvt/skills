# 组件与 mixin 中 computed regionOptions 的冲突
组件 `AgencyEntryNetworkDetail.vue` 通过 `detailMixins` 混入了 `area.js`，后者已拥有 computed `regionOptions`，且组件的 `data` 定义了同名属性，触发了 Vue2 警告。

## 问题根因
- `detailMixins` 引入了含 computed `regionOptions` 的 `area.js`
- `AgencyEntryNetworkDetail.vue` 在 `data` 中定义了 `regionOptions`，导致冲突和 Vue2 警告

## 解决方案
- 重命名为 `administrativeRegionOptions`，参考了 `AgencyBasicInfoDetail.vue`
- 在 `data`、`initDict` 和模板 `:region-options` 中同步了 `AgencyEntryNetworkDetail.vue` 和 `AgencyEntryNetworkAdminDetail.vue`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/113.md
- 涉及文件: AgencyEntryNetworkDetail.vue, detailMixins.js (area.js), AgencyEntryNetworkAdminDetail.vue, AgencyBasicInfoDetail.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 5bc132a2-9d67-4e01-bb16-34e9f3a56c64; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_options_fix",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->