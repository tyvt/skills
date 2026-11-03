# 分支保存E2E缺附件致前端拦截超时
苏州市房地产监测V3 中 AgencyBranchDetail.handleSave 调用 checkRequiredAppendix 前端拦截未传必传要件致 waitForResponse 超时。

## 问题根因
- `AgencyBranchDetail.handleSave` 调用 `checkRequiredAppendix` 前端拦截未传必传要件的保存请求
- 导致 `waitForResponse` 超时

## 修复方案
- 在 `e2e/fixtures/assets/` 新增 `test-appendix.png` 与 `test-appendix.pdf`
- 于 `institution-helpers.js` 增加 `uploadRequiredAppendix` 与 `clickSaveAndWaitForSubmit` 辅助函数

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/202.md
- 涉及文件：e2e/institution/agency-branch-real-api-flow.spec.js、src/views/institution/agencyBranch/components/AgencyBranchDetail.vue、src/utils/appendix.js、e2e/institution/agency-personnel-real-api-flow.spec.js、src/views/institution/agencyBranch/components/ServiceSchemePanel.vue、src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、e2e/fixtures/institution-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话：78e37b39-59fb-4f08-9f79-e96bf254bdd1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_save_e2e",
  "source_extraction_id": "c2f3492a784b4a58801149b7d05e2e19",
  "version": 1,
  "memory_type": "entities"
}
-->