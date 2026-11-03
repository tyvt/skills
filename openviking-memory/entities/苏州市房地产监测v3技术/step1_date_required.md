# Step1成立日期必填校验
苏州市房地产监测V3 注册流程 Step1CompanyInfo.vue 的 foundingDate 增加必填校验以阻断未填进入下一步。

## 改动内容
- foundingDate 增加 `{ required: true, message: '成立日期不能为空', trigger: ['change'] }` 规则
- 与 editAndSubmit 提交要求对齐，未填时阻断进入下一步

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/163.md
- 涉及文件：Step1CompanyInfo.vue、companyRegister.vue、companyInfo.vue、registerValidate.js、Step4Shareholders.vue、Step3Appendix.vue、companyRegister.js、propertyCompanyRegister.vue
- 所属项目：苏州市房地产监测V3；来源会话：07ea18e2-6956-4c76-aee4-59cf48b781f9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "step1_date_required",
  "source_extraction_id": "4ab1eb5ff2df476e89c5e40eba2a6f96",
  "version": 1,
  "memory_type": "entities"
}
-->