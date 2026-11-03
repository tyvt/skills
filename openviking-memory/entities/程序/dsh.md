# DSH
DeepSeek Harness（DSH），用户的 AI 会话工作台，其历史会话计划导入 OpenViking 作为长期记忆。

## 基本信息
- 会话总数 1541 个（截至 2026-11-02），为历史会话导入序列第一项
- 会话数据结构：source.kind === "user" 为真人输入须保留，其余为注入的上下文须过滤

## 既有产物
- 工作区 memory-migration/ 目录已存在上一次 distill（提炼）完整产物与脚本，可沿用其质量口径，避免重复处理
- 2026-11-02 统计：提炼产物含 memories-final.json（顶层单个项目「泰兴小程序」162 条）与 distilled-projects/（831 条项目记忆）
- 2026-11-02 统计：结构化记忆总量 4431 条，类型分布为 bug 1712、pattern 941、preference 923、fact 571、workflow 284

## 关系
- 通过官方 @openviking/dsh-memory-plugin 实时镜像会话到 OpenViking
- 历史会话导入顺序：DSH 率先，其后为 cursor、workbuddy、opencode

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh",
  "source_extraction_id": "9a8c8e1b6fc84fe591d71bc78a89243c",
  "version": 2,
  "memory_type": "entities"
}
-->