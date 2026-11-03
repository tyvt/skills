# E2E保存超时因未传必传附件被前端拦截
苏州市房地产监测V3 的经纪机构分支保存 E2E 测试中，因未上传必传附件导致前端拦截、保存请求未发出而超时。

## 问题根因
- `AgencyBranchDetail.handleSave` 调用 `checkRequiredAppendix` 校验必传附件
- E2E 测试未上传必传附件，前端拦截导致保存请求未发出而超时

## 解决方案
- 在 `e2e/fixtures/assets/` 添加 `test-appendix.png` 与 `test-appendix.pdf`
- 于 `institution-helpers.js` 新增 `uploadRequiredAppendix` 及 `clickSaveAndWaitForSubmit` 封装上传与等待逻辑

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/004.md
- 涉及文件：zhi2-web-admin/e2e/institution/agency-branch-real-api-flow.spec.js、zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue、zhi2-web-admin/src/utils/appendix.js、zhi2-web-admin/e2e/institution/agency-personnel-real-api-flow.spec.js、zhi2-web-admin/src/views/institution/agencyBranch/components/ServiceSchemePanel.vue、zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、zhi2-web-admin/e2e/fixtures/institution-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话：78e37b39-59fb-4f08-9f79-e96bf254bdd1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_appendix_block",
  "source_extraction_id": "f37ca630c5374df8b96f4fc0d83b8db5",
  "version": 1,
  "memory_type": "entities"
}
-->