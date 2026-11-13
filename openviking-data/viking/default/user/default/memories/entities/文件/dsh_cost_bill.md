# dsh_cost_bill
DSH 编排器（LangGraph）的会话账单文件与聚合脚本，记录各会话的工具与模型 Token 消耗明细。

## 存放位置
- 会话账单 JSONL 目录：D:\repository\skills\dsh\langgraph-orchestrator\.sessions（run_full 写入 <session_id>.costs.jsonl，无合法 id 时写 anonymous.costs.jsonl）
- 聚合脚本：D:\repository\skills\dsh\langgraph-orchestrator\scripts\cost_bill.py，可打印《工具 × 模型 × Token 消耗账单》

## 用途
- 排查成本、定位高消耗会话与工具时使用；找不到该文件应优先调用 mcp__openviking__search，而非 glob/pwsh 遍历目录。
- 该实体记忆由 deepseek-harness-default-workspace 在 2026-11-10 会话中经 HTTP 写入 OpenViking。

<!-- MEMORY_FIELDS
{
  "category": "文件",
  "name": "dsh_cost_bill",
  "source_extraction_id": "945cecf51a1c40d0899dd8c18bb5144f",
  "version": 2,
  "memory_type": "entities"
}
-->