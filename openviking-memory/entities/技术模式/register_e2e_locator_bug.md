# 由于与 Step1 表单不一致导致的注册 e2e 定位失败
在苏州 V3 房地产监测系统的注册 e2e 测试中，`register-helpers.js` 的 Step1 定位与表单不一致，导致无法找到元素。

## 问题根因
- `fillStep1` 在 `register-helpers.js` 中原本定位第二个 «请输入企业名称» 而不是 «请输入联系人»，导致完整流程测试用例失败
- 资质表单错误地嵌套了基于 testid 的定位，导致元素未找到

## 解决方案
- 改为通过联系人的 placeholder 定位
- 在 scope 内直接使用 `input[placeholder]` locator 以避免嵌套
- 添加了 `company-register-reset.spec.js` 以验证字段显示和 «联系人不能为空» 警告
- 确保了 `company-register-fields.spec.js` 的通过（会话 417eac43 附验证 082.md）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：417eac43-30d4-48c7-97e2-73f5e4d9cdd0
- 涉及文件: Step1CompanyInfo.vue, companyRegister.vue, QualificationFormSection.vue, Step1BasicInfo.vue, Step2LegalPerson.vue, Step3Appendix.vue, Step4Shareholders.vue, registerValidate.js, company-register-reset.spec.js, mapQxtEntInfo.js, package.json
- 验证证据: src=苏州市房地产监测V3-rest/065.md; src=苏州市房地产监测V3/082.md
- 会话: 417eac43-30d4-48c7-97e2-73f5e4d9cdd0, 0c678471-cf7f-47eb-a5c0-ed61ba99b0f8; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_e2e_locator_bug",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 3,
  "memory_type": "entities"
}
-->