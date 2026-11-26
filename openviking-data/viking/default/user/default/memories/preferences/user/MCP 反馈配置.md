- 在 `settings.json` 中设置 `autoRetry: true` 以同步 MCP
- 创建规则文件 `.cursor/rules/cursor-feedback.mdc` 以定义交互
- 卸载占用端口 61928 的守护进程以释放端口
- Feishu 仅响应 AI 推送卡片；空闲面板显示 "等待" 是正常的
- 重启 Cursor 以避免残留连接
- 涉及文件: mcp.json, settings.json, README_CN.md, mcp-server.js, feishu-config.json, feishu-bind.json, extension.js, feishu-setup.md
- 验证: src=苏州市房地产监测V3/179.md 和 src=苏州市房地产监测V3-rest/136.md; 会话: cd5047ad-a11b-498b-a646-759d7d3c8cb1

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：cd5047ad-a11b-498b-a646-759d7d3c8cb1


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: MCP 反馈配置",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 2,
  "memory_type": "preferences"
}
-->
