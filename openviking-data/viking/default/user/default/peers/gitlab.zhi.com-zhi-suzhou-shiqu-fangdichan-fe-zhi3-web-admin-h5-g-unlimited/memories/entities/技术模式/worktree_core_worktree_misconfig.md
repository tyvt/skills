# 子模块worktree core.worktree错位故障
子模块worktree嵌套时git相对路径计算bug导致core.worktree指向错误，使git把gitdir当工作树。

## 现象
- git status 显示大量 `D src/...` 删除与 `?? HEAD/config/refs/` 等git内部文件未跟踪
- `git rev-parse --show-toplevel` 返回 gitdir 本身而非 worktree 根

## 根因
- 子模块 worktree 路径嵌套时，worktree 的 `core.worktree` 被错配为相对路径 `../../../zhi2-web-admin`
- 相对 worktree-gitdir 解析到了主子模块的 gitdir，而非 worktree，git 遂把 gitdir 当成工作树
- 属于子模块 worktree 路径嵌套时的 git 相对路径计算 bug

## 修复方案
- 将 worktree 的 `core.worktree` 改为 worktree 的绝对路径
- 修正后 `show-toplevel` 正确指向 worktree，`git status` 仅剩预期改动文件

## 影响与验证
- 修复后工作树干净，仅含预期组件改动与构建生成文件（已还原 version.json）
- 关联提交：fix/bug-6358 分支 c838c35f2

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "worktree_core_worktree_misconfig",
  "source_extraction_id": "d619207e801c459e8481e98ead74763e",
  "version": 1,
  "memory_type": "entities"
}
-->