# cost-meter
cost-meter 是 skills 仓库中的逐步用量与成本计量、熔断提醒技能。

## 功能描述
- 负责 agent 逐步（perStep）输出预算与成本计量提醒
- 属于 agent 自身运维工具链的一部分

## 近期增强
- 新增 perStepOutputBudget=3000 reasoning 熔断提醒（默认值 + cordis patch.yml 双写）
- perStep 未命中提醒改为绑定三种成因改法
- 2026-11-10 工单 B：无工具调用且 output>1500 注入 [reasoning-watchdog]；turn 有 git commit 且无 token-optimizer 时注入 [closing-check]；原 3000 熔断保留

## 验证归属
- 来源：2026-11-10 bug6369 复盘；2026-11-10 工单 B（看门狗增强）
- 随提交 86279dd0、d747b47c 合入 skills 仓库 main（仅提交未推送）
- 遗留：selftest 夹具仍缺失未重跑；插件改动需重启 Web 后新会话生效（截至 2026-11-10）

<!-- MEMORY_FIELDS
{
  "category": "agent工具",
  "name": "cost_meter",
  "source_extraction_id": "05a10352d56d4bffae9e7b14f7dcfb13",
  "version": 2,
  "memory_type": "entities"
}
-->