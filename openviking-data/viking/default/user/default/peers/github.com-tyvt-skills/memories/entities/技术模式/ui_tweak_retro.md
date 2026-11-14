# 9条UI微调成本复盘与优化方案
2026-11-12 用户对 9 条 UI 微调任务（1M token／5 轮 plan_review／21 分钟）做复盘，产出 DSH 编排器工具链优化方案文档 .plan/session-17421cb4-4019-446b-be29-a38638fdd4cf.md（v3 定稿，264 行）。

## 复盘核心结论
- 5 次 plan_review 打回（r1-r5，原 >4 硬拒阈值过松致跑到 5 轮）；三大根因：证据后补、plan 全文重写 4 次、逐条命令
- 四大浪费点：plan 全文重写 4 次（~12k output+8k input 未命中）、大文件重复整读（records/index.vue、theme.css 各 3 遍）、逐类 grep 循环 7 次、逐张图 vision 泛描述 7 张
- plan_review 5 轮往返约 5.6 分钟（r1 44s→r2 stall 121s→r3 40s→r4 90s→r5 43s；turn1 的 3 轮 205s 含 120s stall 在仅交付方案未改代码阶段）

## 优化方案落点（E1-E8 实测）
- E1 只读命令仍走三层 guard：graph.py:168 白名单仅 7 前缀、:198 仅相对路径读；绝对路径 Select-String 三次全走 escalate→defer→final
- E2 plan_review 无 hash 复用／无轮次上限：plan-gate 仅校验 frontmatter
- E3 plan 全文重写检测：token-guard tools/post-execute:318 拿不到 write 入参，应改 plan-gate ctx.tools.guard:191（有 exec.arguments）
- E4/E5 重复整读已可检测（agent-guard sessionReads:169 只需复用）、逐类 grep 应一条 Select-String -Pattern 'a|b|c' 一次出全量；E8 node_summarize:817 已有 planner 单步短路，需扩展到只读 pwsh 单步

## 交付状态
- 2026-11-12 P0 已实施：commit-1 940be263（graph.py E1 最小版，18 逻辑用例全过）、commit-2 3d448ef3（api.py+plan-gate E2 桥接+TEMPLATE.md，13 selftest+跨进程集成全过）
- plan_review 送审累计多轮 reject，用户决定带已知分歧直接开工；A/B 验证推迟至下会话（需 profile 重载生效，E1 默认关需显式开启）；本会话未推送远端，仅本地 commit
- 耗时（19:46–20:08 约 21.5 分钟）占比：方案文档撰写重写≈6min(28%)、plan_review 5轮≈5.6min(26%)、代码实施≈4min(19%)、探索≈2min(9%)、ask/告警≈3min(14%)
- Token 与输出：宿主输入 18.48M／未命中 86.3k／输出 86.5k，命中率 100%，等效成本≈1.01M（触发 sessionEquivMid）；编排器子进程 21 次调用/5m8s/输出 36k（plan_review 池占 34.2k、20 次调用）；输出构成 plan_review 送审≈11k(13%)、方案文档≈15k(17%)、代码实施≈14k(16%)、其余探索说明
- 追加两条常驻规则写入 dsh/AGENTS.md：plan_review 边界（仅代码改动送审、首轮≤4k、>3 硬拒）+ 文档写作（已有文件禁整篇 write、骨架≤1.5k 增量补、不重读全文），预期同类会话等效成本降至 0.6–0.65M

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ui_tweak_retro",
  "source_extraction_id": "a99f3affed2044db87ef72c4487e4122",
  "peer_id": "github.com-tyvt-skills",
  "version": 6,
  "memory_type": "entities"
}
-->