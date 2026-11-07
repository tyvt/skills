# Building详情getFloor的mathjs add报错修复
园区公共收益项目中BuildingDetail页面的getFloor方法因mathjs add处理undefined导致Vue warn报错，已通过||0兜底修复。

## 问题根因
- 报错不在AmountInput本身，而在BuildingDetail的@change="getFloor"回调里
- getFloor用mathjs的add计算总层数：add(floorNumberAbove||0, floorNumberUnder||0)
- 当floorNumberAbove或floorNumberUnder为undefined、空字符串时，add无法处理，抛出addScalar类型错误
- 常见场景：新建表单初始值为undefined，或清空输入后触发@change

## 修复方案
- 与UnitDialog.vue一致，对两个操作数使用||0兜底
- 涉及文件：building/building/detail.vue、building/unit/detail.vue、UnitDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益
- 来源会话ID：748fb1f8-e625-4295-9c80-d99233536464
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_getfloor_fix",
  "source_extraction_id": "c62e01cbe3b346e0bca6472ceec35b7b",
  "version": 1,
  "memory_type": "entities"
}
-->