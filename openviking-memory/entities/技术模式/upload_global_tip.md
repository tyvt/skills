# 企业要件上传UI全局提示且标签同行
苏州市房地产监测V3 中企业要件上传布局由逐项提示改为顶部单条全局提示且标签与控件同行。

## 变更要点
- 改为顶部单条红色全局提示「支持.png, .jpg/.pdf，单个文件不超过5MB」
- 每项标签（如「*营业执照正本原件」）与上传控件同行，去除逐项提示布局
- 验证截图：zhi2-web-admin/test-results/step3-ui-capture/register-step-3-full.png

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/107.md
- 涉及文件：register/companyRegister.vue、institutionRegister/index.vue、e2e/fixtures/register-helpers.js、register/components/Step3Appendix.vue、register/components/RegisterUploadItem.vue、institutionRegister/components/Step3Appendix.vue、institutionRegister/components/InstitutionUploadItem.vue、e2e/register/register-layout.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：d6cb8ad3-8dfb-4e62-9fde-b959b79e5c28；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "upload_global_tip",
  "source_extraction_id": "5ef47723b89e4bcab4d342f6dc3a4700",
  "version": 1,
  "memory_type": "entities"
}
-->