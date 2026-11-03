# 企业要件上传 UI 全局提示且逐项同行
苏州市房地产监测V3 企业注册 Step3 上传 UI 采用顶部单条红色全局提示，每项名称与星号同行显示，无逐项格式。

## 实现要点
- 顶部仅一条红色全局提示：支持 .png、.jpg/.pdf，不超过 5MB
- 每项名称与星号（必填标记）同行显示，无逐项格式提示

## 验证与归属
- 验证截图：zhi2-web-admin/test-results/step3-ui-capture/register-step-3-full.png 及 register-step-3-upload-item.png
- 验证证据：src=苏州市房地产监测V3/137.md
- 涉及文件：register/companyRegister.vue、institutionRegister/index.vue、e2e/fixtures/register-helpers.js、register/components/Step3Appendix.vue、register/components/RegisterUploadItem.vue、institutionRegister/components/Step3Appendix.vue、institutionRegister/components/InstitutionUploadItem.vue、e2e/register/register-layout.spec.js
- 来源会话：d6cb8ad3-8dfb-4e62-9fde-b959b79e5c28；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_upload_ui",
  "source_extraction_id": "622bc94388724ad38c296348aac87c4e",
  "version": 1,
  "memory_type": "entities"
}
-->