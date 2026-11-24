# AGENTS.md 并行扇出策略
DSH 的 AGENTS.md 中规定会话并行执行路径的条款，2026-11-24 依据全库 A/B 实测改为首选 orchestrate。

## 实测数据（全库 1348 会话）
- 口径：contextActivity.days.*.tools 计数 + agentTeam.tasks>0 判定真实建团
- 真实建团（spawn_teammate/workflow）：35 会话（2.6%）、112 任务，均 253 步、16.0k 等效/步、命中率 0.925
- 仅用 orchestrate：267 会话，均 93 步、8.9k 等效/步、命中率 0.957（三组最优）
- 纯串行：751 会话，11.1k 等效/步、命中率 0.869；workflow 全库仅 41 次调用

## 结论与决定
- spawn_teammate/workflow 性价比为负：teammate 独立上下文每步全量重放系统提示与工具目录，父会话还需轮询收结果
- 判定禁用合理，orchestrate 是数据最优的并行路径

## 2026-11-24 条款改动（D:\repository\skills\dsh\AGENTS.md，即 ~/.dsh/AGENTS.md）
- 并行扇出条款：首选改为 orchestrate {op:"full"}；spawn_teammate/workflow 标注已全预设禁用、仅 full-tools 可用且默认不选
- 异构多模型条款：standard 会话需异构模型时改走 orchestrate 子任务或回退主控，workflow agent() 限 full-tools
- 改动以提交 50ab99af 推送 origin/main 并核对远端一致；系统已热重载新版条款，收尾校验无后台任务残留
- 纯 Markdown 规则文档，未执行构建；决策记忆（agentTeam.tasks>0 真实建团口径、contextActivity.tools 含 selftest 污染）已提交后台提取

## 计数口径教训
- contextActivity.tools.spawn_teammate.n 计数含 selftest 污染（A 组虚高到 323），不能作为建团依据
- 真实建团须以 agentTeam.tasks>0 判定（35 会话）

<!-- MEMORY_FIELDS
{
  "category": "规范",
  "name": "agents_md_fanout_policy",
  "source_extraction_id": "14d7b62e0fb2469b86d6f56aa832608c",
  "version": 2,
  "memory_type": "entities"
}
-->