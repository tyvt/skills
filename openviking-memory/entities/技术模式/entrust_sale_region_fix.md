# 委托销售接口将参数 areaCode 改为 region
在 Suzhou Real Estate Monitoring V3 项目中，后端在委托销售接口中将输入字段和详情返回字段从 areaCode 改为 region；前端未对齐。

## 问题根因
- 后端将新增/编辑参数和详情返回字段从 `areaCode` 改为 `region`
- 前端未对齐导致不一致

## 解决方案
- `detail.vue` 的 `normalizeDetail` 改为仅读取 `data.region`；`buildSavePayload` 发送 `region: form.region`
- `entrust-sale-helpers.js` 的 E2E 断言从 `'areaCode'` 改为 `'region'`
- 表单内部仍使用 `form.region`；展示逻辑不变

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/039.md
- 涉及文件: presale/entrustSale/detail.vue, index.vue, e2e/fixtures/entrust-sale-helpers.js, detailMixins.js, e2e/presale/entrust-sale-real-api-flow.spec.js, form.js
- 会话: 74428e0b-126e-4f90-9fc3-2fbe6b27a399; baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：74428e0b-126e-4f90-9fc3-2fbe6b27a399


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_region_fix",
  "source_extraction_id": "6e670e2c1ff04c55bcebae32cab0400f",
  "version": 1,
  "memory_type": "entities"
}
-->
