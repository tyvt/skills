# 委托销售中将字段 areaCode 变更为 region
在 Suzhou Real Estate Monitoring V3 项目中，后端 API 字段 `areaCode` 变更为 `region`；前端已同步。

## 原因
- 后端接口将 `areaCode` 改为 `region`

## 解决方案
- `detail.vue` 中的 `normalizeDetail` 仅读取 `data.region`；`buildSavePayload` 发送 `region`
- `entrust-sale-helpers.js` 中的 E2E 断言将字段改为 `region`
- 没有全局的 `areaCode` 引用

## 验证
- 验证证据: src=苏州市房地产监测V3/239.md
- 涉及文件: presale/entrustSale/detail.vue, presale/entrustSale/index.vue, e2e/fixtures/entrust-sale-helpers.js, mixins/detailMixins.js, e2e/presale/entrust-sale-real-api-flow.spec.js, mixins/form.js
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 74428e0b-126e-4f90-9fc3-2fbe6b27a399; Base: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：74428e0b-126e-4f90-9fc3-2fbe6b27a399


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "area_code_region",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 1,
  "memory_type": "entities"
}
-->
