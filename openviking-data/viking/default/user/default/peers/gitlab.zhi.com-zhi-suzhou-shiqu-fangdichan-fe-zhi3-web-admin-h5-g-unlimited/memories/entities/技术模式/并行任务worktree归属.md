# 并行任务下的 worktree 归属

> 类型：可复用经验🔵｜来源：2026-11-02 bug 6023 / 预售资金 1413·1415 事故

## 一句话教训

**「必须走 worktree」= 新建一个，不是「随便挑一个现成的用」。**

## 事故

用户明确说「在主分支做，不用碰预售资金」，agent 却把全部代码写进了 `szfc-v3-wt-prefund-new`——那里是**另一个并行任务**正在做的预售资金需求，刚建了 `src/views/supervision/account/**`。两者撞在同一目录，6 个文件写完未提交即中断，两轮工作一起作废。

## 开工前必做

```powershell
git worktree list
Get-ChildItem .. -Directory -Filter '<repo>-wt-*'
git -C <path> status --short; git -C <path> log --oneline -3
Test-Path 'zhi2-web-admin\src\views\<module>\<newFeature>'   # False = 该目录只在别人 worktree 里
```

## 硬规则

1. **用户指定落点优先**：说「在主分支做 / 不碰某个 worktree」= 硬约束，优先级高于「必须走 worktree」。不进入、不修改、不合并、不删除那个 worktree。
2. **每任务一个独立 worktree**，路径带任务标识（禅道 ID/slug），不重名；同分支被占就换名，不改旧的。
3. **目录存在性先 `Test-Path`**：别的任务新建的目录往往只在那个 worktree 里，本工作区根本没有。不存在就按本任务新建自己的路径。
4. **新需求用新路径新菜单**：要求「老页面也要能用」时，新建独立目录，不复用他人正在改的同名目录。
5. **收尾对账**：`git worktree list` 与开工前一致；每个改动能说清在哪个 worktree / 分支 / 提交。

## 本项目已知的并行 worktree

| 路径 | 分支 | 内容 |
|---|---|---|
| `szfc-v3-wt-prefund-new` | `feature/prefund-account-agreement-1413-1415` | 预售资金 1413/1415（mainAccount / regulatorOrg / regulatoryAccountNew） |
