# 登录状态脚本等待路由且未生成 zsbase
在 zhi2-web-admin（产品 2.0）中，旧的 save-auth-state.mjs 使用动态路由的 meta.filePath 作为登录结束标志，在生产环境中失败且未生成 zsbase.json。
## 问题根因
- save-auth-state.mjs 依赖于动态路由的 meta.filePath 作为登录完成的信号。
- 在生产环境中该条件很少被满足，导致超时且 storageState() 未执行。
## 解决方案
- 检测 Admin-Token 或离开 /login 以自动保存。
- 允许在终端中通过 Enter 手动保存。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：441e5287-5448-4821-9c2e-13e82e944aa5
- 验证证据: cursor session=441e5287-5448-4821-9c2e-13e82e944aa5
- 涉及文件: price-filing-routes.spec.js, price-filing-view-refresh.spec.js, price-filing-console-audit.spec.js, price-filing-admin-probe.spec.js, auth-helpers.js, crud-helpers.js, package.json, playwright.config.js
- 所属项目: 2-0; 代码基础: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_state_save_token",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->