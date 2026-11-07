# 解析 detail 的股东列表
项目苏州市房地产监测V3的 zhi2-web-admin 在 companyBasicInfoShared.js 中添加了函数，用于从 companyRecord/detail 的响应中提取 shareholderList，并通过 getOwnCompany 进行回退。

## 实现
- 在 `zhi2-web-admin/src/views/company/companyManagement/components/companyBasicInfoShared.js` 中，新函数 `resolveShareholderListFromDetailPayload` 解析来自 `/company/companyRecord/detail` 响应的 `shareholderList`
- `DeveloperBasicInfoDetail.vue` 中的 `loadShareholderList()` 在存在 `companyRecordId` 时调用 detail 接口
- `detailCallback` 使用 `getOwnCompany` 作为回退，然后覆盖；失败则保留回退

## 文件
- companyBasicInfoShared.js, DeveloperBasicInfoDetail.vue, ShareholderPlainTable.vue
- companyManagement/companyBasicInfo/detail.vue, companyRegister/detail.vue
- api/company/companyRecord.js, utils/registerQualification.js, toB/companyRecord/detail.vue

## 验证
- 验证证据: src=苏州市房地产监测V3/140.md
- 所属项目: 苏州市房地产监测V3; 会话: 4d9d7fb3-9c0c-440d-b3de-166a2d7335a9; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：4d9d7fb3-9c0c-440d-b3de-166a2d7335a9


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "resolve_shareholder_detail",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 2,
  "memory_type": "entities"
}
-->
