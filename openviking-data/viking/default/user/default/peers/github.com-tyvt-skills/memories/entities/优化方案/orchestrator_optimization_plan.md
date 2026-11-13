# 编排器P0优化方案
2026-11-13 制定的编排器工作流P0级优化方案，落地于 .plan/p0-audit-optimization-20261113.md，plan_review 通过（76分）。

## 目标
- 单次会话未命中从108.3k压到<40k，耗时从~11min压到4-5min
- 编排器有效利用率从~50%提到≥85%，计划确认ask轮次从2降为1

## P0要点（上）
- P0-1 编排器grep未命中18k：单目录+关键词已知grep划直跑豁免，planner遇本地路径直接rg -n
- P0-2 整读组件26k/6k未命中：样式改动固定grep类名→read±30行，>300行整读列gate拦截
- P0-3 build重试240s：CSS-only build豁免，stall一次打标记禁同形态重试

## P0要点（下）
- P0-4 二次ask：hook窗口扩到turn级，首个ask未覆盖提交方式则拦截
- P0-5 输出回灌：git rebase/pull加-q或截尾，status限定子模块路径
- P0-6 cost-meter无刹车：连续2步>10k强制窄读白名单，会话>150k拒op:"full"

## 落地状态
- 首批R1-R5（AGENTS.md、submodule-commit/SKILL.md规则/skill文本）：已实施并提交commit bea36e5b（未推送）
- 次批R4/M1/M3（hook/编排器代码）：另行送审，未实施

## 归属
- 方案文件：.plan/p0-audit-optimization-20261113.md
- 来源会话：2026-11-13

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "优化方案",
  "name": "orchestrator_optimization_plan",
  "source_extraction_id": "36ef0cdc849b459ebd57e076e3a78f52",
  "version": 1,
  "memory_type": "entities"
}
-->