# 扁平子模块 Worktree 缺陷（苏州市房地产监测V3）
父仓库 苏州市房地产监测V3 + 子模块 zhi2-web-admin 的 worktree 在本环境有多处怪象。

## 创建与结构
- 子模块内直接 `git worktree add` 到扁平路径会让 git 误判顶层为公共目录(.git/modules/...)，显示所有跟踪文件被删；纯 ASCII 路径亦复现，嵌套结构正常。
- 构建 `rootDir = resolve(__dirname,"../")` 耦合输出到父仓库，故子模块 worktree 须置于父根内(如 `…\苏州市房地产监测V3\zhi2-web-admin-wt-6358`) 以便 `../` 解析且 `dist/` 与 `env/` 正确落位。
- 须用「父 worktree + 嵌套子模块」模式：父跑 `git worktree add`，再 init 内部 zhi2-web-admin 子模块并切目标分支；基础分支 `develop/v3.0.0`。

## node_modules 怪癖
- `node_modules` 仅存父根与 `zhi2-web-admin/`；父根 vite 5.4.11，子模块声明 8.3.5，故父内 worktree 须 junction `node_modules` 到 `zhi2-web-admin/node_modules` 用 vite 8.3.5。
- 主子模块 `node_modules` 可被并行任务(如 payfund/portal-skeleton worktree 重装)清掉(2026-11-09)，破坏 junction 致 vite 8.3.5 失败；父 `门户/scripts/install.mjs` 仅跑父根 `npm install -f`(vite 5.4.11)，无法提供子模块 vite 8.3.5。
- 可靠修复：删死 junction 并在 worktree 内独立 `npm install`(vite 锁 8.3.5, Node v22.23.2, 无 lockfile/workspaces hoist)；装 834 包，构建通过，完全脱离共享目录。

## 移除怪癖
- `git worktree remove` 拒绝含子模块 checkout 的 worktree；`git submodule deinit` 仍留 gitlink 致 git 认为子模块存在。
- 变通：手动删 worktree 目录后 `git worktree prune` 清元数据；共享子模块 module 目录与已推提交安全。

## 编码怪癖
- git 创建含中文名路径 worktree 时可能将 `.git` 文件写成乱码，git 退回当裸仓；注册项可能仍持正确中文路径(2026-11-09 bug-6373)。PowerShell 5.1 乱码常仅为显示假象，显式 `--git-dir/--work-tree` 结果正确。
- 变通：用 Node(无 BOM)重写 `.git` 为正确 UTF-8；子模块 git 操作显式传 `--git-dir/--work-tree`；提交信息用 `write` 写 UTF-8 文件以 `-F` 提交。

## 实例与来源
- 实例：`苏州市房地产监测V3-wt-bug-6372`(父级 worktree, node_modules 为 ReparsePoint junction, 子模块同名分支)；bug-6373 复刻同模式。`git -C <wt> rev-parse --show-toplevel` 须返回 worktree 根。
- bug-6373：子模块 @ d71a36607 于 fix/bug-6373-preview-close(仅 drag.js 防护 +4 行, version.json 自动生成排除)；父仓库 @ 05621b2 同分支更新 gitlink。
- 来源：2026-11-09(LpbStatisticsDialog 修复坑、bug-6363 worktree 移除、bug-6372/6373 模式)

<!-- MEMORY_FIELDS
{
  "category": "开发环境",
  "name": "submodule_worktree_quirk",
  "source_extraction_id": "fcac6703ea0546e28e4f60dad118826f",
  "version": 13,
  "memory_type": "entities"
}
-->