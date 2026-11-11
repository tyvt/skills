# Summary
2026-11-11，dsh-cost-meter 新增 perStepLookup 规则：连续2步未命中>10k时下一步必须是一条SQL、窄读或模块内grep；selftest通过并已同步到安装副本，重启Web生效。源于用户建议2。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...- 现状：`reasoning-watchdog` 在 step 16（输出 4k 后）才提示。
- 建议：把阈值下沉到**流式 reasoning 阶段**（如单步 reasoning 超过 1.2k tokens 即注入「停止推演，调一次工具取事实」），并在连续 2 步 reasoning 超限时**强制下一次工具调用必须是查询类**（SQL / read offset / grep）。
- 配置化：`reasoning.maxTokensPerStep`、`reasoning.consecutiveBreach`。

### 建议 2：成本熔断分级 + 强制「查一条」
- 现状：cost-meter 在 step 12/16/17 提示，但只是通知。
- 建议：连续 2 步未命中 >10k 时，DSH 自动在下一步注入一条**最可能的取数动作**（如「先执行一条 `SELECT ... FROM ALL_TAB_COLUMNS`」），把「提示」变成「默认下一步」。

### 建议 3：grep 默认 scope 收敛
- 工具层：在 Vue 项目里，若本会话最近 read 过 `src/views/<模块>/**`，grep 的默认 path 建议到该模块；对 >20 matches 的结果**只回文件列表 + 每文件前 3 条**，全文落盘不回灌。...
...
**assistant [peer=github.com-tyvt-skills]**: The plugin already warns at 1.5k/3k. I’ll read the injection logic and the DBX gate so the new rules don’t duplicate what’s already there.
...
**assistant [peer=github.com-tyvt-skills]**: The meter already warns after a long step. What’s missing is a second-strike that forces a lookup, plus the skill gates the log actually needed. I’ll read the accumulator and the selftest so the new rule matches existing patterns.
...
**assistant [peer=github.com-tyvt-skills]**: The meter already warns once. I’ll add a second-strike rule that forces a lookup, then lock the skill gates the log called out.
...
**assistant [peer=github.com-tyvt-skills]**: The skill gates are in. Next I’ll confirm the meter’s second-strike rule still passes its selftest, and check how this plugin is actually installed so the source change takes effect.
...
**assistant [peer=github.com-tyvt-skills]**: The selftest passes. The running copy is a separate install under the web profile, so I’ll sync that file the same way the last threshold change was deployed.
...
**assistant [peer=github.com-tyvt-skills]**: The second-strike rule is in both the source and the installed copy, and the selftest passes. Two items from the analysis can’t be done from skills or this plugin, so I’ll record that and ask how to close out.
...
**assistant [peer=github.com-tyvt-skills]**: 已提交 `9271b5b8`，未推送。`git fetch` 连不上 github.com:443，ahead/behind 没核到；本地此前领先 4 个提交，这次是第 5 个。其余未提交改动原样留着。

落地的部分：

| 建议 | 落点 |
|---|---|
| 连续大未命中改成强制取数 | `dsh/cost-meter` 新增 `perStepLookup`：连续 2 步未命中 >10k 时，下一步必须是一条 SQL、窄读或模块内 grep。selftest 通过，并已覆盖到 `profiles\web\node_modules\dsh-cost-meter`，重启 Web 后新会话生效 |
| grep/read 默认保护 | `agent-cost-hygiene`：超 200 行只看前 40 行；grep 先缩到已读模块，超 20 条只留文件列表 |
| 先查一条再读代码 | `zentao-analyzer` 第 5 条改为阻塞项；`references/dbx.md` 给了 `ALL_TAB_COLUMNS` 和一行样本的固定 SQL |
| commit 后再构建、push 前预检 | `submodule-commit` 加第 0 步 fetch 与 behind 先 rebase，构建放在 commit 之后；gitlink 冲突取后代提交 |
| 多步先 todo | `dsh/AGENTS.md` 加一条：修改 + 验证 + 提交先 `todo_write` |

没做的两项，技能和这个插件做不到：

- **建议 1 的流式熔断**：插件只在 `agent/pre-step` 看到上一步的完整用量，看不到正在生成的 reasoning token。1.5k 的事后提醒已经在，真正的流式截断要改 DSH 宿主。
- **建议 10 的 reasoning 瘦身**：那是宿主的上下文回放，插件注入的消息改不了。

<!-- MEMORY_FIELDS
{
  "event_name": "cost-meter强制取数规则落地",
  "goal": "记录插件规则变更",
  "summary": "2026-11-11，dsh-cost-meter 新增 perStepLookup 规则：连续2步未命中>10k时下一步必须是一条SQL、窄读或模块内grep；selftest通过并已同步到安装副本，重启Web生效。源于用户建议2。",
  "ranges": "16-19,55,61,65,81,85,88,95-100",
  "source_extraction_id": "114cae7623bc498d9bf1b83f57880dd7",
  "version": 1,
  "memory_type": "events"
}
-->