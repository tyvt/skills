# HANDOFF-planner-share 交接文档
dsh/langgraph-orchestrator 项目中记录规划器分流分析的会话交接文档，供后续会话接续。

## 位置与规模
- 路径：dsh/langgraph-orchestrator/docs/HANDOFF-planner-share.md
- 规模：145 行

## 内容结构
- 已核验事实 E1–E6（可直接引用，无需重跑）
- 二分结论 A/B 类（A 类 28 条合理、B 类 15 条真失效候选）
- 2×2 归因方法与判别步骤
- 6 条已知坑（route_miss 须 plan-aware、单次冒烟不可信、成本日志不含请求文本、session_event_search 超时 120s、.dsh/sessions bucket 无 jsonl 等）
- 本轮 7 个 commit 清单与验证状态、建议开局方式（不先改 PLANNER_SYSTEM、不先做批量重放）

## 使用方式
- 新会话读此文档并按第四节做 B 类 15 条的 2×2 归因即可接上
- 2026-11-13 会话已完成该归因，结论主因为工具链能力缺口（file_reader 无磁盘读取权限），并修正手交文三处假设（转交 file_reader 不可行、取证路径可打通、E3 prompt<400 不成立）

<!-- MEMORY_FIELDS
{
  "category": "技术文档",
  "name": "handoff_planner_share",
  "source_extraction_id": "2545ca5b3b114cffb4b51a8263a196b0",
  "version": 2,
  "memory_type": "entities"
}
-->