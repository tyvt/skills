# 委托代售详情缺映射函数致数据不通
苏州市房地产监测V3委托代售详情因缺数据源与表单字段映射，冗余字段未提交且详情被覆盖。

## 问题根因
- detail.vue 缺乏数据源与表单字段映射，导致冗余字段未提交且详情被选项覆盖

## 修复方案
- detail.vue 新增 mapProjectOption、mapAgencyOption、normalizeDetail、buildSavePayload 打通数据流
- 由 getForm 及 detailCallback 调用并提交 8 个冗余字段

## 涉及文件
- 委托代售-前端对接文档(1).md、presale/entrustSale/detail.vue、entrustSale/index.vue
- EntrustBuildingTable.vue、EntrustSaleAddAppendix.vue
- detailMixins.js、entrust-sale-real-api-flow.spec.js、form.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/084.md
- 所属项目：苏州市房地产监测V3；来源会话：0c82c47e-a307-43e4-a68f-3eaae32f3c3d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_detail_map",
  "source_extraction_id": "c9ec89c294bb40ec83fcfcf2a273efec",
  "version": 1,
  "memory_type": "entities"
}
-->