# 审核中要件busId须用变更单ID
苏州市房地产监测V3 中变更主管部门审核中要件查询须用变更单ID，误用备案ID会导致数据错误。

## 问题根因
- 变更主管部门审核中（displayStatus==='2'）要件查询误用备案ID，导致查错
- companyRecord 相关接口未正确解析审核中状态的 busId

## 修复方案
- companyRecord.js 的 resolveLicenseAppendixBusId：审核中有变更ID则返回变更ID，未就绪返回空
- DeveloperBasicInfoDetail.vue 的 loadActiveChange 先拉变更详情再同步写 activeChangeId/displayStatus
- watch 监听 busId 刷新要件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/098.md
- 涉及文件：companyManagement/components/DeveloperBasicInfoDetail.vue、api/company/companyRecord.js、companyManagement/components/AgencyBasicInfoDetail.vue、presale/permit/components/detail.vue、e2e/fixtures/company-helpers.js、companyRecordAgency/detail.vue、e2e/company/company-record-change.spec.js、toB/companyRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：f9b44225-a1eb-42b2-9743-4c23122dfdce；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "review_appendix_busid",
  "source_extraction_id": "66c8ef19744b4793b444164467b0f98d",
  "version": 1,
  "memory_type": "entities"
}
-->