# Summary
用户在 2026-11-10 建议在 AGENTS.md 阈值条补充 grep 优先限定目标业务目录（seq 85 全仓 grep 约 16–17k 未命中暴露「窄 grep」规则未执行）。助手在 AGENTS.md 阈值条新增「grep 优先限定目标业务目录；全仓/跨目录 grep 必须先缩范围或走 orchestrate」，并将全仓 grep 从 orchestrate 强制清单移至缩范围规则。已提交 34ef5059。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...cost-meter 阈值 15k→10k 这次必须落地。连续三轮未执行，这条已经不是“建议”，是方案 3.2 的验收项。

DBX 回写封装成脚本，替代“靠文档提醒”。文档已证明管不住。

AGENTS.md 阈值条补一句：grep 优先限定到目标业务目录，全 src/** 的 grep 必须先缩范围或走 orchestrate。

末尾提问违规：这条没成本，但违反了核心规范第 5 条，重读即可。
...
**assistant [peer=deepseek-harness-default-workspace]**: 脚本自测通过。现在把 DBX.md 回写段指向脚本，并补 AGENTS.md 窄 grep 规则：
...
**assistant [peer=deepseek-harness-default-workspace]**: 落地完成。改动状态：`.dsh` 仓库里 AGENTS.md 已改（另有两个非本次的脏文件），skills 仓库有 DBX.md 改动 + 新脚本。
...
**assistant [peer=deepseek-harness-default-workspace]**: ...3. **AGENTS.md 窄 grep 规则**：阈值条新增「grep 优先限定目标业务目录；全仓/跨目录 grep 必须先缩范围或走 orchestrate」，全仓 grep 从 orchestrate 强制清单中移到缩范围规则里。...

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS窄grep规则补充",
  "goal": "补充窄grep规则",
  "summary": "用户在 2026-11-10 建议在 AGENTS.md 阈值条补充 grep 优先限定目标业务目录（seq 85 全仓 grep 约 16–17k 未命中暴露「窄 grep」规则未执行）。助手在 AGENTS.md 阈值条新增「grep 优先限定目标业务目录；全仓/跨目录 grep 必须先缩范围或走 orchestrate」，并将全仓 grep 从 orchestrate 强制清单移至缩范围规则。已提交 34ef5059。",
  "ranges": "13,42,47,58",
  "source_extraction_id": "7cbade9e69fc4f3fb8d82d9259412d8d",
  "version": 1,
  "memory_type": "events"
}
-->