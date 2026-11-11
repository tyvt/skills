# dsh_orchestrator_bill
DSH LangGraph 编排器的会话账单记忆，记录会话账单目录与汇总脚本位置。

## Description
- 用于检索 DSH LangGraph 编排器产生的会话 token/费用账单与汇总脚本位置
- 由 deepseek-harness-default-workspace 在 2026-11-10 会话中经 HTTP 写入 OpenViking

## 路径信息
- 会话账单目录：`D:\repository\skills\dsh\langgraph-orchestrator\.sessions`
- 汇总脚本：`D:\repository\skills\dsh\langgraph-orchestrator\scripts\cost_bill.py`
- 记忆写入路径：`viking://user/default/memories/entities/dsh-orchestrator-bill.md`

## 检索
- 写入后搜索验证排第一，分数 0.88

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_orchestrator_bill",
  "source_extraction_id": "5474f09e13e6498585f1af90cb9781c0",
  "version": 1,
  "memory_type": "entities"
}
-->