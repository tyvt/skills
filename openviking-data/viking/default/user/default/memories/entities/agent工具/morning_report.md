# morning-report
morning-report 是 agent 每日晨报生成工具。

## 近期改动
- 由按自然日统计改为滚动 24 小时窗口
- 修复晨报 08:00 按自然日统计导致的「今日 0 失败」假象

## 归属验证
- 来源：2026-11-09 agent 运维报告
- 随提交 c7f682f5 合入 main

<!-- MEMORY_FIELDS
{
  "category": "agent工具",
  "name": "morning_report",
  "source_extraction_id": "ddc362a949994fcb96dea1093973f741",
  "version": 1,
  "memory_type": "entities"
}
-->