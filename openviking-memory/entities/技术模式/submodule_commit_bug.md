# 提交子模块 gitlink 禁用 git commit -- <path>
用 `git commit -- <path>` 提交子模块指针会绕过暂存区、取子模块工作区当前 HEAD，把别的分支指针误写进父仓。

## 问题现象
- 在 worktree 修完子模块并提交推送后，更新父仓 gitlink 用 `git commit -- <path>`
- 父仓提交 `ab8412e` 把子模块指针误记为防汛分支 `83422e02e`，而非本次修复所在 `develop/v2.6.2-suzhufang` 的 `8ba16de62`
- 后续提交 `d423d12` 才用暂存区值修正回 `8ba16de62`

## 根因
- `git commit -- <path>` 语义是提交工作区该路径当前内容，绕过暂存区直接取工作区状态
- 对子模块「工作区当前状态」= 子模块此刻检出的 HEAD，可能停在另一分支（本次为防汛分支 `develop/v2.6.2-suzhufang-li`）
- 多分支并行开发时此坑必现

## 正确做法
- 先 `git add <子模块路径>` 把期望 gitlink 写进暂存区，再 `git commit`（不加路径限定），`git show --stat` 确认
- 永远不用 `git commit -- <path>` 提交子模块指针
- 提交后用 `git ls-tree origin/<branch> <子模块路径>` 核对远端树里的指针值，不只看本地
- 若已推错不强制回滚历史，用后续提交修正（远端当前指针正确则无需 force push）

## 验证与归属
- 来源会话 session-57c99e3d-1829-4ba2-81e3-d70296ccc2fe（基线 6156653）最终结论
- 防汛工作区零触碰：`zhi2-web-admin` 仍 `develop/v2.6.2-suzhufang-li`，11 已跟踪 + 9 未跟踪与开始一致
- 父仓 `origin/develop/v2.6.2-suzhufang` tree 里 gitlink 已是 `8ba16de62`（已核对远端）
- 涉及文件：zhi2-web-admin、.gitmodules

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_commit_bug",
  "source_extraction_id": "e4f7a4332a82405ead33f2c2960fbe01",
  "version": 1,
  "memory_type": "entities"
}
-->