# 企业注册全流程主管部门审核E2E测试
苏州市房地产监测V3 项目将主管部门审核纳入企业注册 E2E 测试流程，使用主管部门账号，全部 9 个用例通过（全流程约 50.6s）。

## 新增文件
- `e2e/fixtures/company-register-admin-helpers.js`：API 匹配 `isCompanyRegisterListResponse`/`Detail`/`Approval`；列表导航 `gotoCompanyRegisterAuditList`、`searchCompanyRegisterInList`；打开详情 `openCompanyRegisterDetailFromList`、`searchAndOpenCompanyRegisterDetail`（含轮询重试）；审批 `approveCompanyRegister`、`assertCompanyRegisterApproved`

## 扩展文件
- `e2e/register/company-register.spec.js`：Step1 后保存 `companyRegisterId`

## 验证与归属
- 运行结果：9/9 用例通过，约 50.6s
- 所属项目：苏州市房地产监测V3
- 来源会话ID：0e08e573-df60-4498-a959-795ecb00ec81

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_reg_admin_e2e",
  "source_extraction_id": "ad219bd3153445a1967d7e62570af761",
  "version": 1,
  "memory_type": "entities"
}
-->