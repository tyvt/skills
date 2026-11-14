# Summary
2026-11-14 完成多插件 Map 淘汰治理并提交 4e25406e：agent-guard sessionReads/sessionAsks 加 FIFO 上限 200；cost-meter acc 改 LRU-by-touch 上限 2000 保护活跃会话；orchestrator-gate sessionWholeReads/sessionHasPlan 加 FIFO 上限 1000；dcwhc context-store entries 上限 200 按 receivedAt 淘汰；mcp-gateway 取证已有正确 dispose（ctx.on('dispose') 逐个关闭并 clear）撤回改动；各插件补淘汰断言 selftest 全绿。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 废弃脚本该删就删，引用的地方对应修改，确保没有使用的地方。token-guard/agent-guard 等未触碰插件的 Map 淘汰、dcwhc 小瑕疵也治理
...
**assistant [peer=github.com-tyvt-skills]**: Plan approved & human-confirmed ("补齐后可直接执行"). Now implement. Update todos and start.
...
**assistant [peer=github.com-tyvt-skills]**: Pushed successfully — local `4e25406e` == remote `origin/main`. Round 2 complete.
...
**assistant [peer=github.com-tyvt-skills]**: ...**2. 插件 Map 淘汰（按你的复核意见定稿）**
| 插件 | 处理 | 依据 |
|---|---|---|
| agent-guard | `sessionReads`/`sessionAsks` FIFO 上限 200 | 复制已有 sessionDrift 范式 |
| agent-guard `attempts` | **不改**，加注释 | 取证＝`provider\|turn\|step` 单步升级计数，FIFO 归零会削弱限流，按你指示先查清不动 |
| cost-meter `acc` | **LRU-by-touch 上限 2000** | 无 session/end 事件，LRU 保护活跃会话不被误清成本 |
| orchestrator-gate | `sessionWholeReads`/`sessionHasPlan` FIFO 1000 | 现有 500 上限的 2×，淘汰偏宽松不误阻断 |
| mcp-gateway | **不改** | 取证发现 `ctx.on('dispose')` 已正确逐个 dispose+clear，review-C 该处属误读 |
| dcwhc context-store | entries 上限 200（receivedAt 最旧淘汰） | 修复 `cachedContext` 原返回 `undefined` 语义（我初版误写 null，已修正） |

**3. 每项补淘汰断言 selftest（全绿）**
- agent-guard **110/110**（+sessionReads FIFO=200 断言）
- cost-meter **全 PASS**（+LRU：size=2000、hot 存活、s0 淘汰）
- orchestrator-gate **195 checks**（+FIFO：size≤1000、旧淘汰、新会话不误拦）
- dcwhc **79/79**（+context 200 淘汰，隔离 DSH_HOME 不污染）...

<!-- MEMORY_FIELDS
{
  "event_name": "插件Map淘汰治理完成",
  "goal": "治理插件内存增长",
  "summary": "2026-11-14 完成多插件 Map 淘汰治理并提交 4e25406e：agent-guard sessionReads/sessionAsks 加 FIFO 上限 200；cost-meter acc 改 LRU-by-touch 上限 2000 保护活跃会话；orchestrator-gate sessionWholeReads/sessionHasPlan 加 FIFO 上限 1000；dcwhc context-store entries 上限 200 按 receivedAt 淘汰；mcp-gateway 取证已有正确 dispose（ctx.on('dispose') 逐个关闭并 clear）撤回改动；各插件补淘汰断言 selftest 全绿。",
  "ranges": "0,48,236,241-246",
  "source_extraction_id": "54d36b8afaa7411a8927f19ab739216e",
  "version": 1,
  "memory_type": "events"
}
-->