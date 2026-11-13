# task-watchdog 长任务监控脚本
DSH 长任务监听脚本（2026-11-12 新建），位于 dsh/scripts/task-watchdog.ps1。

## 功能
- run_in_background 启动，写 .task-state/<name>.state.json
- 每 30 秒打心跳，超时打 STALL，结束记录 exitCode

## 验证
- 实测 5s 任务输出 running 2s/4s → done exitCode=0，状态文件正确
- 配套文档 task-watchdog.md 与 dsh-token-policy/SKILL.md 新增小节

## 背景
- 源自用户硬性要求：所有可能超过 1 分钟的任务必须加日志和监听，每半分钟检查状态，强制所有会话生效

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "脚本工具",
  "name": "dsh_task_watchdog",
  "source_extraction_id": "126e610f4e3542618cf613d408628d6e",
  "version": 1,
  "memory_type": "entities"
}
-->