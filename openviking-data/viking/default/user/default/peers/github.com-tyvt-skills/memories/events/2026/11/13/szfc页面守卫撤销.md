# Summary
用户明确表示不需要业务级 szfc-page-guard skill，助手将其删除，定位顺序与lint模板保留在 zentao-analyzer 双写 (2026-11-13)
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: szfc-page-guard是干嘛的？我不需要业务级别的
**assistant [peer=github.com-tyvt-skills]**: 明白，`szfc-page-guard` 是我刚按计划新建的「页面调试守卫」skill（页面定位顺序/截图等待策略/lint 模板），确实带了业务仓色彩。你不需要就撤掉：定位顺序与 lint 模板已双写在 `zentao-analyzer`，只留它即可。
...
**assistant [peer=github.com-tyvt-skills]**: 实施完成，`szfc-page-guard` 已按你要求撤销。汇总：

**已落地**
| 项 | 落点 | 状态 |
|---|---|---|
| AGENTS.md 索引三行 | [dsh/AGENTS.md](dsh/AGENTS.md)（第 5-8 行，指向 zentao-analyzer） | ✅ 已生效（系统已回读新版） |
| P0-1 二次 ask 拦截 | [ask-guard.js](dsh/agent-guard/lib/ask-guard.js)（纯函数）+ [index.js](dsh/agent-guard/lib/index.js) 接线 + [cordis.patch.yml](dsh/agent-guard/cordis.patch.yml) `askGuard.mode: warn` 灰度 | ✅ 初始 warn，不阻断 |
| P0-3 preflight | 按你选择**暂缓**，设计（单键 session_id schema）留在计划附录 | ⏸ |
| P0-2/P0-4 skill | [zentao-analyzer/SKILL.md](zentao-analyzer/SKILL.md) 增补「定位顺序」+「lint 命令模板」；szfc-page-guard 已删除 | ✅ |
| 灰度切换脚本 | [ask-guard-promote.ps1](dsh/scripts/ask-guard-promote.ps1)（误伤率统计 + `-Mode block/-Apply` 切换，pwsh 7+） | ✅ |

**验证**：selftest 90/90 全绿（含 8 条 ask-guard 用例：补问 missing→block、合法二次 ask 不拦、高危豁免、跨 phase 不拦、mode 三档）、integration-test 16/16 全绿。构建基线不适用（本仓无 build 流程），以 selftest/integration-test 为验证门槛。

**注意**：工作区还有大量**本次无关的预存在改动**（cost-meter/orchestrator-gate/token-guard 等其他插件、openviking-data 向量库），提交时需只挑本次范围（`dsh/AGENTS.md`、`dsh/agent-guard/*`、`dsh/scripts/ask-guard-promote.ps1`、`zentao-analyzer/SKILL.md`、`.plan/`）。

<!-- MEMORY_FIELDS
{
  "event_name": "szfc页面守卫撤销",
  "goal": "记录skill撤销决定",
  "summary": "用户明确表示不需要业务级 szfc-page-guard skill，助手将其删除，定位顺序与lint模板保留在 zentao-analyzer 双写 (2026-11-13)",
  "ranges": "111-112,120",
  "source_extraction_id": "85402565e2e74988af5075c4c48ab189",
  "version": 1,
  "memory_type": "events"
}
-->