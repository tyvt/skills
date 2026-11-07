- 使用 Cursor Feedback 插件与 MCP 服务进行 AI 反馈闭环（飞书回复卡片回传）
- 偏好 `settings.js` 中 `autoRetry: true` 开启超时续期，MCP 连接端口 61927 正常
- 项目规则文件 `.cursor/rules/cursor-feedback.mdc` 已添加
- 日常使用：面板空闲显示「等待 AI 请求反馈」为正常；飞书仅可回复 AI 推送卡片；手机主动发起任务需重启守护进程并 `/new 任务描述`
- 建议重启 Cursor 让 MCP 进程干净重启

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Cursor Feedback工具链",
  "source_extraction_id": "6047e8f2b38e4d049415ae7eca313119",
  "version": 1,
  "memory_type": "preferences"
}
-->