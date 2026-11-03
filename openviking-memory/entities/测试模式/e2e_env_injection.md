# E2E登录账号.env.e2e注入
zhi2-web-admin 的 Playwright E2E 用例通过读取同目录 .env.e2e 向 process.env 注入登录账号，避免密码入仓。
## 配置方式
- playwright.config.js 第 16–31 行读取同目录 .env.e2e 并写入 process.env。
- E2E_LOGIN_USER、E2E_LOGIN_PASSWORD 推荐在 zhi2-web-admin/.env.e2e 配置后执行 npm run test:e2e 或 test:all。
- 勿提交含密码的文件，必要时将 .env.e2e 加入 .gitignore。
## 临时方案
- 临时可在 bash 下 export 或单行前缀环境变量运行测试。
## 验证与归属
- 涉及文件：zhi2-web-admin/playwright.config.js、zhi2-web-admin/.env.e2e、zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js。
- navbar-sidebar-accessibility.spec.js 第 30 行校验 E2E_LOGIN_USER、E2E_LOGIN_PASSWORD 两环境变量。
- 所属项目：2-0；来源会话：86de4ca3-9aab-4074-aca2-8e964a3b2749；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "e2e_env_injection",
  "source_extraction_id": "db699db3e683428f80cc7d381629b63a",
  "version": 1,
  "memory_type": "entities"
}
-->