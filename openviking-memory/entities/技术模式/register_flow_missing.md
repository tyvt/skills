# 企业注册提交审核失败因后端流程未配置
企业注册业务编码040100后端工作流未配置，致editAndSubmit接口返回HTTP 500，非前端缺陷。

## 根因
- e2e/register/real-api-flow.spec.js Step4调用editAndSubmit返回HTTP 500，业务消息“该业务未配置流程”。
- 根因为企业注册业务编码`040100`（`companyRegister.js`）后端工作流未配置，需于管理端补全流程。

## 解决方案
- 需在管理端补全流程，非前端代码缺陷。

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/package.json
- e2e/register/real-api-flow.spec.js
- playwright.config.js
- e2e/fixtures/register-helpers.js
- src/api/company/companyRegister.js

## 验证与归属
- 验证证据：src=产品2.0/070.md
- 来源会话ID：63a99906-bb31-47e2-a926-890c925cb6ed
- 代码基线：none
- 所属项目：产品2.0（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_flow_missing",
  "source_extraction_id": "55bb34ba05c74db7846be6cfd5d6ceb5",
  "version": 1,
  "memory_type": "entities"
}
-->