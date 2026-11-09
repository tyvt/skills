# 扁平子模块 worktree 创建缺陷
苏州市房地产监测V3 仓库在本环境无法直接创建「扁平子模块 worktree」，须改用父级 worktree + 子模块嵌套结构。

## Description
- 在子模块仓库（zhi2-web-admin）直接 git worktree add 到扁平路径（如 .../V3-wt-xxx），git 会把 toplevel 误判为 common dir（.git/modules/...），导致 git status 显示全部跟踪文件被删除
- 即使路径改为纯 ASCII 仍复现，与中文路径无关；而父级 worktree 内含 zhi2-web-admin 子模块的嵌套结构正常

## 工作流
- 采用与现有 bug-6324/6326/6322 worktree 一致的「父仓库 worktree + 子模块」嵌套结构：从父仓库 git worktree add，再初始化其内 zhi2-web-admin 子模块并切到目标分支
- 验证 worktree 是否正常：git -C <wt> rev-parse --show-toplevel 应返回 worktree 根，而非 .git/modules 路径

## Relations
- 涉及仓库：苏州市房地产监测V3（父仓库）+ zhi2-web-admin（子模块）
- 来源会话：2026-11-09 会话（LpbStatisticsDialog 修复任务中踩坑并验证）

<!-- MEMORY_FIELDS
{
  "category": "开发环境",
  "name": "submodule_worktree_quirk",
  "source_extraction_id": "77369dcd8a3f49688bdec4e1ea2e2dd6",
  "version": 1,
  "memory_type": "entities"
}
-->