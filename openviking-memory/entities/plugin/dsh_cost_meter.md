# dsh-cost-meter
DSH 本地插件，在会话内按阈值注入实时成本提醒，将降本规则变为运行时行为。

## 配置参数（as of 2026-11-11）
- perStepUncachedBudget 默认 10,000（原 15k 于 2026-11-10 降本审计改为 10k）
- bareReasoningBudget 1_500：规则 A 阈值（reasoning >1500 且无工具调用）
- perStepOutputBudget 3_000：规则 B 阈值（output 含 reasoning >3000 不论是否带工具）
- equivOf 公式：cacheRead×0.1 + uncached + output×4（倍率待校准）
- 累计等效提醒三档：sessionEquivEarly 150,000、sessionEquivMid 1,000,000、sessionEquivBudget 8,000,000

## 规则（as of 2026-11-11）
- 规则 A（自我辩论）：单步 reasoning >1500 且无 tool call → 注入「停止推演，先调一次工具取事实」
- 规则 A 升级（bareReasoningEscalate）：连续第 2 个纯推理步从软提示升格为「下一步第一件事必须是工具调用」，对应审计 P0#1；maxReasoningTokens 硬上限不可行（reasoningEffort 在 turn 开始固定，pre-step 仅能 enter/reject 无法中途降档）
- 规则 B（事后止损）：单步 output >3000 不论是否带 tool call → 注入「上一步已超预算，下一步第一件事必须是工具调用，禁止并列 Option 1/2/3」；仅当本 turn 已触发 A 才加此句，否则只报 output 数字
- 规则 C（perStepLookup）：连续 2 步未命中 >10k 时，下一步必须是一条 SQL、窄读或模块内 grep
- closing-check：turn 结束有 git commit 但无 token-optimizer 记录时，注入「收尾自查未做：本轮有提交，未见 token-optimizer 记录」（不写「必须跑」）

## 改动与部署
- 2026-11-10 A1 改 lib/index.js：三键全 0 且无 cacheReadTokens → 仅 absentSteps；新增 15 万 / 100 万累计档；0.1 与 4 注释待校准
- 2026-11-11 改 fired 为按 turn 计数且仅对上一步生效，修复会话级只提醒一次导致 Step12 被吞；同日新增 perStepLookup 与 bareReasoningEscalate，selftest 全绿并同步安装副本，提交 db769807（仅提交未推送）
- 源码位于 C:\Users\Administrator\.dsh\cost-meter\lib\index.js（亦 dsh/cost-meter/lib/index.js），profile 通过 file:../../cost-meter 引用；node_modules\dsh-cost-meter 为安装结果（非链接），改源码目录勿改安装目录，需重启 Web 生效
- 与 token_optimizer 技能同源成本数据；零依赖 host 插件，扩展 dsh-context 成本可视化意图

<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_cost_meter",
  "source_extraction_id": "4a65ec5568c14ed4a10f48ae0ac23686",
  "version": 9,
  "memory_type": "entities"
}
-->