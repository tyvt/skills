# Summary
用户复盘指出主控盲搜/整读复发，根因为 agent-guard exploration 默认 enabled:false/mode:'off'（AGENTS.md 失实称 warn 灰度）。2026-11-14 修复：config.js 改为 enabled:true/mode:'warn'（dsh 子模块提交 ba1fadce），AGENTS.md 第16行删失实表述并新增子代理行号锚点规则，父仓提交计划文件 f161097a。selftest 110/0、integration 16/0 通过。用户确认实施前两项+第4项（子代理锚点），不加第3项。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 探索一律先派 dsh-explore，主控不碰 glob/grep 根目录。 本轮 4 次 glob 拒绝 + 2 次 grep 拒绝，全部可以避免。主控只做 read offset/limit 和 edit。

orchestrate op=full 的检索请求必须自带 -Recurse 和绝对路径，或在 request 里写明"用 Get-ChildItem -Recurse -Filter *.ts"，否则返回空/截断。本轮第一次 op=full 检索等于白跑。

plan_review 第一次就传 plan + plan_path 两个参数，不要只传 path 等报错；且首轮即只发"变更段 + 证据"，不发整篇。本轮 3 轮审核里至少 2 轮是重复补全。

子代理派发时给行号锚点：task-2 描述里应写"evaluation.ts 第 36/45/55/65/76/86/95/105/112/119/125/132/145/152/157 行是 mock 分支，逐条删"，而不是只给文件路径。否则 fork 子代理会因整读截断而放弃。

读取前先 grep -n 拿行号，再 read offset/limit ≤80。本轮 request.ts 289 行、evaluation.ts 284 行、form/index.vue 514 行都整读过，全部触发截断。

skill 按需加载，不要一次性全读：dsh-token-policy 被截断、tool-call-hygiene 被截断，说明加载时机太晚（在已经出错之后才读）。正确顺序是：开工先读 dsh-token-policy 的阈值段，出错后再读 tool-call-hygiene 的对应行。
出个修复方案
...
**assistant [peer=github.com-tyvt-skills]**: 事实已足够清晰。根因确认：**`agent-guard/config.js:62-64` 的 `exploration` 默认 `enabled:false, mode:'off'`——探索漂移拦截根本没开**，而 AGENTS.md 第 16 行却写"拦截已生效、warn 灰度中"，规则与实现脱节，这正是本会话主控盲搜/整读畅通无阻、复盘 7 类问题复发的机制根因。

现在写计划。按 4 段式骨架先出，再逐节 edit。
...
**assistant [peer=github.com-tyvt-skills]**: AGENTS.md 两处文案已改。现在改核心项：config.js 开 exploration 门禁为 enable:true / mode:'warn'。
...
**assistant [peer=github.com-tyvt-skills]**: dsh 子模块已提交（ba1fadce）。现在父仓提交计划文件。
...
**assistant [peer=github.com-tyvt-skills]**: 两处提交完成。更新 todo 收尾。
...
**assistant [peer=github.com-tyvt-skills]**: ...## 验证（已跑）

- `node --check config.js` 通过
- `selftest.mjs`：**110 passed / 0 failed**（含"子代理豁免三规则全 pass"仍绿）...
...
**assistant [peer=github.com-tyvt-skills]**: ...plan/agent-guard-exploration-enforce-20261114.md`）
- 工作区另有大量其他会话遗留的未提交改动（mcp-gateway、langgraph 等），**不在本任务范围，未触碰**。

## 待定

- 当前是 **warn**（仅告警）。观察一段无误伤后，可评估升级到 `block` 硬拦截——那才是完全"靠机制"而非"靠自觉"。需要时可再出一版升级计划。

<!-- MEMORY_FIELDS
{
  "event_name": "agent_guard探索门禁开启修复",
  "goal": "修复探索门禁失效",
  "summary": "用户复盘指出主控盲搜/整读复发，根因为 agent-guard exploration 默认 enabled:false/mode:'off'（AGENTS.md 失实称 warn 灰度）。2026-11-14 修复：config.js 改为 enabled:true/mode:'warn'（dsh 子模块提交 ba1fadce），AGENTS.md 第16行删失实表述并新增子代理行号锚点规则，父仓提交计划文件 f161097a。selftest 110/0、integration 16/0 通过。用户确认实施前两项+第4项（子代理锚点），不加第3项。",
  "ranges": "0-5,32,61,71,73,80,82",
  "source_extraction_id": "30468be52d474b7589c81b3ca2b7200c",
  "version": 1,
  "memory_type": "events"
}
-->