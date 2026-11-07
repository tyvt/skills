# 企业注册全流程主管审核 e2e 用例
苏州市房地产监测V3 将企业注册全流程纳入主管部门审核，新增 e2e 辅助与扩展 spec 覆盖全流程用例。

## 实现要点
- 新增 e2e/fixtures/company-register-admin-helpers.js 封装 API 匹配、列表导航与审批断言
- 扩展 e2e/register/company-register.spec.js 串联 companyRegisterId 覆盖全流程用例

## 涉及文件
- e2e/register/company-register.spec.js、e2e/fixtures/register-helpers.js
- companyRegister/index.vue、e2e/scripts/merge-company-register-video.mjs
- package.json、company-register-branch.spec.js、api/company/companyRegister.js、e2e/fixtures/auth-helpers.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/010.md
- 所属项目：苏州市房地产监测V3；来源会话：0e08e573-df60-4498-a959-795ecb00ec81；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_e2e",
  "source_extraction_id": "eb40dec2781a45a9a11c09c062168035",
  "version": 1,
  "memory_type": "entities"
}
-->