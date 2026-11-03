# 注册e2e定位与Step1表单不一致致失败
苏州市房地产监测V3的注册流程 e2e 测试中，register-helpers.js 的 Step1 定位与表单不一致导致元素找不到。

## 问题根因
- register-helpers.js 的 fillStep1 原定位第二个「请输入企业名称」而非「请输入联系人」，导致全流程用例失败
- 资质表单错误嵌套 testid 定位致元素找不到

## 解决方案
- 改联系人 placeholder 定位
- scope 内直接使用 `input[placeholder]` locator 避免嵌套
- 新增 company-register-reset.spec.js 校验字段显示与「联系人不能为空」提示

## 验证与归属
- 涉及文件：Step1CompanyInfo.vue、companyRegister.vue、QualificationFormSection.vue、Step1BasicInfo.vue、Step2LegalPerson.vue、Step3Appendix.vue、Step4Shareholders.vue、registerValidate.js、company-register-reset.spec.js、mapQxtEntInfo.js、package.json
- 验证证据：src=苏州市房地产监测V3-rest/065.md
- 来源会话ID：417eac43-30d4-48c7-97e2-73f5e4d9cdd0、0c678471-cf7f-47eb-a5c0-ed61ba99b0f8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_e2e_locator_bug",
  "source_extraction_id": "67328dd98cc24bed8e1ff6930be16dd5",
  "version": 2,
  "memory_type": "entities"
}
-->