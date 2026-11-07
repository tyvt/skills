# 登记变更列表使用 administrativeArea
在苏州房地产监测V3中，机构认证变更列表的查询参数已从 `regionCode` 更改为 `administrativeArea`，以适应新接口。

## 问题
- 参数 `regionCode` 未适配新接口 `administrativeArea`，导致筛选异常

## 解决方案
- 在 `change/index.vue` 中，查询参数更改为 `administrativeArea`
- 表格列使用 `type='dict'` 和 `dict-url='ECONOMIC_INSTITUTIONS_REGION'`，移除了 `formatRegion`
- `companyRecord.js` 为 `pageCompanyRecordChanges` 添加 JSDoc 以及新接口 `addCompanyRecordChange`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-rest/124.md
- 涉及文件: change/index.vue, change/detail.vue, companyRecord.js, companyBasicInfoContent.js, companyRecordAgency/index.vue, CompanyBasicInfoForm.vue, detail.vue, company-record-change.spec.js
- 会话: 81bf5be6-c0ce-46ce-b29f-c26f9c1c7127; baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：81bf5be6-c0ce-46ce-b29f-c26f9c1c7127


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_change_area",
  "source_extraction_id": "dde3fbc9f6c8407fb1b50b1438772b93",
  "version": 1,
  "memory_type": "entities"
}
-->
