# Summary
2026-11-25 编排器 config.yaml 中全部 5 处失效 id workbuddy/space-bunny（不在网关清单内）被清除，替换为免费跨通道的 auto/workbuddy hy4flash-free。
# 2026-11-25 (Wednesday) ChatLog:
**user**: 2026-11-25 按网关现有 11 项模型清单重新分配编排器（dsh/langgraph-orchestrator/config.yaml）模型池：优先 hy4flash 免费版、其次积分版，高级任务用 grok4.7/kimi k3.1pro，composer2.5 分代码任务，并清除失效的 space-bunny 兜底 id。
**assistant**: 2026-11-25 完成 dsh/langgraph-orchestrator/config.yaml 模型池重分配（commit c33d4395 已推送 origin/main，远端 SHA 核对一致）。方案：①清除全部 5 处失效 id workbuddy/space-bunny（不在网关清单），替换为免费跨通道 auto/workbuddy hy4flash-free；②code_editor 主选改 cursor/composer-2.5（套餐量大、边际消耗低，承担高频代码生成），code_edit_with_signal 中间兜底也放 composer-2.5（主选仍 kimi-k3.1-pro）；...

<!-- MEMORY_FIELDS
{
  "event_name": "失效space_bunny兜底清除",
  "goal": "清除失效模型兜底",
  "summary": "2026-11-25 编排器 config.yaml 中全部 5 处失效 id workbuddy/space-bunny（不在网关清单内）被清除，替换为免费跨通道的 auto/workbuddy hy4flash-free。",
  "ranges": "0-2",
  "source_extraction_id": "95c35e1e3eab47f4b910788abbebf5b7",
  "version": 1,
  "memory_type": "events"
}
-->