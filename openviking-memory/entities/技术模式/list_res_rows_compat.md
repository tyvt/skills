# 列表接口返回结构兼容 res.rows 与 res.data
同一类后台列表接口部分返回 res.rows 部分返回 res.data，前端取列表需统一兜底避免整页空白。

## 问题背景
- 同类后台列表接口返回字段不统一，有的用 res.rows 有的用 res.data
- 某接口无数据时若只取单一字段会导致整页空白

## 解决方案
- 取列表统一用 res.rows || res.data 兜底
- v2 接口路径注意带前导 /，例如 /v2.0/benefit/pubParkingChargeStandard/page

## 验证与归属
- 验证：004.md 会话中车位清册接口返回兼容 res.rows||res.data，并对齐 /v2.0 前缀
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话ID：004-rows
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_res_rows_compat",
  "source_extraction_id": "da4bc13626ae49b984d5097a7818c176",
  "version": 1,
  "memory_type": "entities"
}
-->