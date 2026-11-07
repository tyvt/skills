# 委托代售接口与表单间缺失字段映射函数
苏州市房地产监测V3 委托代售新增/详情接口字段与表单结构不一致，缺乏转换层导致数据错乱。

## 问题根因
- 委托代售新增/详情接口字段与表单结构不一致
- 缺乏接口与表单之间的字段转换层

## 修复方案
- detail.vue 新增 mapProjectOption、mapAgencyOption、normalizeDetail、buildSavePayload 等映射函数
- 调整 getForm()、detailCallback、createForm 调用以接入映射

## 涉及文件
- 委托代售-前端对接文档、presale/entrustSale/detail.vue、index.vue
- EntrustBuildingTable.vue、EntrustSaleAddAppendix.vue
- mixins/detailMixins.js、form.js、e2e/presale/entrust-sale-real-api-flow.spec.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/131.md
- 来源会话：0c82c47e-a307-43e4-a68f-3eaae32f3c3d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_mapping",
  "source_extraction_id": "d59ddbfaa7294cb29f8936825d8b0a16",
  "version": 1,
  "memory_type": "entities"
}
-->