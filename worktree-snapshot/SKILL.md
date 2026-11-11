---
name: worktree-snapshot
description: 开工前一次拉全父仓、子模块和各 worktree 的分支、detached、脏净与 HEAD。开工时加载，禁止现场拼 git status 或 git worktree list。
---

# worktree-snapshot

跑一次，不要自己拼 `git status` / `git worktree list` / `@{u}` / `head` / `tail`。

```powershell
pwsh -File D:\repository\skills\worktree-snapshot\scripts\snapshot.ps1 -Repo <父仓或子模块根>
```

每行：`<worktree> | <branch 或 DETACHED> | dirty=<n> | <HEAD 短哈希>`。

判读：

- 显示分支名的那一行才是该分支的检出位置。主检出是 `DETACHED` 时，改动落在分支所在的 worktree，不要改主检出。
- 这份输出是本轮开工快照。后续只查刚改过的路径，不重复跑全量 `git status`。
