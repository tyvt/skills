# 开发企业注册重置按钮修复
苏州市房地产监测V3 修复开发企业注册 Step1 的「重置」按钮，并补充 E2E 测试。

## 改动内容
- Step1CompanyInfo.vue：resetExtracted() 从仅撤销企信通提取改为整表重置，使用 createRegisterForm() 恢复所有字段初始值，重置后清除校验状态并提示「已重置」，为重置按钮添加 data-testid="register-btn-reset"
- 根因：原逻辑仅 extractSnapshot 存在时生效，仅输入信用代码时点击无反应
- 新增 E2E 测试 company-register-reset.spec.js 覆盖两场景：仅输入信用代码→重置→输入框清空；提取回填后→重置→所有字段清空；验证 2 passed (2.2s)

## 涉及文件
- zhi2-web-admin/src/views/register/components/Step1CompanyInfo.vue
- zhi2-web-admin/e2e/register/company-register-reset.spec.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：a2982d33-2adc-4202-be1c-6587aaa98437；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_reset_fix",
  "source_extraction_id": "81fd5c6810e94dd89c3a540e5bf7f87d",
  "version": 1,
  "memory_type": "entities"
}
-->