# Summary
2026-11-11，dsh/AGENTS.md 加一条：修改+验证+提交先 todo_write，减少 reasoning 重述。源于用户建议8。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...对 submodule gitlink 冲突，预置「取后代提交」的解析策略（日志中 agent 手工判断 63d1e2c1a 是 1dd0f0d93 的后代，逻辑正确但可自动化）。

### 建议 8：多步意图提示 todo
- turn 开始时若识别到「修/改/实现/多文件 + 验证 + 提交」类意图，DSH 注入一次 `todo_write` 建议，把阶段目标外化，减少 reasoning 重述。日志 51 step 全程未用 todo 是明显信号。...
...
**assistant [peer=github.com-tyvt-skills]**: ...| 多步先 todo | `dsh/AGENTS.md` 加一条：修改 + 验证 + 提交先 `todo_write` |

没做的两项，技能和这个插件做不到：

- **建议 1 的流式熔断**：插件只在 `agent/pre-step` 看到上一步的完整用量，看不到正在生成的 reasoning token。1.5k 的事后提醒已经在，真正的流式截断要改 DSH 宿主。
- **建议 10 的 reasoning 瘦身**：那是宿主的上下文回放，插件注入的消息改不了。

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS.md的todo规范",
  "goal": "记录规范变更",
  "summary": "2026-11-11，dsh/AGENTS.md 加一条：修改+验证+提交先 todo_write，减少 reasoning 重述。源于用户建议8。",
  "ranges": "25-26,100",
  "source_extraction_id": "114cae7623bc498d9bf1b83f57880dd7",
  "version": 1,
  "memory_type": "events"
}
-->