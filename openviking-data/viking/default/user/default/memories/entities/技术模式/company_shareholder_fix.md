# 企业基本信息股东列表展示修复
苏州市房地产监测V3 中企业基本信息详情新增从 `/company/companyRecord/detail` 解析并加载股东列表的能力。

## 改动说明
- `companyBasicInfoShared.js` 新增 `resolveShareholderListFromDetailPayload` 解析 `shareholderList`
- `DeveloperBasicInfoDetail.vue` 引入 `getCompanyRecordDetail` 与共享函数，新增 `loadShareholderList()`：有 `companyRecordId` 时调用 detail 接口
- `detailCallback` 先用 `getOwnCompany` 兜底，再调用 `loadShareholderList()` 覆盖；detail 失败保留兜底

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyBasicInfoShared.js`、`DeveloperBasicInfoDetail.vue`、`company-helpers.js`、`register-basic-info-appendix.spec.js`
- 所属项目：苏州市房地产监测V3；来源会话：4d9d7fb3-9c0c-440d-b3de-166a2d7335a9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_shareholder_fix",
  "source_extraction_id": "acdf608e6c0e448bb2d07a9151e852b1",
  "version": 1,
  "memory_type": "entities"
}
-->