# 资产部位详情同路由跳转无反应且路由名误判
园区公共收益项目(zhi2-web-admin)中 assetPositionSubTable.vue 部位名称 router.push 至当前 PubHousePartDetail 路由无反应，且操作列隐藏逻辑误判 currentRoute。

## 问题根因
- assetPositionSubTable.vue 中部位名称 router.push 至当前 PubHousePartDetail 路由，Vue Router 同路由不跳转致点击无反应
- 操作列隐藏逻辑误判 currentRoute == 'HousePart' 失效

## 解决方案
- 当前记录部位名称渲染为普通文本（不再可点击跳转）
- 于 PubHousePartDetail 隐藏查看按钮并添加同路由跳转提示

## 涉及文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/housePart/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubHouse/components/pubHouseDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubHouse/components/assetPositionSubTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/main.js
- d:/repository/园区公共收益/zhi2-web-admin/src/mixins/subTableMixins.js
- d:/repository/园区公共收益/zhi2-web-admin/src/utils/ruoyi.js
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubBusinessItem/components/businessItemTable.vue

## 验证与归属
- 验证证据：src=园区公共收益/030.md
- 来源会话ID：b4ffaae4-3716-42a9-af99-762e8ed9a217；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "asset_position_route_nav",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 2,
  "memory_type": "entities"
}
-->