# Summary
2026-11-24，重叠分析中发现 AGENTS.md 引用的 concise-report（收尾规则）与 dsh-explore（探索子代理）两个 skill 都不在 ~/.dsh/skills，本会话无法加载，属于规则指向不存在 skill 的断链，建议补链接或把规则内联进 AGENTS.md。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 分析一下当前的skill或者插件，有没有重叠重复？
...
**assistant [peer=github.com-tyvt-skills]**: ...## 三、比重复更值得注意：断链

**6. AGENTS.md 引用了两个未链接的 skill**
- `concise-report` —— 收尾规则「按 concise-report」明确引用
- `dsh-explore` —— 探索纪律多处要求派它做子代理

两者都**不在 `~/.dsh/skills`**，本会话无法加载。这不是重复，而是规则指向了不存在的 skill——建议要么补链接，要么把规则内联进 AGENTS.md。

## 小结

真正可清理的重复只有 `agent-cost-hygiene` 一个（未生效 + 已被覆盖）；`clarify-first`/`decision-options`、`web-deploy`/`deploy-env` 是清晰互补，不算重复。最该修的是第 6 项断链和第 2 项自愈双轨。

本轮只读分析，未改动任何文件。要不要我把其中某几项（比如补链 `concise-report`/`dsh-explore`、或清掉 `agent-cost-hygiene`）做成计划去实施？

## 状态更正（2026-11-24 复核）
`concise-report`、`dsh-explore` 现已链接到 ~/.dsh/skills 并可加载；`agent-cost-hygiene` 已由 commit 8872b3b4 删除。上述断链/未清理描述为当时快照，不再适用。

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS引用断链发现",
  "goal": "发现规则引用断链",
  "summary": "2026-11-24，重叠分析中发现 AGENTS.md 引用的 concise-report（收尾规则）与 dsh-explore（探索子代理）两个 skill 都不在 ~/.dsh/skills，本会话无法加载，属于规则指向不存在 skill 的断链，建议补链接或把规则内联进 AGENTS.md。",
  "ranges": "21,36-39",
  "source_extraction_id": "f606424bb52a4330b267945b793d7552",
  "version": 1,
  "memory_type": "events"
}
-->