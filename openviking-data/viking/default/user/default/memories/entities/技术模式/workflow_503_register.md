# 后端工作流503致公司注册提交失败
苏州市房地产监测V3 中后端工作流启动接口返回503，导致公司注册 Step4 股东信息提交失败。

## 问题根因
- 后端工作流启动接口返回503
- 导致 Step4 editAndSubmit 股东信息提交失败

## 解决方案
- E2E 验证基址为 http://192.168.1.129:8098
- 根路径无需 /sys/fdc 后缀

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/005.md
- 涉及文件：zhi2-web-admin/e2e/register/company-register.spec.js、zhi2-web-admin/playwright.config.js、zhi2-web-admin/package.json、zhi2-web-admin/e2e/fixtures/env-loader.js、zhi2-web-admin/e2e/fixtures/register-helpers.js、zhi2-web-admin/e2e/fixtures/auth-helpers.js、zhi2-web-admin/e2e/fixtures/company-register-admin-helpers.js、zhi2-web-admin/e2e/scripts/merge-company-register-video.mjs
- 所属项目：苏州市房地产监测V3；来源会话：bbf4455e-d301-4701-a090-882f15126648；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workflow_503_register",
  "source_extraction_id": "f37ca630c5374df8b96f4fc0d83b8db5",
  "version": 1,
  "memory_type": "entities"
}
-->