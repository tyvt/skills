# 楼幢详情房屋子表误带 bizState 过滤修复
苏州市房地产监测V3 的楼幢详情「房屋」子表 houseTable.vue 在 queryParams 固定带 bizState:'2'，导致只查已备案房屋，已改为去掉该字段。

## 问题根因
- houseTable.vue 的 queryParams 固定带 bizState: '2'
- subTableMixins / table.js 的 getList 将其传给 GET /building/house/page
- 结果只查已备案房屋，分页不符合预期

## 修复方案
- 去掉 bizState 字段，分页请求仅保留 pageNum、pageSize、buildingId（及有单元时的 unitId）
- 未改动：detail.vue 楼盘表弹窗 getList、HouseDialog 选主房等其它 /building/house/page 调用、选许可证弹窗里的 bizState:'2'（非房屋分页）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：projectManagement/buildinginfo 下 houseTable.vue、table.js、detail.vue、HouseDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：9a1689ee-8f4c-466c-8de7-f10950b6c863


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_table_bizstate_fix",
  "source_extraction_id": "66ee6a2008f240c5a4f96b7c3e61c2fa",
  "version": 1,
  "memory_type": "entities"
}
-->