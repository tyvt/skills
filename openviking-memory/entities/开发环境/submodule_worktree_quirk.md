# 扁平子模块 Worktree 缺陷（苏州市房地产监测V3）
父仓库与子模块 zhi2-web-admin 的 worktree 在本环境有多处怪象，基础分支 develop/v3.0.0。

## 创建与结构
- 子模块内直接 `git worktree add` 到扁平路径会让 git 误判顶层为公共目录，显示所有跟踪文件被删；纯 ASCII 路径亦复现，嵌套结构正常。
- 构建 `rootDir = resolve(__dirname,"../")` 耦合父仓库，故子模块 worktree 须置于父根内（如 `…\苏州市房地产监测V3\zhi2-web-admin-wt-6358`）以便 `../` 解析且 `dist/` 与 `env/` 正确落位。
- 须用「父 worktree + 嵌套子模块」模式：父跑 `git worktree add`，再 init 内部 zhi2-web-admin 子模块并切目标分支。

## node_modules 怪癖
- `node_modules` 仅存父根与 `zhi2-web-admin/`；父根 vite 5.4.11，子模块声明 8.3.5，父内 worktree 须 junction `node_modules` 到 `zhi2-web-admin/node_modules` 用 vite 8.3.5。
- 主子模块 `node_modules` 可被并行任务清掉（2026-11-09），破坏 junction 致 vite 8.3.5 失败；父 `门户/scripts/install.mjs` 仅跑父根 `npm install -f`（vite 5.4.11），无法提供子模块 vite 8.3.5。
- 可靠修复：删死 junction 并在 worktree 内独立 `npm install`（vite 锁 8.3.5, Node v22.23.2，无 lockfile/workspaces hoist）；装 834 包，构建通过。

## 移除与编码怪癖
- `git worktree remove` 拒绝含子模块 checkout 的 worktree；`git submodule deinit` 仍留 gitlink。变通：手动删目录后 `git worktree prune` 清元数据；共享 module 目录与已推提交安全。
- 含中文名路径 worktree 时 `.git` 文件可能乱码，git 退回裸仓（2026-11-09 bug-6373）；PowerShell 5.1 乱码常为显示假象，显式 `--git-dir/--work-tree` 结果正确。变通：Node 重写 `.git` 为 UTF-8；子模块操作显式传参；提交信息用 `write` 写 UTF-8 以 `-F` 提交。

## 实例与来源
- 实例：`苏州市房地产监测V3-wt-bug-6372`（父级 worktree，node_modules 为 ReparsePoint junction）；bug-6373 复刻同模式，`git -C <wt> rev-parse --show-toplevel` 须返回 worktree 根。
- bug-6373：子模块 @ d71a36607 于 `fix/bug-6373-preview-close`（仅 drag.js 防护 +4 行，version.json 排除）；父仓库 @ 05621b2 同分支更新 gitlink。
- 来源：2026-11-09（LpbStatisticsDialog 修复坑、bug-6363 worktree 移除、bug-6372/6373 模式）

<!-- MEMORY_FIELDS
{
  "category": "开发环境",
  "name": "submodule_worktree_quirk",
  "source_extraction_id": "30157970752b4ca2be431bbc95a70c90",
  "version": 14,
  "memory_type": "entities"
}
-->