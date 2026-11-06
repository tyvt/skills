# E2E 测试目录与配置总览
苏州市房地产监测V3 的 E2E 测试全部位于 Git 子模块 zhi2-web-admin 内，根仓库仅有规范文件。

## 目录与配置
- 测试根目录: zhi2-web-admin/e2e/；Playwright 配置: zhi2-web-admin/playwright.config.js
- 环境变量模板: zhi2-web-admin/e2e/.env.e2e.example；测试资产: zhi2-web-admin/e2e/assets/test-files/
- 录屏合并脚本: zhi2-web-admin/e2e/scripts/；规范（根仓库）: .cursor/rules/e2e-automation.mdc
- 登录态: e2e/.auth/zsbase.js；Playwright 版本: @playwright/test ^1.62.1

## 验证与归属
- 涉及文件: playwright.config.js, e2e/register/company-register.spec.js
- 所属项目: 苏州市房地产监测V3
- 来源会话ID: ba79e0e6-8a0f-4051-92aa-762918bec410

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "e2e_test_config",
  "source_extraction_id": "ef50d166515a4affbd40d092df51beed",
  "version": 1,
  "memory_type": "entities"
}
-->