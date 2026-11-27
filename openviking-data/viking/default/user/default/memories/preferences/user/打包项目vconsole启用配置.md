---
audit_status: valid
last_checked: 2026-11-27T08:53:41+08:00
verdict_note: 偏好/操作类记忆，描述打包项目启用注释态vConsole调试的做法，属一次性调试经验，无矛盾证据。
---
- 打包项目时在 `index.html` 启用注释态 vConsole，并引入 BootCDN vConsole 3.15.1，以 `new VConsole({ theme: 'dark' })` 初始化（避免未使用变量告警；需浅色可改 `'light'` 或删该选项）。
- 该脚本须置于业务 SDK、jQuery 及主入口 `index.*.js` 之前，以捕获后续请求。
- 调试结束应注释或删除该脚本，避免正式环境暴露。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "打包项目vConsole启用配置",
  "source_extraction_id": "e5d0e8206baa4325a86e528424c4840c",
  "version": 2,
  "memory_type": "preferences"
}
-->