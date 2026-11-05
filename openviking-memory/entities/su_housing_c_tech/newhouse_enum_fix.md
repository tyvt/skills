# 最新楼盘页type与接口枚举未对齐修复
苏住房C新房「最新楼盘」列表页因页面type直接当作halfYearAgo传给后端，导致查询条件错误返回空数据，已通过增加映射表修复。

## 问题根因
- `indexMore.vue`调用`listRecommendProject`时把URL参数`type`直接当作`halfYearAgo`传给后端
- 在售楼盘type=0→halfYearAgo=0(后端枚举应为1)，最新楼盘type=1→halfYearAgo=1(后端枚举应为2)
- 「最新楼盘」实际按「在售楼盘」条件查询，返回空数据；APP端用正确halfYearAgo=2故有数据
- 源于2025年5月「最新楼盘调整」时页面type与接口枚举未对齐

## 修复方案
- `indexMore.vue`新增映射表`HALF_YEAR_AGO_MAP = { 0: 1, 1: 2 }`，将页面type正确转换为接口参数

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_transaction/newHouse/indexMore.vue、src/api/transaction.js
- 来源会话ID：86696cb3-e77a-4306-8d93-2aa391d79f46

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_enum_fix",
  "source_extraction_id": "32b9912824bb4746851a7d42adfc4d01",
  "version": 1,
  "memory_type": "entities"
}
-->