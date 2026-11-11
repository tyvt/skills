# agent-guard
DSH 本地代理守护插件，运行时注入时机性提醒（半硬约束），弥补 AGENTS.md/skill 软约束被模型忽略的缺口。

## 基本属性
- 源码含 lib/rules.js，定义 warnPwshBuffering 等运行时规则，作为已被 DSH 加载的模块运行
- 改动后必须重启 DSH WEB 才生效，否则旧实例沿用旧规则 (as of 2026-11-11)
- 同次改动含 skill 文档 references/dbx.md，但文档按需读取通常无需重启即可生效

## 功能
- warnPwshBuffering：检测 `pwsh | Out-String` 之类命令，重启 DSH 后开始返回 `pwsh-buffering` 告警

## 关联
- 与 dsh-token-guard 同属 DSH 本地插件，规则下沉为框架强制而非靠模型自觉
- 对应三层约束中的"半硬约束"（DSH plugin 注入 notice 管时机性提醒）

<!-- MEMORY_FIELDS
{
  "category": "插件",
  "name": "agent_guard",
  "source_extraction_id": "67a90c7af65f4a4484d59889e07543d6",
  "version": 1,
  "memory_type": "entities"
}
-->