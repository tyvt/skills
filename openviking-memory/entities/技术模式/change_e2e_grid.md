# change_e2e_grid
苏住房G V3 企业变更页要件上传改用 requirement-grid 宫格，E2E 提交后刷新并断言在途审核而非依赖「审核中」文案。
## 改动要点
- 企业变更页要件上传使用 requirement-grid 宫格而非折叠面板
- E2E 在 company-helpers.js 与 institution-helpers.js 等待宫格就绪后对带 * 卡片用 input[type=file] 上传
- company-record-change.spec.js 改为 gotoCompanyInfoView 刷新后通过 getOwnCompany 与 isChangeUnderAdminReview 断言在途审核
- 提交后页面可能无「审核中」文案，故检查「审核流程查看」按钮代替
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/016.md
- 涉及文件：institutionRegister/index.vue、companyRegister/table.vue、companyManagement/companyBasicInfo/detail.vue、DeveloperBasicInfoForm.vue、change/detail.vue、DeveloperBasicInfoDetail.vue、toB/companyRecord/detail.vue、utils/registerQualification.js 等
- 所属项目：苏州市房地产监测V3；来源会话：19d37368-a31d-41a5-9880-9f1ccae0e31d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_e2e_grid",
  "source_extraction_id": "0c7262dd765e400daf7bc9b7477a7669",
  "version": 1,
  "memory_type": "entities"
}
-->