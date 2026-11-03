# Playwright相对路径缺baseURL报错
在 zhi2-web-admin 的 Playwright E2E 测试中，beforeEach 里 page.goto('/#/login') 因未配置 baseURL 报 Cannot navigate to invalid URL。
## 问题原因
- Playwright 将相对 URL 拼接到 use.baseURL；未配置或为空时，'/#/login' 不是合法绝对地址。
- 与业务 hash 路由 /#/login 无关，是测试配置问题。
## 解决方案
- 在 playwright.config 或对应 project 配置 baseURL（如本地 dev http://127.0.0.1:端口 或与 E2E_BASE_URL 一致）。
- 或 goto 写完整 URL。
## 验证与归属
- 验证：会话 44f9e8a5 诉求 2 报错 page.goto: Protocol error … Cannot navigate to invalid URL，定位 login.spec.js:15。
- 涉及文件：zhi2-web-admin/tests/e2e/login.spec.js、zhi2-web-admin/playwright.config.js；所属项目：2-0；来源会话：44f9e8a5-1336-42c2-9226-9d3dc33ccb9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_baseurl_bug",
  "source_extraction_id": "c6ae4da4185a4eb4914ba232a41c4536",
  "version": 1,
  "memory_type": "entities"
}
-->