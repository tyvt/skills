# 资产明细值区域嵌套与断行修复
园区物管2.0 修复资产明细弹窗中因非法嵌套与断行导致的展示错乱问题。

## 问题根因
- `dict-tag` 组件根节点为 `<div>`，外层使用 `<span class="asset-detail-top__value">`，块级 div 放入 span 导致浏览器自动拆标签、DOM 重排，flex 中「标签+值」不再成对，右侧列被挤窄。
- `word-break: break-all` 在极窄列中任意位置断行，房屋编号、日期等短字符串被拆碎、逐字换行。

## 解决方案
- 值区域由 `<span>` 改为 `<div>`，与 `dict-tag` 块级根节点合法嵌套，flex 布局恢复正常。
- 网格列改为 `minmax(0, 1fr)`，避免 grid 子项按最小内容宽度撑死列。
- `.asset-detail-top__info-item` 加 `min-width: 0`，保证在 grid/flex 中正常收缩。
- 值的 `word-break: break-all` 改为更合理的断行方式。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/HouseAssetDialog.vue、VenueAssetDialog.vue、ParkingAssetDialog.vue、AdvertiseAssetDialog.vue、AssetLeaseInfoTable.vue
- 所属项目：园区物管2.0；来源会话：f8f12066-4a2e-407f-8919-3b1feebdc139；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "asset_detail_nesting_fix",
  "source_extraction_id": "33c6d2042a9d403098535653cf9a2ce6",
  "version": 1,
  "memory_type": "entities"
}
-->