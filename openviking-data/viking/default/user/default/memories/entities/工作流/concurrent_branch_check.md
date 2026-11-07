# 批量操作多仓库时工作区并发切老分支的核对规范
跨仓库批量修复期间，工作区可能被并发进程切到老分支，必须在批量前后逐仓库核对当前分支与落后提交数。

## 适用场景
- 批量修 36 个仓库过程中，`园区公共收益` 工作区被切到 `develop/v.2.6.2`（2026-09-20 老分支，落后 90 提交）
- 修复本身在 `develop/v2.6.1` 提交推送成功（`456fa54`），仅工作区跑偏

## 核心做法
- 批量开始前记录每个仓库当前分支与 HEAD；结束后逐仓库核对分支与落后/领先提交数
- 发现跑偏先确认修复提交在正确分支已推送，再把工作区切回，不慌着重做
- 分支名看全（`v.2.6.2` vs `v2.6.1` 只差一字符）；切回后检查关键文件齐全（如 `scripts/` 三脚本）
- 无关本地改动不携带

## 验证证据
- 来源会话 session-654aca6b-55f0-4a66-99a1-cac31cb91b3b（基线 f36e340）
- 涉及文件 scripts/vite-build.mjs、scripts/install.mjs、scripts/ci-doctor.mjs

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "concurrent_branch_check",
  "source_extraction_id": "1131dd29a19c47a4b66189023f0620ab",
  "version": 1,
  "memory_type": "entities"
}
-->