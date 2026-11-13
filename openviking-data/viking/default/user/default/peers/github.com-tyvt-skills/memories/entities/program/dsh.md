# DSH
DSH 是一个“一切皆插件”的 AI 代理系统，工具、技能、会话、沙箱、agent 循环、子 agent、工作流、UI 均可插拔。

## Description
- 设计原则：用插件/钩子替代文字约束，减少每轮上下文成本
- 用户配置位于 ~/.dsh/AGENTS.md（符号链接到 dsh/AGENTS.md）
- 技能目录 ~/.dsh/skills，包含 zentao-analyzer、dsh-token-policy 等

## Key Facts
- 上一轮成本复盘指出 200k 量级浪费来自把可确定性执行的事写成文字
- P0 已落地：AGENTS.md 瘦身、zentao-analyzer 拆分、禁止项写入常驻层
- 2026-11-13 AGENTS.md:16 探索纪律改为三级优先级：dsh-explore 子代理探索为默认首选，主模型 pwsh 盲搜为兜底 (as of 2026-11-13)

## Relations
- 包含 zentao-analyzer skill（入口+references）
- 包含 dsh-token-policy skill（Token与编排策略）
- 规划 szfc 项目专属插件包与 zentao 通用插件包

## 插件钩子机制（as of 2026-11-12）
- `tools.guard(fn)`：注册于 dsh-tools 工具注册表 layer，每次工具执行前同步跑，返回字符串即拒绝该次调用，模型收到 `Error: <理由>`，守卫单调（不可被其它 guard 强放行）——是跨 plane 唯一可靠的强制拦截点
- `tools/pre-execute`：dsh-tools 中的 waterfall 钩子，可返回 `{kind:'deny',reason,info}` 拦截单个工具；但工具注册表在 agent plane、插件在 host plane，跨 plane 导致 `ctx.on('tools/pre-execute')` 收不到事件，必须用 `ctx.tools.guard()`
- `agent/pre-step`：dsh-agent-loop 中的 waterfall 钩子，进入下一步前可 `enter` 注入提示或 `reject`；`reject` 会直接以 `blocked` 终止整个 turn，无法做逐工具重试拦截
- `agent-guard` 插件是生产级 `tools/pre-execute` + `tools.guard` 范例（注释证实单纯 `ctx.on('tools/pre-execute')` 收不到事件）

## System Prompt 注入架构（as of 2026-11-13）
- 系统提示词由三句独立来源拼接："You are AutoClaw..." / "You are an AI agent." / "You are a coding agent powered by the {{model}} model."
- 句①"You are AutoClaw. Answer the user directly and concisely."来自 magpie 出站插件 @magpie-community/opencode-autoclaw-auth 硬编码 OFFICIAL_SYSTEM_PROMPT（index.mjs:63），经 autoclawRewriteBody() 出站前前置拼接
- 句②"You are an AI agent."来自 DSH 核心 dsh-system-prompt 的 harness:identity 段（includeHarnessIdentity 默认开，lib/index.js:231）
- 句③"You are a coding agent powered by the {{model}} model."来自 bundle 出厂模板 personaPrefix，{{model}} 由 dsh-agent-loop 注册并在组装时替换为当前模型 id（本机副本 ~\.dsh\profiles\web\cordis.patch.yml:108）
- 修改点（已于 2026-11-13 实施）：句③ cordis.patch.yml 第108行 prefix 改为空串；句② system-prompt 覆盖块设 includeHarnessIdentity:false；句① DSH 侧无法改，只能换非 autoclaw provider 或改 magpie 插件

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "dsh",
  "source_extraction_id": "84a205cebe754ae086ba02758c76092c",
  "peer_id": "github.com-tyvt-skills",
  "version": 5,
  "memory_type": "entities"
}
-->