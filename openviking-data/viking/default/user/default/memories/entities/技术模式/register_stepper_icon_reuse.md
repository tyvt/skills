# 企业注册步骤条复用经纪机构三态图标
企业注册第4步「股东信息」复用经纪机构「服务方案录入」的三态图标，加载失败回退默认图标。

## 关键事实
- 企业注册第4步「股东信息」复用经纪机构「服务方案录入」的 `step-scheme-*` 三态图标（complete/current/pending）
- PNG 加载失败时回退 `el-icon-s-custom`

## 涉及文件
- components/RegisterStepper/index.vue
- views/register/companyRegister.vue
- views/institutionRegister/index.vue
- e2e/register/company-register-reset.spec.js
- package.json
- playwright.config.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/098.md
- 来源会话ID：03f0598b-1d17-4053-8f92-746ad230caef

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_stepper_icon_reuse",
  "source_extraction_id": "9e8e2d3533054e708a85237f24078d9d",
  "version": 1,
  "memory_type": "entities"
}
-->