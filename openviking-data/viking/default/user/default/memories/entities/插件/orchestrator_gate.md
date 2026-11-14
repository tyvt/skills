# orchestrator-gate
DSH 本地 host 工具插件，拦截式强制所有对话经编排器执行（不自动转发）。

## 功能
- 通过 ctx.tools.guard() 在每次工具执行前拦截命中调用，返回拒绝理由引导改用 orchestrate
- 拦截式（仅拦下命中调用并提示，不自动转发），新对话不会自动经过编排器

## 部署坑（2026-11-12 根因）
- cordis.patch.yml 中 projectDir 指向的编排器目录存在 Write Deny ACL，导致 pnpm 每次跳过 orchestrator-gate → node_modules 永远旧拷贝 → 重启无数次不生效
- 移除 Deny 后重装，gate 真机被 [orchestrator-gate] 拦截验证通过

## 拦截实例
- 2026-11-14 构建命令被该门禁拦下，要求改走 orchestrate op=full；当次计划指定的 watchdog 脚本在 `.dsh/scripts` 与仓库路径均不存在。

## 关系
- 与 dsh-orchestrator 插件协同；设计文档 dsh/orchestrator-gate/DESIGN.md

<!-- MEMORY_FIELDS
{
  "category": "插件",
  "name": "orchestrator_gate",
  "source_extraction_id": "22ff556503114a24b450c66086241fcd",
  "version": 2,
  "memory_type": "entities"
}
-->