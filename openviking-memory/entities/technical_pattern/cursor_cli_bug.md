# 飞书拉起cursor会话秒退因守护进程未运行
苏州市房地产监测V3 相关环境中，飞书 `/new` 拉起 cursor 会话曾异常秒退，根因为 CLI 守护进程未运行及 `CURSOR_API_KEY` 未配置。

## 问题根因
- 飞书通过 `/new`、`/model`、`/projects` 指令拉起 cursor 会话曾异常秒退
- CLI 守护进程未运行
- `CURSOR_API_KEY` 未配置

## 解决方案
- 重装守护进程
- 于 `~/.cursor-feedback/cli.json` 设默认模型 `composer-2.5` 并注入 Key 后恢复
- API Key 界面 Scope 标 Admin 属误标不影响 CLI

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/067.md
- 验证证据：src=苏州市房地产监测V3/102.md
- 涉及文件：settings.json、feishu-config.json、README_CN.md、cli-launcher.js、daemon-install.js、mcp-server.js、storage.json、mcp.json
- 来源会话ID：510299d4-6bde-4632-b032-8e625cd2800b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cursor_cli_bug",
  "source_extraction_id": "0bc36deba868432392862204dc43a510",
  "version": 2,
  "memory_type": "entities"
}
-->