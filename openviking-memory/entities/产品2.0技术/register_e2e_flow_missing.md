# 注册真实接口 E2E「该业务未配置流程」根因
企业注册真实接口全流程 E2E 在 editAndSubmit 提交审核时返回 HTTP 500「该业务未配置流程」，根因是后端工作流未配置，非前端或脚本问题。

## 问题现象
- saveCompanyRegister→saveLegalPersonInfo→要件上传→saveDraft 均通过，仅最后 editAndSubmit 报 HTTP 500
- 业务消息为「该业务未配置流程」，前端所有步骤（股东信息、协议勾选）均已完成

## 根因分析
- 提交审核接口按业务编码去 flowable 找已发布审批流程，新业务或新环境未配置流程时后端直接 500
- 报错形态像代码故障，实际是环境配置缺失，勿在前端或测试脚本侧找原因

## 解决方案
- 从对应 api 文件（如 companyRegister.js）查出业务编码，040100=开发企业注册
- 登录管理端进入工作流/流程配置菜单，为该业务编码配置并发布审批流程后重跑 E2E

## 验证与归属
- 来源会话 63a99906：Step1-Step4 保存通过，仅 editAndSubmit 500，结论为后端工作流未配置
- 涉及文件：e2e/register/real-api-flow.spec.js、src/views/company/companyRegister.js
- 所属项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "register_e2e_flow_missing",
  "source_extraction_id": "d6fff46e82c345f0a1fd71b1f6da4fd9",
  "version": 1,
  "memory_type": "entities"
}
-->