# 楼幢详情房屋分页移除固定bizState
houseTable.vue 的分页查询原本固定携带 bizState:'2'，导致仅查已备案房屋，需移除该字段。

## 问题根因
- houseTable.vue 的 queryParams 固定携带 bizState:'2'
- 经 subTableMixins/table.js 的 getList 传入 GET /building/house/page 仅查询已备案房屋

## 解决方案
- 移除 queryParams 中的 bizState 字段
- 分页请求仅保留 pageNum、pageSize、buildingId 及有单元时的 unitId
- detail.vue 楼盘表弹窗与 HouseDialog 等其它调用维持原状

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/100.md
- 涉及文件：buildinginfo/detail.vue、buildinginfo/components/HouseDialog.vue、houseinfo/detail.vue、buildinginfo/components/houseTable.vue、mixins/subTableMixins.js、mixins/table.js
- 所属项目：苏州市房地产监测V3；来源会话：9a1689ee-8f4c-466c-8de7-f10950b6c863；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_table_bizstate",
  "source_extraction_id": "2136db77eeb545a3bfb5c7faab73e6ab",
  "version": 1,
  "memory_type": "entities"
}
-->