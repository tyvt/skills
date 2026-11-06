# 飞书机器人发起 Cursor Feedback 配置
苏州市房地产监测V3 项目配置飞书机器人通过 cursor-feedback CLI 拉起会话并设默认模型。

## 配置结论
- API & SSH Keys → User API Key 生成的 Key 正确，列表 Scope 显示 Admin 为界面误标不影响 CLI 使用
- CURSOR_API_KEY 已生效，CLI 实测可正常响应
- 模拟飞书 /new 拉起会话已成功（不再 1 秒异常退出）；后续会话中守护进程已卸载（Windows 计划任务移除），手机主动发起任务需重新开启守护进程
- 默认模型已设为 composer-2.5（~/.cursor-feedback/cli.json）

## 使用方式
- 飞书可直接使用：`/new d:\repository\苏州市房地产监测V3 你的任务描述`、`/model` 查看切换模型、`/projects` 查看项目目录
- 最终确认：在飞书发 `/new d:\repository\苏州市房地产监测V3 回复收到`

## 涉及文件
- ~/.cursor-feedback/cli.json
- d:\repository\苏州市房地产监测V3\.cursor\rules\cursor-feedback.mdc
- C:\Users\Administrator\.cursor 及相关扩展、settings.json、feishu-config.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：510299d4-6bde-4632-b032-8e625cd2800b
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_feedback_cli",
  "source_extraction_id": "40b6465dd8ab4f0bb97d559feedd42fc",
  "version": 2,
  "memory_type": "entities"
}
-->