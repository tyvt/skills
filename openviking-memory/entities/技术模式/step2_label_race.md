# Step2容器可见时子表单未挂载致label竞态
register-step-2 容器在 v-if="registerStep === 2" 时可见，但内部 Step2LegalPerson 表单未挂载，测试过早查找 .el-form-item__label 数量为0。

## 问题根因
- register-step-2 容器在 v-if="registerStep === 2" 时可见
- 内部 Step2LegalPerson 表单未挂载，测试过早查找 .el-form-item__label 数量为0

## 修复方案
- assertRegisterFormLabelRightAligned 改为等待首个 label 可见
- Step2 用例额外等待「法定代表人姓名」输入框可见确保挂载

## 验证与归属
- 验证证据：extracted source=cursor session=a2d69268-dd50-4d1d-ad28-dc9e24e9c0e9
- 涉及文件：company-register-visual.spec.js、register-helpers.js、Step2LegalPerson.vue、companyRegister.vue、error-context.md、Step1CompanyInfo.vue、zs-form.vue
- 来源会话ID：a2d69268-dd50-4d1d-ad28-dc9e24e9c0e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step2_label_race",
  "source_extraction_id": "51f806c5ee534d2b8091b45602152e6a",
  "version": 1,
  "memory_type": "entities"
}
-->