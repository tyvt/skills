# cursor-model-routing 技能
位于 D:\repository\skills\cursor-model-routing\ 的 Cursor 模型测试与路由 skill，用于实测 Cursor 提供的各模型并产出任务类型×模型的成本/质量矩阵。

## Description
- 由用户 2026-11-13 要求创建，助手在 D:\repository\skills\cursor-model-routing\ 落地（用户原话“放在D盘skills目录”，实际指向 skills 仓库工作区）
- 包含 SKILL.md（T1-T7 定义、模型/配额清单、分流规则草案）、tasks.json（7 类可运行 prompt）、run-matrix.ps1（直连网关测试器）、REPORT.md（实测报告）
- run-matrix.ps1 支持 smoke/primary/gift 三套件，动态从 /v1/models 取模型，按 model+task 幂等写 results/，赠额花费硬上限，-DryRun 预览

## Purpose
- 实测 Cursor 模型（Composer 2.5、Grok 4.7 等）在不同任务类型上的质量/成本/缓存表现，为编排器分流规则提供数据支撑

## Relations
- 依赖 magpie 网关（base_url+api_key "magpie"）直连 cursor/* 模型
- 与 langgraph-orchestrator 无直接关系（Cursor 模型已于 2026-11-12 移出编排器）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技能",
  "name": "cursor_model_routing",
  "source_extraction_id": "5d63e0b1e05b4ffcb1e31a6efaa8607f",
  "version": 1,
  "memory_type": "entities"
}
-->