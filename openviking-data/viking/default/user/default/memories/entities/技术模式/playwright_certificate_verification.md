# Playwright登录失败须手动验证证书筛选条
在苏州市房地产监测V3中，Playwright无法自动化验证证书管理筛选条修复，需手动验证。

## 问题根因
- Playwright 使用通用选择器登录系统失败，停留在 login 重定向页
- 无法自动化验证证书管理筛选条修复效果

## 修复方案与验证
- 证书管理UI修复依赖CSS调整（form-content-col 的 flex、搜索条横向 mixin、zs-form 容器判断）
- 需本地 Ctrl+F5 后手动进入项目详情-证书管理验证

## 涉及文件
- zhi2-web-admin/src/views/projectManagement/customerProject/components/ProjectCertificateTabs.vue
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/styles/detail-form.scss
- zhi2-web-admin/src/mixins/ListTemplate.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/085.md
- 来源会话：f702fb33-72f8-4f2e-bc90-481ed771ea30
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_certificate_verification",
  "source_extraction_id": "9a7a6e30e88942b69bcab76fafb42454",
  "version": 1,
  "memory_type": "entities"
}
-->