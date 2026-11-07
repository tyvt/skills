# 企业E2E查看页reload致数据竞态
苏州市房地产监测V3 的 company-record-change.spec.js 中查看页 reload 与 getOwnCompany 产生竞态。

## 问题根因
- 对已处于企业信息查看页的用例执行 reload，与 `getOwnCompany` 产生竞态

## 关键修复
- `gotoCompanyInfoView` 内若 `.developer-basic-info-detail` 可见则改用 `fetchOwnCompanyPendingInfo` 拉数据
- 其余等待超时改 60s
- 用例 02 提交后去除多余跳转直接断言在途变更

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/007.md
- 涉及文件：zhi2-web-admin/src/api/company/companyRecord.js、e2e/fixtures/company-helpers.js、companyRecordAgency/change/detail.vue、companyManagement/components/DeveloperBasicInfoDetail.vue、utils/flowApi.js、e2e/company/company-record-change.spec.js、toB/companyRecord/detail.vue、components/OperationBtnGroup/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：12a2e42b-6de6-49de-9205-d3b77e75c3bf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_reload_race",
  "source_extraction_id": "644f7058dbcc4758a137abaf815b7f20",
  "version": 1,
  "memory_type": "entities"
}
-->