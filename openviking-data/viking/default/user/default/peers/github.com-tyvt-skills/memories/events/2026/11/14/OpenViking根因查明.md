# Summary
2026-11-14 查明 OpenViking P1-1『失败3次仍调用』根因：并非 OpenViking 服务端问题（审计库 usage_audit.sqlite3 共1024条中 /mcp 19次全200、search 服务端15次成功仅1次400参数多余字段），而是 Agent 侧两条路径——①参数形状错（queries→query 类，模型原样重试）；②超时/慢响应（search p-max 约5.7s、本会话 session_search 曾120s超时）被判失败后同形态重试。agent-guard 仅有 tools.guard() 调用前钩子，无法观测上一次调用结果做同工具失败计数。与既有两份已批准方案（openviking-optimization 成本、openviking-proactive-query 查询率）不重复，属独立失败重试循环问题。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...P1-3	ask 拆两轮	计划确认轮合并“实施 + 提交方式”	省一轮等待（本次 ~15 分钟）
P2-1	首轮 glob 被拒后 aborted 整个 turn	被拒即窄化重试，不 abort	回收 Turn 1 的 1.5 分钟 + 20k

优化通用问题，项目级别的问题先不处理,openbviking的问题查明原因，先出方案
...
**assistant [peer=github.com-tyvt-skills]**: `request_audit` is the detailed per-request table. Let me query for OpenViking tool failure patterns — look for error_code/status and repeated failures, and caller breakdown.
**assistant [peer=github.com-tyvt-skills]**: Interesting. The audit shows:
- **caller=None (952)** — most requests uncategorized (this is exactly the A0 observability gap noted in the prior plan)
- Only 23 NOT_FOUND (the profile.md 404 issue) + 1 INVALID_ARGUMENT
- `/mcp` route: 19 requests

**Critically: the `request_audit` table does NOT record tool-call failures at the agent side.** It records server-side requests. So "同一 MCP 工具失败 3 次" is an **agent-side retry-loop** phenomenon — the audit DB can't directly show it because the MCP tool failures are agent-tool-layer, not OpenViking server requests.

This is a key finding. The failure the user describes ("OpenViking 失败 3 次仍调用") happens at the **agent tool-call layer** (my side), not in the OpenViking server. Let me confirm by checking `/mcp` route details and whether there's a separate agent-side log. Let me also check the `find` route — only 1 request but the prior plan said find errors aren't recorded.
**assistant [peer=github.com-tyvt-skills]**: Key finding crystallizing: **`/mcp` requests are all POST 200** (the MCP transport succeeds), and **server-side search calls all return 200**. There are **no server-side repeated failures**. So the "OpenViking 失败 3 次仍调用" is definitively **not** an OpenViking server problem — it's an **agent-side behavior**: the agent's MCP client-side tool call fails (or the model perceives failure / times out / gets a validation error), and the model retries the *same* tool call 2-3 times.

This is the correct root-cause framing. The failure is at the **agent tool-call layer / model behavior**, and there are two sub-causes:
1. **Param-shape errors** (like `queries` vs `query`, the 1 INVALID_ARGUMENT) → already partially fixed by rules.js ARG_ALIASES, but only for `search`, deterministic repair exists.
2. **Model retry-loop** — when an MCP tool call errors and the model has no rule telling it "switch strategy after 1 failure," it retries identically. This is a **guard gap**: no hook enforces "same tool failed → change form."

Let me verify the reference instance — search session history for the specific "失败 3 次仍调用" evidence to cite concrete data. Also confirm whether there is any existing tool-failure counter / retry guard in agent-guard index.js.
**assistant [peer=github.com-tyvt-skills]**: `index.js` has `tools.guard()` hooks and exploration drift detection, plus `agent/request-error` provider-retry — **but no "same tool failed N times → block/tell to switch strategy" rule.** That's the concrete gap for P1-1.

`session_search` timed out (OpenViking latency — ironic, itself an instance of the problem). I'll skip further OpenViking dependencies per P1-1's own lesson ("失败1次即换"). I have enough from the audit DB.

Let me confirm the exploration-drift logic shape (to design a parallel "tool-failure-drift" rule) by reading the relevant index.js region and the decideExplorationDrift rules section.
**assistant [peer=github.com-tyvt-skills]**: I now have a clear architectural understanding. `ctx.tools.guard()` is the right hook point to add a tool-failure retry gate. But `tools.guard()` fires **pre-execute** (before the call), so it can't see the *result* of the prior call. A "same tool failed 3 times" rule needs to observe **tool results** (post-execute) — that's a different hook (`tools/post-execute` or a result stream).

This is important for the plan's accuracy. Let me check what post-execute / result hooks agent-guard subscribes to. Let me grep for `post` and `result` in index.js.
...
**assistant [peer=github.com-tyvt-skills]**: 全部完成。总结如下。

## 做了什么

**1. 范围界定**：按你的要求 `项目级不处理`——**P0-3（测试入口 npx vitest vs bun --cwd tools/testing）跳过**（已核实本仓无 `tools/testing`/bun workspace，确属他仓问题）。

**2. OpenViking P1-1「失败 3 次仍调用」根因（查了 `usage_audit.sqlite3` 1024 条明细）**：
- **不是 OpenViking 服务端问题**：`/mcp` 19 次全 200，`search` 服务端 15 次成功、仅 1 次 400（参数多余字段）。服务端几乎全绿。
- 真正失败在 **Agent 侧两条路径**：① 参数形状错（`queries→query` 类，模型原样重试）；② **超时/慢响应**（实测 search p-max ~5.7s，本会话 `session_search` 曾 **120s 超时**）被模型判为失败后同形态重试。
- **硬点缺口**：AGENTS.md 只有「DBX 禁止连试三次」，未覆盖 OpenViking；agent-guard 只有 `tools.guard()`（调用前），**看不到上一次调用结果**，无法做「同工具失败计数」。
- 与既有两份已批准方案（`openviking-optimization`、`openviking-proactive-query`）不重复——那是成本/查询率问题，P1-1 是**失败重试循环**，第三个独立问题。...

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking根因查明",
  "goal": "记录P1-1调查结果",
  "summary": "2026-11-14 查明 OpenViking P1-1『失败3次仍调用』根因：并非 OpenViking 服务端问题（审计库 usage_audit.sqlite3 共1024条中 /mcp 19次全200、search 服务端15次成功仅1次400参数多余字段），而是 Agent 侧两条路径——①参数形状错（queries→query 类，模型原样重试）；②超时/慢响应（search p-max 约5.7s、本会话 session_search 曾120s超时）被判失败后同形态重试。agent-guard 仅有 tools.guard() 调用前钩子，无法观测上一次调用结果做同工具失败计数。与既有两份已批准方案（openviking-optimization 成本、openviking-proactive-query 查询率）不重复，属独立失败重试循环问题。",
  "ranges": "4,54-67,132-136",
  "source_extraction_id": "363a1d87d42341af988d83cfc2b26685",
  "version": 1,
  "memory_type": "events"
}
-->