# 楼栋详情新增单元弹窗重复拉取列表修复
园区公共收益项目(zhi2-web-admin)中，building 详情页 UnitDialog 的 unitTable 在挂载时会重复调用 getList。

## 问题根因
- subTableMixins 的 created → init() → getList() 拉一次列表
- buildingId 的 watch 设置 immediate: true，初始化时再调一次 getList()
- 两处叠加导致首次加载请求两次 listByBuildingId

## 解决方案
- 去掉 buildingId watch 的 immediate: true，首次加载只走 init()
- buildingId 变化时仍由 watch 触发刷新

## 涉及文件
- zhi2-web-admin/src/views/building/building/components/UnitDialog.vue
- zhi2-web-admin/src/views/building/unit/detail.vue
- zhi2-web-admin/src/views/building/building/detail.vue

## 验证与归属
- 所属项目：园区公共收益；来源会话ID：f56f967d-d8bb-4514-b129-333b667ba178

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_table_fix",
  "source_extraction_id": "d29a058ffc4a4d00972767cc35116df4",
  "version": 1,
  "memory_type": "entities"
}
-->