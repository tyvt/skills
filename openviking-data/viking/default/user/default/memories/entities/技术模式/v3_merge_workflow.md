# develop/v3.0.0 合并回主干流程
将代码合并回 develop/v3.0.0 时，本机有一套既定流程，确保子模块与父仓库的 gitlink 一致。

## 流程步骤
- 先 fetch 子模块与父仓库两个仓库，并确认当前基线
- 子模块先合并进 `develop/v3.0.0` 并推送到远程
- 父仓库再合并（更新 gitlink 指向子模块合并提交）并推送
- 最后清理 worktree：先移除子模块 worktree 并清理分支，再移除父 worktree；父 worktree 因含子模块常被 git 拒绝，需用 `git worktree remove --force` 或手动删目录后 prune

## 注意事项
- 子模块 worktree 本地 `git` 解析有怪象，统一使用显式 `--git-dir --work-tree` 调用
- 显式 `--git-dir --work-tree` 调用可能误报主子模块工作树为已删除，需用其自带 `.git` 指针做权威状态检查
- 父仓库 gitlink 必须与子模块合并提交 SHA 一一对应后再推送
- 合并 `docs/frontend/common-errors.md` 时若双方新增同一错误编号(如都加 E-046)，属编号碰撞非内容冲突；保留远程原编号，本方条目顺延重编号(如改 E-047)，双方均保留
- 严格不触碰用户主工作树（硬约束），主工作树落后需由用户自行 pull 同步；合并后仅清理临时 worktree

## 适用场景
- 来源会话 2026-11-09：用户要求「代码合并回 develop/v3.0.0，提交推送」
- 适用于日常将子模块 zhi2-web-admin 的改动合回 develop/v3.0.0 并同步父仓库

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_merge_workflow",
  "source_extraction_id": "0036dde7a3ff4a0fb3966d130ae8da31",
  "version": 3,
  "memory_type": "entities"
}
-->