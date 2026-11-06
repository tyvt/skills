# 预售许可详情字段映射缺失致坐落为空
苏州市房地产监测V3 预售许可详情接口返回 `projectAddress` 但表单绑定 `form.address`，未映射致「项目坐落」为空，已兼容修复。

## 问题根因
- `presale/permit/components/detail.vue` 详情接口返回 `projectAddress` 但表单绑定 `form.address`
- `detailCallback` 未做字段映射致「项目坐落」显示为空

## 修复方案
- `detailCallback` 与 `handleProjectChange` 增加 `address: data.address ?? data.projectAddress` 兼容映射
- 该写法与委托销售模块的 `normalizeDetail` 保持一致

## 验证与归属
- 验证证据：extracted source=cursor session=d7e90979-d433-4c59-ae3d-c5fc390cc9c4
- 涉及文件：presale/permit/components/detail.vue、PermitInfoPanel.vue、presale/entrustSale/detail.vue、e2e/presale/presale-permit-real-api-flow.spec.js、e2e/fixtures/presale-permit-helpers.js
- 来源会话ID：d7e90979-d433-4c59-ae3d-c5fc390cc9c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_address_fix",
  "source_extraction_id": "66ee6a2008f240c5a4f96b7c3e61c2fa",
  "version": 2,
  "memory_type": "entities"
}
-->