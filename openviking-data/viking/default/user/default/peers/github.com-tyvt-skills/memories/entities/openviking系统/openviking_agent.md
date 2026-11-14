# OpenViking Agent
OpenViking 本地 agent，基于 DSH Web 运行，具备主动检索（search）与记忆注入能力。

## 问题描述
- 2026-11-14 诊断发现 agent 主动查询率实质为 0%：约24小时审计窗口内 caller=user 的 search 调用为 0 次，会话消息写入达 924 次
- 根因：dsh-memory-plugin 每轮自动注入记忆上下文（auto-recall），抑制了 agent 主动调用 search 的动力
- 已存在批准方案 .plan/openviking-optimization-20261113.md 阶段 C「行为」针对此问题

## 解决方案
- L1（已落地 2026-11-14）：profile-inject.mjs 的 render() 末尾追加 <openviking-hint> 固定提示行，AGENTS.md 禁止段扩展"找不到文件先 search"为主动检索要求
- L1 提示句：`<openviking-hint>本会话若涉及排障/查历史/设计方案，先调用 mcp_gateway(server=openviking, tool=search, mode=context, detail=abstract) 再动手；下方注入的上下文可能不全。不要据此直接下结论。</openviking-hint>`（挂在 render() 末尾，计入 token 预算，块被裁空时一并丢弃）
- L1 提交：OpenViking `57ebe7aa`（源+claude-code+codex 副本 3 文件，+18/-3）、skills `ee78fe00`（`dsh/AGENTS.md:70` +1/-1），均仅本地 commit 未推送（用户选「仅提交」）
- L1 方案文档：`.plan/openviking-proactive-query-20261114.md` v2.1（plan_review PASS 74/100，3 条 P1 已吸收），三层 L1 行为规则/L2 guard 软提醒/L3 度量闭环
- 生效提示：插件 ESM 静态 import 无 hot-reload/watch，profile-inject 改动需重启 DSH Web 进程才加载（AGENTS.md 规则下个会话即生效）；未擅自重启 Web GUI
- L2/L3（待议）：含探索优先级边界、每轮注入验证、可证伪验收标准、阶段 B 依赖标注

## 重启验证（2026-11-14）
- 2026-11-14 10:00 改文件后 DSH Web 新进程于 10:02–10:03 启动，`/health` 返回 `{"status":"ok","healthy":true}`；对运行时安装副本断言得 `HINT_PRESENT=true`，`<openviking-hint>` 在 profile 块末尾
- 重启后新会话首批请求在 `request_audit` 记为 `caller=profile-inject`（fs/ls、content/read、skills 均 200），证明新代码在真实链路生效
- `caller=user` 基线仍为 0（预期，需 agent 后续主动 search）；两处 commit（OpenViking `57ebe7aa` / skills `ee78fe00`）保持本地未推送

## 关键数据
- usage_audit 数据库位于 C:\Users\Administrator\.openviking\data\_system\usage_audit\usage_audit.sqlite3
- request_audit 表含 caller 字段（auto-recall/probe-test/user）
- retrieval_hourly 表记录插件自动注入的检索（6-38次/小时，含无人时段）

<!-- MEMORY_FIELDS
{
  "category": "OpenViking系统",
  "name": "openviking_agent",
  "source_extraction_id": "fa049ff27bf94cea909ff331a50cdbbf",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "entities"
}
-->