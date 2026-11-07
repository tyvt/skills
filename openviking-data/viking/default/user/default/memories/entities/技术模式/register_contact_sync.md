# 联系人字段替代次企业名需同步测试辅助函数
苏州市房地产监测V3 注册流程因办公信息区新增「联系人」字段，需同步修改 register-helpers.js 的 fillStep1 定位与新增校验测试。

## 问题根因
- register-helpers.js 的 fillStep1 原定位第二个「请输入企业名称」，与新增「联系人」字段不匹配

## 修复方案
- 改为填写「请输入联系人」以匹配新字段
- 新增 company-register-reset.spec.js 验证单企业名输入框及「联系人不能为空」校验

## 涉及文件
- register/components/Step1CompanyInfo.vue、companyRegister.vue
- institutionRegister/components/Step1BasicInfo.vue
- utils/registerValidate.js、utils/mapQxtEntInfo.js
- e2e/register/company-register-reset.spec.js
- register/components/Step4Shareholders.vue、package.json

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/107.md
- 所属项目：苏州市房地产监测V3；来源会话：0c678471-cf7f-47eb-a5c0-ed61ba99b0f8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_contact_sync",
  "source_extraction_id": "5e5aaa7ca34747248ba59c37c87fab01",
  "version": 1,
  "memory_type": "entities"
}
-->