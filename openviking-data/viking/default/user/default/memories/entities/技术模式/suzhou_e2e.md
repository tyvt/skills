# 苏住房G E2E 黑盒验收契约
苏住房G 自动化验收采用仓库根 hoist 的 Playwright 加 createSuite，黑盒打 nginx 部署站点 8101，验证码固定 1234，退出码 0 代表 PASS、1 代表 FAIL。

## 测试架构
- Playwright 装在仓库根 D:\repository\苏住房G\node_modules\playwright，为 hoisted 依赖，不在子模块 zhi2-web-admin 内
- 只允许打 nginx 部署后的站点 http://127.0.0.1:8101，绝不起 dev server
- 用例文件只能放仓库根 e2e/ 目录，含 e2e/flood/、e2e/home-v2/、e2e/legacy/

## 套件契约
- 每个套件用 createSuite({name, task, dir}) 后接 suite.run(async (ctx) => {...})
- ctx 提供 ctx.api.get/post 直连接口断言、ctx.page() 拿 Playwright page、suite.step(...) 打步骤日志、ctx.ui.login(...) 登录
- 脚本退出码约定 0=PASS、1=FAIL，CI 直接看退出码
- 登录验证码固定 1234 才能无人值守

## 验证与归属
- 来源会话 session-c3716c15，代码基线 05caac8
- 参考用例 e2e/legacy/e2e-login-keys.cjs、e2e/home-v2/bug-5897-signing-bank-label.spec.mjs
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_e2e",
  "source_extraction_id": "f0896f43021441b09295c93548a90738",
  "version": 1,
  "memory_type": "entities"
}
-->