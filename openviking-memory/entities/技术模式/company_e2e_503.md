# 公司注册E2E提交步因后端503工作流失败
苏州市房地产监测V3 公司注册 E2E 在 Step4 提交步因后端 503 工作流失败，与前端访问路径无关。

## 问题根因
- 根因系后端环境异常，`editAndSubmit` 阶段触发工作流启动失败返回 `[503]`
- 与前端访问路径（根路径无需 `/sys/fdc`）无关
- 诊断确认 `http://192.168.1.129:8098` 可正常加载注册页且前序步骤通过

## 涉及文件
- zhi2-web-admin/e2e/register/company-register.spec.js
- zhi2-web-admin/playwright.config.js 与 package.json
- zhi2-web-admin/e2e/fixtures/env-loader.js、register-helpers.js、auth-helpers.js、company-register-admin-helpers.js
- zhi2-web-admin/e2e/scripts/merge-company-register-video.mjs

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/202.md
- 来源会话：bbf4455e-d301-4701-a090-882f15126648；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_e2e_503",
  "source_extraction_id": "8d3358f862fa431d858799b297104461",
  "version": 1,
  "memory_type": "entities"
}
-->