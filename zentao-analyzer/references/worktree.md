# 开工前置与收尾对账（仅开工/收尾时读）

优先加载 `worktree-snapshot` 并只读它的输出。本文件是该 skill 不在会话目录里时的后备，不要再自己拼命令。

1. 父仓 `git worktree list` 看不到子模块的 worktree（bug6369 因空转 8 步）。父仓和每个子模块各跑一次 `git -C <仓> worktree list`，再对每个 worktree 跑 `git status --short` 与 `git log --oneline -3`。禁止 `Get-ChildItem -Recurse`。
2. 用户指定的落点是硬约束：明确豁免 worktree 时只改主工作区，不进/不改/不合并那个 worktree，也不拿它的未提交文件当基线。
3. 目录先 `Test-Path`。别的任务新建的目录只在那个 worktree 里；不存在就按本任务新建路径。
4. 新需求用新路径、新菜单，不复用他人正在改的同名目录。
5. 临时文件落 `<repo>\.tmp-bug<id>\`，不提交。
6. 收尾：`git worktree list` 与开工前一致；改动归属逐条说清（worktree / 分支 / 提交）。
