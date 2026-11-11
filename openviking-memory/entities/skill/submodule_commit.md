# submodule-commit
DSH 技能，规范子模块提交与推送流程。

## 流程
- 第 0 步：git fetch && git status -sb，ahead/behind 非 0 先 rebase 再动手。
- 固定顺序：commit → build（拿正确 hash）→ resolve。
- gitlink 冲突预置「取后代提交」解析策略。

## 来源
- 2026-11-11 根据日志分析建议更新，避免旧 hash 构建与 push 往返。


<!-- MEMORY_FIELDS
{
  "category": "skill",
  "name": "submodule_commit",
  "source_extraction_id": "114cae7623bc498d9bf1b83f57880dd7",
  "version": 1,
  "memory_type": "entities"
}
-->