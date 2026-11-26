# agent-guard
DSH 本地插件（符号链接到 ~/.dsh/，零依赖），运行时注入时机性提醒并对 agent 的文件与命令调用加守卫规则，实现分散在 lib/scope.js、lib/rules.js 与 lib/index.js。

## 定位与维护
- 作为「半硬约束」在运行时注入时机性提醒，弥补 AGENTS.md/skill 软约束被模型忽略的缺口，把规则下沉为框架强制而非靠模型自觉
- 由 github.com-tyvt-skills 维护
- 改动后必须重启 DSH WEB 才生效，否则旧实例沿用旧规则 (as of 2026-11-11)
- 同次改动含 skill 文档 references/dbx.md，文档按需读取通常无需重启即可生效

## 拦截规则与告警
- lib/scope.js（as of 2026-11-10）：仓库根、受保护容器、工作区根下的 grep/glob 直接拒绝，并做 git 仓库根探测
- openviking search 参数别名 queries→query；P1-5 pwsh POSIX 预检、P1-6 glob 路径规范化、P1-7 重复整读拦截（lib/rules.js + lib/index.js）
- repairPwshAtBrace：pwsh 命令里未加引号的 @{} 自动补单引号，修复 git rev-parse @{u} 类错误
- warnPwshBuffering：检测 `pwsh | Out-String` 类命令后返回 `pwsh-buffering` 告警，提示改用 2>&1 或 *> 流式重定向，不改命令本身
- 探索漂移三规则 enabled:true、mode:'warn'，只记账不阻断
- 2026-11-11 审计优化新增：拒绝提供可照抄的 glob/grep 模板；重复整读时返回上次区间与续读 offset；ask_user_question 缺 id 时自动补 q0/q1。

## 前端验证轮询门禁（verify-loop）
- 规则在 lib/rules.js:1017 decideVerifyLoop：同一会话内 agent-browser 调用 >12 或 Start-Sleep >5 即拒绝，文案为 `[verify-loop:BLOCKED] 本轮已调用 agent-browser N 次（阈值 12）`
- 关键缺陷：计数器按 session id 累计、跨轮从不重置（lib/index.js:191-203 getSessionDrift），模型误判「按轮计数、下一轮重置」而主动结束回合等用户回复「继续」，但回复不解锁
- ~/.dsh/reports/agent-guard-ledger.jsonl 中该门禁累计触发 2198 次
- 2026-11-24 用户裁决：verify-loop 由 block 降级为 warn（保留 ledger 记录与提醒文案、不拒绝工具调用），改 ~/.dsh/agent-guard/cordis.patch.yml:115，重启 DSH Web 后生效

## 关联
- 与 dsh-explore 探索外包 skill 配合；同为零依赖本地插件、同属 DSH 本地插件的还有 dsh-token-guard、dsh-cost-meter、dsh-orchestrator

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "agent_guard",
  "source_extraction_id": "99c80217e9b04daa9be298ae8ceac4bb",
  "version": 3,
  "memory_type": "entities"
}
-->