# 住房租赁合同备案详情缺打印按钮
苏州市房地产监测V3 中住房租赁合同备案详情页因 OperationBtnGroup 默认走公共配置未消费详情接口字段，导致打印按钮不渲染，须传入详情接口返回字段补充渲染。

## 问题根因
- OperationBtnGroup 默认走公共配置未消费详情接口字段，导致打印按钮不渲染
- 住房租赁合同备案详情需传入详情接口返回字段以显示按钮

## 解决方案
- 向 OperationBtnGroup 传入详情接口返回的字段以显示打印按钮

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/230.md
- 涉及文件：presale/leaseContract/detail.vue、components/OperationBtnGroup/index.vue、presale/leaseContractEntry/detail.vue、e2e/fixtures/lease-contract-mocks.js、components/ZsPrint/index.vue、company/companyManagement/components/AgencyBasicInfoDetail.vue、utils/resolveServerAssetUrl.js、e2e/presale/lease-contract-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：1366cb94-51af-4636-844f-b762c95373e7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_print_fix",
  "source_extraction_id": "eedd71c4edcc4cedbfdf3ec5cf02cc9a",
  "version": 2,
  "memory_type": "entities"
}
-->