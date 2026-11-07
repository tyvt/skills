# 机构基本信息「变更」授权错误修复
苏州市房地产监测V3 补齐机构变更逻辑，核心字段变更须提交审核，非核心字段保存即生效。

## 规则实现
- 统一社会信用代码锁定：变更模式表单字段禁用（showChangeTooltip 时自动锁定），保存前在 getForm() 强制回写原值防篡改
- 核心字段（7 个：机构名称、法人姓名、法人证件类型、法人证件号码、法人联系电话、管理员姓名、管理员证件号码）变更时保存后停留变更查看页（formMode=view&id=...），显示「提交」按钮走 jjjgbgxq 审核流程
- 非核心字段（机构别名、行政区域、经营地址、管理员联系电话等）变更时保存后直接回机构基本信息查看页（不带变更单 id），不显示「提交」按钮

## 涉及文件
- agencyChangeCoreFields.js：新增核心字段判定、USCI 锁定
- AgencyBasicInfoForm.vue、toB/agencyRecord/detail.vue、companyRecordAgency/change/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：6c91b23f-bba3-49fb-bd85-76e4879db720；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "agency_change_auth_fix",
  "source_extraction_id": "aecd5ccb4e0e42769b1470cec6b4862f",
  "version": 1,
  "memory_type": "entities"
}
-->