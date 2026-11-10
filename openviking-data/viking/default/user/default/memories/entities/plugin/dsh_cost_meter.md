# dsh-cost-meter
DSH 本地插件，在会话内按阈值注入实时成本提醒，将降本规则变为运行时行为。

## 功能
- 监听 session/event 累加 usage，每次 agent/pre-step 前若每步未命中 / 累计未命中 / 累计等效成本越阈值，注入一条收尾提醒（同阈值仅一次）。

## 配置参数（as of 2026-11-10）
- perStepUncachedBudget 默认 10,000：单步未命中超过即提醒（原 15k 于 2026-11-10 降本审计改为 10k；不要改成 45k）。
- equivOf 公式：cacheRead×0.1 + uncached + output×4（0.1/4 注释为「假设倍率，待计费校准」，非日志证据）。
- 累计等效提醒三档：sessionEquivEarly 150,000（约 10 个单步预算）、sessionEquivMid 1,000,000（比原 800 万低一个数量级）、sessionEquivBudget 8,000,000（原档保留，每阈值仅提醒一次）。
- readUsage 已修复：三键全 0 且缺 cacheReadTokens 的步只加 absentSteps，不进等效成本也不增加 steps；带 cacheReadTokens 的显式 0 仍按原逻辑累加。

## 改动与结论（as of 2026-11-10）
- A1 改 lib/index.js：三键全 0 且无 cacheReadTokens → 仅 absentSteps；保留 15k 单步提醒；新增 15 万 / 100 万两档累计等效提醒；0.1 与 4 注释改为「假设倍率，待计费校准」。
- selftest.mjs 用 session.v4.jsonl 真实夹具：48 个三键 0 不增等效成本（absentSteps=48）；未命中 45,272（seq 253）触发 perStep；未命中 244 且 cacheRead 65,152（seq 286）不触发 perStep 但进累计档。结果：cost-meter selftest: ALL PASS；运行时（重启 Web 后新会话）未验证。
- B2 结论：可改目录仅 cost-meter 自身构造三键；安装包（pi-ai/dsh-agent-loop/dsh-llm/BlockAssembler）无构造点且无插件 hook 能在落盘前改 usage，三键 0 不可覆盖，不进入改 usage 记账（null + usageSource 方案不实施）。
- 遗留（as of 2026-11-10）：selftest.mjs 所用夹具 Downloads\session.v4.jsonl 缺失，selftest 无法重跑验证（此前 ALL PASS 结果基于该夹具）。

## 部署与关系
- 源码位于 C:\Users\Administrator\.dsh\cost-meter\lib\index.js，profile 通过 file:../../cost-meter 引用；node_modules\dsh-cost-meter 为安装结果（非链接），改源码目录勿改安装目录。
- 零依赖 host 插件（非 React client），2026-11-09 随 web 重启验证挂载无报错。
- 扩展 dsh-context 的成本可视化意图，但以 host 注入方式实现。

<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_cost_meter",
  "source_extraction_id": "7cbade9e69fc4f3fb8d82d9259412d8d",
  "version": 5,
  "memory_type": "entities"
}
-->