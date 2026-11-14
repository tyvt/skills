# 子代理统一权威路由表
dsh 子代理角色→模型权威映射，基于 controller-bench 406 组合实测（M1–M5+T8–T11）制定，已并入 .plan/explore-multimodel-20261114.md v3 文末「附：统一路由表」。

## 动作→模型映射
- 执行/检索/效率（M2/M5）：auto/glm-5.3-flash 或 cursor/deepseek-v41-flash-1017；workbuddy/deepseek-v4.1-flash 仅兜底（M5 仅 0.846）
- 抗坏工具/改道（M3）：cursor/deepseek-v41-flash-1017 或 workbuddy/deepseek-v4.1-flash（deepseek-flash 系最强且免费）；glm-flash 不行（M3 仅 0.737 短板）
- 工具选择精准（M1）：cursor/grok-4.7@256k 或 codex/gpt-5.6-terra（tool 0.88/0.87，慢+计费，仅难题降级）
- 对抗/根因/多轮纠错（T）：codex/gpt-6-luna（T 类 0.875 第一，planner 池首依据）
- 代码生成：composer-2.5 / gpt-6.1-sol；长输出判读汇总（M8 待测）：强判读档（terra/sol）
- diff 评审/verifier：plan_reviewer 池（grok-4.7，route 1.00）；安全拒绝（M4-5）：强模型 + security_guard 前置
- 低成本兜底：workbuddy/deepseek-v4.1-flash（免费最快 4.5s，M5 偏弱）

## 关键规则
- route 格式 `{provider:"magpie", model:"..."}`：斜杠前缀属 model，provider 恒为 magpie
- 区分 plan(规划)→gpt-6-luna 与 plan_reviewer(评审)→grok-4.7
- 与第 110 行对齐：探索/检索 → workbuddy/glm-5.3-flash → auto/deepseek-v4.1-flash
- 原则：效率第一、质量第二、成本第三；安全/对抗保强模型；按题型派活不看 overall 排名

## 实测依据
- 来源：controller-bench 406 行实测（M1–M5+T8–T11）
- 2026-11-14 plan_review 新增 verifier 角色（grok-4.7）
- deepseek-flash 系 M3 0.932/0.919 最强；glm-flash M3 0.737 短板；gpt-6-luna T 类 0.875 第一

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "subagent_routing_table",
  "source_extraction_id": "83be4e8947f44f469e0f4ea2e659ca29",
  "version": 1,
  "memory_type": "entities"
}
-->