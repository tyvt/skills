# agent-guard
DSH 本地插件（符号链接到 ~/.dsh/，零依赖），为 agent 的文件与命令调用加守卫规则，实现分在 lib/scope.js、lib/rules.js 与 lib/index.js。

## 拦截规则
- lib/scope.js（as of 2026-11-10）：仓库根、受保护容器、工作区根下的 grep/glob 直接拒绝，并做 git 仓库根探测
- openviking search 参数别名 queries→query
- P1-5 pwsh POSIX 预检、P1-6 glob 路径规范化、P1-7 重复整读拦截（lib/rules.js + lib/index.js）

## 自修复与告警（as of 2026-11-11）
- repairPwshAtBrace：pwsh 命令里未加引号的 @{} 自动补单引号，修复 git rev-parse @{u} 类错误
- warnPwshBuffering：命令含 Out-String/Format-Table/ConvertTo-Json/ConvertTo-Csv 时返回纯告警，提示改用 2>&1 或 *> 流式重定向，不改命令本身

## 关系
- 由 github.com-tyvt-skills 维护；探索漂移三规则 enabled:true、mode:'warn'，只记账不阻断
- 与 dsh-explore 探索外包 skill 配合；同为零依赖本地插件的还有 dsh-token-guard、dsh-cost-meter、dsh-orchestrator

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "agent_guard",
  "source_extraction_id": "fa049ff27bf94cea909ff331a50cdbbf",
  "version": 1,
  "memory_type": "entities"
}
-->