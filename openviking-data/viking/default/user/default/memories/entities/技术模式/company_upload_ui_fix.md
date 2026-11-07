# 开发企业要件上传 UI 修复验证
苏州市房地产监测V3 开发企业注册要件上传 UI 修复后，因 E2E 通过时不截图，补充了 Step3 截图验证。

## E2E 配置说明
- `playwright.config.js` 配置 `screenshot: 'only-on-failure'`，全流程通过时只留录屏无失败截图
- 已有全流程 E2E 录屏：`test-results/register-company-register--a0a34-全流程-Step1→Step5-chromium-desktop/video.webm`（约35秒）

## 补拍截图
- 整页 Step3 区域：`test-results/step3-ui-capture/register-step-3-full.png`
- 单个上传项（营业执照）：`test-results/step3-ui-capture/register-step-3-upload-item.png`
- 效果：顶部仅一条红色全局提示「支持.png, .jpg/.pdf，单个文件不超过5MB」，每项「*营业执照正本原件」同行显示，无逐项格

## 涉及文件
- `playwright.config.js`
- `src/views/register/companyRegister.vue`
- `src/views/institutionRegister/index.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：d6cb8ad3-8dfb-4e62-9fde-b959b79e5c28；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_upload_ui_fix",
  "source_extraction_id": "70ada2145f094d8f8e1450f3ecb4f669",
  "version": 1,
  "memory_type": "entities"
}
-->