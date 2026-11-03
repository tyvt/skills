# 住房租赁合同备案详情缺打印按钮
苏州市房地产监测V3 中住房租赁合同备案详情页因 OperationBtnGroup 默认走公共逻辑未渲染打印按钮，须取详情接口数据补充渲染。

## 问题根因
- OperationBtnGroup 默认走公共逻辑，未渲染打印按钮
- 住房租赁合同备案详情需取自身接口数据补充打印按钮渲染

## 解决方案
- 取住房租赁合同备案详情接口数据，补充打印按钮渲染逻辑

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/029.md
- 涉及文件：presale/leaseContract/detail.vue、components/OperationBtnGroup/index.vue、presale/leaseContractEntry/detail.vue、e2e/fixtures/lease-contract-mocks.js、components/ZsPrint/index.vue、company/companyManagement/components/AgencyBasicInfoDetail.vue、utils/resolveServerAssetUrl.js、e2e/presale/lease-contract-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：1366cb94-51af-4636-844f-b762c95373e7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_print_fix",
  "source_extraction_id": "1dd7ee5fdfbc4d55b597a754b7eaeeee",
  "version": 1,
  "memory_type": "entities"
}
-->