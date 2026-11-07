# 机构变更提交固定调用特提接口
苏州市房地产监测V3 中机构变更提交因 `resolveSubmitApi` 读取菜单/流程配置覆盖回退值误打旧接口，改为固定调用特提接口。

## 问题原因
- `resolveSubmitApi` 优先读取菜单或流程配置的 `submitApi` 覆盖回退值，致使机构变更提交请求误打旧接口

## 修复方案
- `src/views/toB/agencyRecord/detail.vue` 直接固定调用 `COMPANY_RECORD_CHANGE_SPECIAL_SUBMIT_API`（`/company/companyRecordChange/specialSubmit`）
- 移除 `resolveSubmitApi` 导入

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/158.md
- 涉及文件：companyRecordChange.js、companyRecord.js、toB/companyRecord/detail.vue、toB/agencyRecord/detail.vue、companyRecordChangeRoute.js、AgencyBasicInfoDetail.vue、zljg/companyRecord/detail.vue、flowApi.js
- 所属项目：苏州市房地产监测V3；来源会话：01a162e4-b96d-70c5-a400-760f72c3e01d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_change_special_submit",
  "source_extraction_id": "fcc5ba53c4b941589a4680bf29e3e0cd",
  "version": 1,
  "memory_type": "entities"
}
-->