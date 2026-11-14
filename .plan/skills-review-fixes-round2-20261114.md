---
status: approved
human_confirmed: true
review: plan_review PASS 76/100 (cursor/grok-4.7@256k); 用户补 2 点严谨度后“补齐后可直接执行”
human_decisions: 删3脚本+改引用同commit; agent-guard sessionReads/sessionAsks FIFO200(attempts不改); cost-meter acc LRU2000; orchestrator-gate 1000; dcwhc 200; mcp-gateway不改
---

# 修复计划（第二轮）：删废弃脚本 + 插件 Map 淘汰与 dcwhc 小瑕疵（2026-11-14）

## 一、前因后果
接续上一轮审查修复。用户要求：①废弃脚本该删就删、同步改引用；②治理未触碰插件的 Map 无淘汰与 dcwhc 小瑕疵。均为可逆代码/文档改动。

## 二、现状与证据
### A. 废弃脚本（3 个，均无 live 代码引用；仅文档/历史记忆引用）
- `zentao-analyzer/zentao_fetch.py`、`zentao-analyzer/zentao_resolve.py`：SKILL 已标注"已被强制改密挡住，不要用"。引用点仅 `zentao-analyzer/SKILL.md:25`（表格行）+ 自身文件头；`zentao-resolve.mjs` 为现行替代。memory-migration-archive / openviking-* 内引用为**历史记忆数据，不改**。
- `cursor-model-routing/validate-offtask.ps1`：现行为 `.py` 版 `validate-offtask-signal.py`（SKILL.md:50 引用的是 .py）。引用点仅 `cursor-model-routing/REPORT.md:6`、`:236`（写成 `validate-offtask.ps1`）。

### B. 插件 Map 无淘汰（长驻轻微增长，非泄漏）— 复用 agent-guard 既有 LRU 范式
- `agent-guard/lib/index.js`：`sessionReads`(:171)、`sessionAsks`(:173)、`attempts`(:479) 无上限；`sessionDrift`(:176-190) 已有 `DRIFT_MAX_SESSIONS=200` 淘汰范式可复制。
- `cost-meter/lib/index.js`：`acc`(:133) 按 sessionId 累积无淘汰。
- `orchestrator-gate/lib/index.js`：`sessionWholeReads`(:583)、`sessionHasPlan`(:585) 无上限；`sessionStreaks`(:587) 已有上限 500（`FANOUT_STREAK_MAX_SESSIONS`）范式可复制。
- `mcp-gateway/lib/index.js:43`：模块级 `connections` Map，dispose 后未 delete key，热重载残留（review-C :68）。

### C. dcwhc 小瑕疵
- `dcwhc/lib/context-store.mjs`：`entries` 只按 account+peer 去重、无数量/时间淘汰（token 记录随会话增长，文件小）。
- （feishu-bridge 漏 catch 风险属"可抽出封装"，改动面大、收益低，**本轮不做**，仅记录。）

## 三、实施方案
1. **删废弃脚本 + 改引用**：
   - `git rm zentao-analyzer/zentao_fetch.py zentao-analyzer/zentao_resolve.py cursor-model-routing/validate-offtask.ps1`。
   - `zentao-analyzer/SKILL.md:25`：删除 `zentao_fetch.py / zentao_resolve.py` 表格行（保留 `zentao-resolve.mjs` 行）。
   - `cursor-model-routing/REPORT.md:6`：`validate-offtask.ps1` → `validate-offtask-signal.py`；`:236`：`pwsh validate-offtask.ps1` → `python validate-offtask-signal.py`。
2. **agent-guard Map 淘汰**：给 `sessionReads`/`sessionAsks` 复制 `sessionDrift` 的 **FIFO 淘汰**（常量 `MAP_MAX_SESSIONS=200`，插入序最旧淘汰；已存在 key 再 get 不刷新顺序。最坏淘汰仍活跃会话状态——可由后续事件重建，安全）。
   - **`attempts` 本轮不改**：取证确认其 key=`provider|turn|step`，是**单步内 llm-retry 升级计数**（非会话累计预算），FIFO 归零会重置该步升级计数、可能使同一步超出预期恢复预算——**安全语义会变**。故按用户指示"先查清不改"，仅加注释说明其增长受"出错步数"天然约束，留待单独评估。
3. **cost-meter acc 淘汰（保护活跃会话）**：无 `session/end` 事件、无 dispose 钩子，故**LRU-by-touch + 上限 2000**。取证：acc 的**写入入口共 3 处**（`index.js:151/179/227`，均在事件处理里 `acc.get(id)` 后 `set`）；`index.js:91` 是 `latestAcc.get` 的只读快照（不改状态、无需 touch）。改造：3 处写入入口统一改为 `touchAcc(id)` —— 命中则 `acc.delete(id); acc.set(id, a)` 刷新为最近使用；新增前若 `size>=ACC_MAX_SESSIONS(2000)` 删 `acc.keys().next().value`（最久未使用）。**活跃会话因持续 touch 不被淘汰**。
4. **orchestrator-gate Map 淘汰**：`sessionWholeReads`/`sessionHasPlan` 用 **FIFO 上限 1000** 淘汰。**余量依据**：现有同类上限 `FANOUT_STREAK_MAX_SESSIONS=500`（sessionStreaks，:45/:589）已被工程接受；1000 = 其 2×，给长驻进程多会话留足冗余（并发峰值远低于此，且淘汰最坏仅"漏一次重复拦截"，偏宽松不误阻断）。淘汰后新会话从 false 起算。
5. **mcp-gateway：无需改动**。取证发现 `ctx.on('dispose')`(:185-189) **已**逐个 `conn.dispose()` 后 `connections.clear()`；且 key 为 `serverName`（进程级复用，非按会话），clear 语义正确。（review-C 的 "dispose 未 delete" 一处属误读，本轮撤销该改动。）
6. **dcwhc context-store 淘汰**：`entries` 为数组，`receivedAt` 为 `Date.now()` 数值（现存写入均一致、无缺失）。加 `MAX_ENTRIES=200`：`rememberContext` 内 push 后若 `length>200`，按 `receivedAt` 升序淘汰最旧（`receivedAt` 缺失按 0 处理、并列保持插入序）；不影响按 account+peer 的查找。

## 四、验证计划
- 删除后全仓复查引用：`Select-String zentao_fetch|zentao_resolve|validate-offtask`（排除 openviking-*/.task-state/.plan/memory-archive），应无 live 引用；`grep` 确认无脚本 import 被删文件。
- 改动插件跑各自 `node dsh/<plugin>/selftest.mjs`：agent-guard、cost-meter、orchestrator-gate、dcwhc 全绿（mcp-gateway 不改，仍跑一次确认未受影响）。
- **补淘汰断言用例**：
  - agent-guard：造 >200 会话，断言 sessionReads/sessionAsks size≤200 且最旧被淘汰（attempts 未改，回归原有 selftest 全绿即可）。
  - cost-meter：**跨边界验证**——先 touch 一个活跃会话 A（多次事件），再插入 2000 个新会话事件把容量撑到上限，断言 acc size≤2000 且 **A 仍存活**（touch 后不被淘汰）、仅最早空闲会话被删。
  - orchestrator-gate：造 >1000 会话，断言 size≤1000、淘汰后新会话首次判定 false（偏宽松、不误阻断）。
  - dcwhc：造 >200 entries（含 receivedAt 缺失/并列），断言 size≤200、最旧淘汰、按 account+peer 查找语义不变。
- **引用复查补强**：`Select-String` 排除 `.git/`、`.task-state/`、`.plan/`、`memory-migration-archive/`、`openviking-data/`、`openviking-memory/`（后者为历史记忆数据，仅人工确认非 live 代码引用）；另跑 `git ls-files` 后对每个被删脚本名做 import/require/exec/spawn 检查，防动态引用漏检。
- `node --check` 全部改动文件；`git diff` 复核仅预期变更；确认 openviking-memory/openviking-data 0 改动。
- 删脚本与改引用**同一 commit**；收尾按用户选择提交/推送。

> 变更受 git 管理，git revert 即可。
