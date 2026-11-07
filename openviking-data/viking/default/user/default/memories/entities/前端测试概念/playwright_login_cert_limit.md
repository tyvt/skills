# Playwright登录证书筛选限制
Playwright 通用登录无法自动化验证证书管理筛选 UI 的技术限制与应对。
## 限制说明
- Playwright 通用选择器登录后停留 login 页未能真正登入，故未自动化验证证书管理筛选条
## 修复与验证
- CSS 修复含 form-content-col 的 flex、搜索条横向 mixin、zs-form 容器判断
- 需本地 Ctrl+F5 手动验证证书筛选 UI
## 相关文件
- ProjectCertificateTabs.vue、element-ui.scss、StateTable.vue、index.scss、detail-form.scss、ListTemplate.js、projectEmbeddedCertificateList.js、Headline/index.vue

<!-- MEMORY_FIELDS
{
  "category": "前端测试概念",
  "name": "playwright_login_cert_limit",
  "source_extraction_id": "90d64a134b0b45a79727c9f6ef908860",
  "version": 1,
  "memory_type": "entities"
}
-->