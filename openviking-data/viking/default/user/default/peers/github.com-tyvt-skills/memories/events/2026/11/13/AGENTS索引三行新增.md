# Summary
用户要求在 dsh/AGENTS.md 顶部「编排器选型」附近加三行索引（会话时间硬约束、二次ask拦截、e2e预检、定位顺序/lint指向skill），只加索引不加细节；助手实施后系统回读确认生效 (2026-11-13)
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: AGENTS.md 的改动（只加索引，不加细节）
在 AGENTS.md 顶部「编排器选型」附近加三行：

markdown
## 会话时间硬约束（P0，细节见 skill/hook）
- 计划确认轮必须把可预见待定项（提交方式/推送/是否重建）一次问清（hook 拦截二次 ask）。
- 跑 `playwright test` 前必须先过 `node e2e/scripts/preflight.mjs`（hook 拦截）。
- 定位顺序与 lint 命令模板见 `zentao-analyzer` / `szfc-page-guard` skill。
汇总：改哪里
项	落点	优先级	收益
P0-1 两次 ask	hook（tool-call 拦截 + 告警兜底）	最高	~250–500s
P0-3 e2e 预检	hook + e2e/scripts/preflight.mjs	最高	~300s
P0-2 定位顺序	skill（zentao-analyzer + szfc-page-guard 双写）	高	~300s
P0-4 lint 模板	skill 命令原文 + 一句预期说明	中	~60s + 少读基线
索引	AGENTS.md 三行	必做	保证上述被加载
一句话：P0-1、P0-3 必须 hook 硬卡（动作缺失可判定，硬卡零误伤）；P0-2、P0-4 落 skill（语义顺序，硬卡必误伤）；AGENTS.md 只做索引入口，避免越写越厚被模型跳过。
出个计划给我

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS索引三行新增",
  "goal": "记录AGENTS索引改动",
  "summary": "用户要求在 dsh/AGENTS.md 顶部「编排器选型」附近加三行索引（会话时间硬约束、二次ask拦截、e2e预检、定位顺序/lint指向skill），只加索引不加细节；助手实施后系统回读确认生效 (2026-11-13)",
  "ranges": "0-4",
  "source_extraction_id": "85402565e2e74988af5075c4c48ab189",
  "version": 1,
  "memory_type": "events"
}
-->