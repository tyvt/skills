# OpenViking
用户的记忆系统，负责存储与管理导入的历史会话记忆。

## 描述
- 使用 VikingFS 作为后端存储，提供 health 健康检查接口
- 支持通过 import-local-sources.mjs 等脚本导入本地历史会话
- 进度与状态记录在 import-local-sources-state.json

## 关系
- 与 import-local-sources.mjs、import-to-ov.mjs、ov-cancel-stuck-commit-tasks.mjs 组成记忆导入工具链


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "openviking",
  "source_extraction_id": "097d1ae687a64e16a0d09c087e4f2b88",
  "version": 1,
  "memory_type": "entities"
}
-->