# 主工作树占用develop的临时分支合并
当 develop/v3.0.0 被主工作树占用时，不能在任务 worktree 中 checkout 它，需在任务 worktree 建临时合并分支、合入 fix 分支、再 FF 推送到 develop。

## 触发场景
- 父仓库 develop/v3.0.0 正被主工作树占用（如 D:/repository/苏州市房地产监测V3，commit 733d674）
- 任务 worktree 无法 checkout develop/v3.0.0，否则会干扰主工作树

## 解决方案
- 在任务 worktree 中基于最新 origin/develop 建立临时合并分支
- 将 fix 分支合并进该临时分支，再 FF 推送到 develop/v3.0.0
- 全程不 checkout develop/v3.0.0，避免干扰主工作树

## 验证与归属
- 会话 2026-11-09：父仓库合并 develop/v3.0.0 时，因被主工作树（D:/repository/苏州市房地产监测V3，733d674）占用，采用临时合并分支方式 FF 推送
- 涉及子模块 zhi2-web-admin；父仓库 zhi3-web-admin-h5-g-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "worktree_occupied_merge",
  "source_extraction_id": "f9870e6ca8504f75ba683092ece4d135",
  "version": 1,
  "memory_type": "entities"
}
-->