# Summary
2026-11-10，用户下达 Batch A1 任务修复 cost-meter 将三键全 0 步误记零成本。助手修改 C:\Users\Administrator\.dsh\cost-meter\lib\index.js（指向 D:\repository\skills\dsh\cost-meter 的链接，非 node_modules 安装包）：三键全 0 且无 cacheReadTokens 时仅记 absentSteps，不累加等效成本也不增加 steps，带 cacheReadTokens 的显式 0 仍按原逻辑累加；保留 15k 单步未命中提醒，新增 sessionEquivEarly 150,000 与 sessionEquivMid 1,000,000 两档累计等效提醒（原 8,000,000 保留）；equivOf 中 0.1 与 4 的注释改为「假设倍率，待计费校准」。selftest.mjs 用 session.v4.jsonl 真实夹具（48 个三键 0、seq 253、seq 286）全绿（cost-meter selftest: ALL PASS）。运行时（重启 Web 后新会话）未验证，本批不重启。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...md；真实日志
C:\Users\Administrator\Downloads\session.v4.jsonl（371 行）。

---

# Batch A：可立即执行（无前置依赖）

## A1. cost-meter 识别 absent 步（先做这项）

源码：`C:\Users\Administrator\.dsh\cost-meter\lib\index.js`
profile 通过 `file:../../cost-meter` 引用，改源码目录，不改 `node_modules\dsh-cost-meter`。

现状确认（不要重复调查）：
- `perStepUncachedBudget` 默认 15,000。**保持 15k，不要改成 45k。**
- `equivOf` 已是 `cacheRead×0.1 + uncached + output×4`。
- `sessionEquivBudget` 默认 8,000,000，每档只提醒一次，本会话到不了，等于不响。
- `readUsage` 把 `{inputTokens:0,outputTokens:0,totalTokens:0}` 当真 0，且 `steps += 1`。

改三处：
1. usage 为三键全 0 且无 `cacheReadTokens` 键时：不累加等效成本，只记 `absentSteps += 1`。四键真值（含 cacheRead 为 0 的显式 0）仍按原逻辑累加。
2. 保留 15k 单步未命中提醒。新增两档更早的累计等效提醒（现有只有 800 万一次），阈值自定但在注释里说明依据。
3. `equivOf` 里 0.1 和 4 的注释改为「假设倍率，待计费校准」，不要写成日志证据。

selftest（`selftest.mjs`，从 session.v4.jsonl 抠真实片段做夹具，不要手写构造）：
- 48 个三键 0 → 等效成本不增加，absentSteps = 48
- 未命中 45,272（seq 253）→ 触发 perStep 提醒
- 未命中 244 + cacheRead 65,152（seq 286）→ 不触发 perStep，但计入累计档

验收：`node selftest.mjs` 全绿；重启 Web；新会话日志里 absent 步不再被当成零成本。

## A2. skills 补表（不新写文档）

`D:\repository\skills` 是运行时源。**先确认 `C:\Users\Administrator\....
...
**assistant [peer=deepseek-harness-default-workspace]**: ## A1 已改，selftest 通过，运行时未验证

改的是 `C:\Users\Administrator\.dsh\cost-meter`，它是指向 `D:\repository\skills\dsh\cost-meter` 的链接。`node_modules\dsh-cost-meter` 不是链接，按边界没动。

`lib/index.js`：

- 三键全 0 且没有 `cacheReadTokens`：只加 `absentSteps`，不进等效成本，也不增加 `steps`。带 `cacheReadTokens` 的显式 0 仍按原逻辑累加。
- 保留单步 15,000。新增累计档 `sessionEquivEarly` 150,000、`sessionEquivMid` 1,000,000。原 8,000,000 还在。注释写明 15 万约等于 10 个单步预算，100 万比原来低一个数量级。
- 0.1 和 4 的注释改成「假设倍率，待计费校准」。

`node selftest.mjs`（在 cost-meter 目录）：`cost-meter selftest: ALL PASS`。夹具从 `session.v4.jsonl` 读出 48 条三键 0，以及 seq 253、seq 286。未验证：重启 Web 后的新会话。本批不重启。

## A2 已改

`C:\Users\Administrator\....

<!-- MEMORY_FIELDS
{
  "event_name": "cost-meter空用量步修复",
  "goal": "修复成本计量",
  "summary": "2026-11-10，用户下达 Batch A1 任务修复 cost-meter 将三键全 0 步误记零成本。助手修改 C:\\Users\\Administrator\\.dsh\\cost-meter\\lib\\index.js（指向 D:\\repository\\skills\\dsh\\cost-meter 的链接，非 node_modules 安装包）：三键全 0 且无 cacheReadTokens 时仅记 absentSteps，不累加等效成本也不增加 steps，带 cacheReadTokens 的显式 0 仍按原逻辑累加；保留 15k 单步未命中提醒，新增 sessionEquivEarly 150,000 与 sessionEquivMid 1,000,000 两档累计等效提醒（原 8,000,000 保留）；equivOf 中 0.1 与 4 的注释改为「假设倍率，待计费校准」。selftest.mjs 用 session.v4.jsonl 真实夹具（48 个三键 0、seq 253、seq 286）全绿（cost-meter selftest: ALL PASS）。运行时（重启 Web 后新会话）未验证，本批不重启。",
  "ranges": "2-10,93-97",
  "source_extraction_id": "06f0675731fa4c1ab8caf8db9c5023ff",
  "version": 1,
  "memory_type": "events"
}
-->