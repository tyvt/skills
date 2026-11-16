# DSH 编排器与 task-watchdog
DSH 工作区用于执行任务与构建测试的编排程序及看门狗脚本。

## 用法
- 编排器 op:full 可跑 npm build/test；execution 快路径会报 INVALID_EXECUTION，需走 op:full

## 位置
- task-watchdog.ps1 实际位于 D:\repository\skills\dsh\scripts\

<!-- MEMORY_FIELDS
{
  "category": "工具",
  "name": "dsh_orchestrator",
  "source_extraction_id": "38ea00fe848f4c998b177ae5d1ed1de6",
  "version": 1,
  "memory_type": "entities"
}
-->