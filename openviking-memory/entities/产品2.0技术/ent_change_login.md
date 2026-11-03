# 企业端变更须按登录态设计避免 403
企业端「变更」功能若直接拼业务 ID 调通用 detail/update 会被权限码挡住 403，应只走 getLastByLogin 这类登录态接口。

## 问题根因
- 企业端与主管端是两套权限码，企业账号无 company:companyRecordChange:query/:edit，仅放行按登录态取数接口（getLastByLogin）
- E2E 第 04 步修改保存变更稳定 403：POST /company/companyRecordChange/update 返回「没有访问权限」，同单 detail 也 403 而 getLastByLogin 200
- 变更单后端已是「已提交/已备案」，submitByLogin 返回 500「单据已提交或已备案，无法提交」，前端却按草稿态展示，状态口径不一致

## 解决方案
- 企业端「当前变更单」只走 getLastByLogin 登录态接口，勿拼业务 ID 调通用 detail/update
- 无权限时用 noMessage + noReject 降级，回退 getOwnCompany 加载表单并允许「继续变更」编辑草稿而非报错退出
- 按钮显隐用「进行中变更单存在且未审批」判断，需 getOwnCompany 补返回 activeChangeId / activeChangeDisplayStatus
- E2E 遇 403 应按「后端权限或数据状态未就绪」上报后端，勿改断言或加重试掩盖

## 验证与归属
- 来源会话 4e2633d3：企业基本信息变更用例 01-03 通过、04 因 update 403 失败；列出 getLastByLogin 200 / detail 403 / update 403 / submitByLogin 500
- 涉及文件：zhi2-web-admin/src/api/company/companyRecord.js、toB/companyRecord/detail.vue、toB/change/detail.vue、companyManagement/components/CompanyBasicInfoDetail.vue、e2e/company/company-record-flow.spec.js
- 所属项目：产品2.0；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "ent_change_login",
  "source_extraction_id": "90d1b0f9d9774c0d9a37f9b9cd45eeee",
  "version": 1,
  "memory_type": "entities"
}
-->