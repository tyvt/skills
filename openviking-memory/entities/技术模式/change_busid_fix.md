# 变更审核中按变更ID查询要件修复
苏州市房地产监测V3 修复变更处于主管部门审核中时要件 busId 误用备案 ID 的问题，改为使用变更单 ID。

## 问题根因
- 变更处于主管部门审核中时，要件查询的 busId 原误用备案 ID，导致查不到正确的变更单附件

## 修改内容
- `companyRecord.js`：`isCompanyRecordChangeUnderAdminReview` 与 E2E 一致，含 `displayStatus === '2'` 视为审核中
- `companyRecord.js`：`resolveLicenseAppendixBusId` 审核中且有变更 ID 时返回变更 ID，未就绪时返回 `''` 避免回落备案 ID
- `DeveloperBasicInfoDetail.vue`：新增计算属性 `licenseAppendixBusId` 与模板绑定，`watch` 在 busId 变化时刷新要件
- `DeveloperBasicInfoDetail.vue`：`loadActiveChange` 先拉变更详情再同时写入 `activeChangeId`/`displayStatus`，避免中间态用备案 ID
- `AgencyBasicInfoDetail.vue`：同步上述改动

## 涉及文件与归属
- 涉及：`companyRecord.js`、`DeveloperBasicInfoDetail.vue`、`AgencyBasicInfoDetail.vue`、`company-helpers.js`
- 所属项目：苏州市房地产监测V3；来源会话：f9b44225-a1eb-42b2-9743-4c23122dfdce
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_busid_fix",
  "source_extraction_id": "a81ab6804080434d9486b5c33f4bda6b",
  "version": 1,
  "memory_type": "entities"
}
-->