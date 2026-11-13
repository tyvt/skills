# dsh-plan-gate 插件
DSH 计划审批门插件（2026-11-12 新建），edit/write/apply_patch 前校验计划文件状态。

## 功能
- 校验 .plan/<sessionId>.md 的 status:approved + human_confirmed:true，否则拒绝执行
- 含 TEMPLATE.md（前因后果/现状证据/分布实施/风险回滚/验证计划）与 README.md
- package.json main→lib/index.js，cordis.patch.yml 为 bundle 自带 patch，需被 profile 引用才生效

## 验证
- 端到端实测：欠完整计划 → reject/46 + 5 条具体打回建议；完整计划 → pass/78
- 与 orchestrator op:plan_review（reviewer 首选 cursor/grok-4.7@256k）配合实现审核打回

## 生效条件
- 新插件需重启 Web 后加载（与既有插件同 bundle patch + profile 引用机制）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "软件项目",
  "name": "dsh_plan_gate",
  "source_extraction_id": "126e610f4e3542618cf613d408628d6e",
  "version": 1,
  "memory_type": "entities"
}
-->