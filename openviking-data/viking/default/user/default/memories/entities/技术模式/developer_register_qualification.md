# 开发企业入网注册增加资质信息
苏州市房地产监测V3 中开发企业入网注册流程已增加资质信息（qualificationList），并通过全流程 E2E 与字段 maxlength 测试。

## 测试结果
- 全流程 E2E（含审核）通过：e2e/register/company-register.spec.js 的 Step1→Step5，约 1.1 分钟
- Step1 saveCompanyRegister 请求体含 qualificationList，certificateName = 房地产开发企业资质证书
- Step4 editAndSubmit 同样携带完整 qualificationList
- 管理端审核前详情「资质信息」区块可见，回显证书名称；审核同意流程正常完成
- 资质弹窗 maxlength 通过：e2e/register/company-register-fields.spec.js

## 测试过程小修复
- assertRegisterStep1Ui 中 getByText('资质信息') 匹配多元素，已改为在 register-step-1 内用 .section-title 精确匹配

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：e2e/register/company-register.spec.js、e2e/register/company-register-fields.spec.js、companyRegister/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：2cc4f912-53ec-4229-917e-0977129cd28e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "developer_register_qualification",
  "source_extraction_id": "ad9c255ef9424451b286246018dc4061",
  "version": 1,
  "memory_type": "entities"
}
-->