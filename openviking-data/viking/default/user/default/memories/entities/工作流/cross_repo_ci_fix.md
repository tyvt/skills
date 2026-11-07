# 跨仓库同类修复幂等迁移与一致性体检
针对几十个仓库出现同一类 CI 报错（如 ERR_MODULE_NOT_FOUND: vite），不应手改 N 份，而用幂等迁移脚本加 blob hash 一致性体检统一修复。

## 适用场景
- CI 报错 `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'vite' imported from .../vite-build.mjs`，同类问题在几十个仓库出现
- 本次覆盖 36 个仓库，统一安装配置与构建脚本

## 核心做法
- 固化可重复执行、幂等的迁移脚本 `fix-ci-vite.mjs`，配套一致性体检 `verify-ci-fix.mjs` 与批量提交/推送 `commit-ci-fix.mjs`、`fix-push.mjs`，统一放 `D:epository\.work\`
- 统一安装配置：提交 `bunfig.toml`（`chore: 提交 bun 安装配置（isolated linker）`），同步 `install.mjs`/`vite-build.mjs`/`ci-doctor.mjs` 三个脚本入库
- 用 blob hash 证明一致性：`ci-doctor.mjs` 已入库 36/36，blob 全部 = `5ac43604`；`install.mjs`/`vite-build.mjs` blob 全部 = `d00fef0`/`0b4449a`
- 体检项含「子模块指针全部指向远端已存在的 commit」；批量前后核对每个仓库当前分支；无关的本地改动不带上（列举多个项目路径未碰）

## 验证证据
- 来源会话 session-654aca6b-55f0-4a66-99a1-cac31cb91b3b（基线 f36e340）
- 最终状态：仓库数 36 / 与远端同步 36/36；涉及文件 zhi2-web-admin/scripts/vite-build.mjs、scripts/install.mjs、scripts/ci-doctor.mjs、bunfig.toml、package.json

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "cross_repo_ci_fix",
  "source_extraction_id": "1131dd29a19c47a4b66189023f0620ab",
  "version": 1,
  "memory_type": "entities"
}
-->