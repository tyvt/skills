# 企业注册营业期限字段统一
苏州市房地产监测V3 中开发企业、经纪机构、租赁企业三种注册入口统一改用共享营业期限字段组件与校验规则。

## 统一规则
- UI：开始日期 + 结束日期（占位「长期」），不再用 daterange（避免 businessTermEnd 为 null 无法回显）
- 校验：createBusinessTermRangeRules（registerValidate.js）— 开始必填，结束可空，有结束则校验先后
- 企信通：仍走 mapQxtEntInfo.js（起止映射，null 结束 → ''）
- 提交：businessTermEnd 用 omitEmpty，空表示长期

## 涉及入口与改动
- 开发企业：CompanyRegisterSingleForm 已改用共享组件（此前已改逻辑）
- 经纪机构：InstitutionRegisterSingleForm（非租赁布局）新增营业期限 + 校验 + 提交字段
- 租赁企业：同上（isLeaseOrgan 布局）新增相同字段

## 抽取复用
- 组件：src/components/RegisterBusinessTermFields.vue
- E2E：fillLeaseIns 相关用例

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：registerValidate.js、mapQxtEntInfo.js、src/components/RegisterBusinessTermFields.vue、companyInfo.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：a4953b9d-852c-46bc-8834-4c71e8adf5c6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_business_term_fields",
  "source_extraction_id": "ad9c255ef9424451b286246018dc4061",
  "version": 1,
  "memory_type": "entities"
}
-->