# cost-meter M1 刹车
cost-meter 的 M1 白名单刹车机制，位于 dsh/cost-meter 子模块。

## 当前状态
- M1 刹车截至 2026-11-14 仅实现为 notice：bigMissStreak>=2 时在 lib/index.js:257-260 注入文字提醒，无 enforcement 代码
- 不存在 allowOnly/工具阻断逻辑，preRule 不返回 block 决策，仅告知模型限制调用而非强制

## 关联代码事实
- cost-meter 的 apply(ctx, rawConfig) 函数（lib/index.js:133）无 return，latestAcc 为模块级私有变量（:139）
- inspectSize 定义于 lib/index.js:106，仅被 selftest.mjs 引用（import:4、assert:130、log:134），无生产第三方引用

## 方案关联
- 2026-11-14 方案评审中 B2 将其定为「首次实现 enforcement」而非「复用」，因 M1 此前仅有 notice 无强制代码


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "代码组件",
  "name": "cost_meter_m1_brake",
  "source_extraction_id": "5e931fb4b68b489cb2c68dd13b880794",
  "version": 1,
  "memory_type": "entities"
}
-->