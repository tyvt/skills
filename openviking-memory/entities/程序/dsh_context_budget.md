# DSH 单步上下文预算
DSH Web 单次请求固定上下文开销的实测构成，2026-11-14 实测由 15.5k 收敛到 14.6k。

## 优化结果
- 初始截图：总量 15.5k、系统提示 1716、技能注入 766、工具定义 6.2k
- 技能目录 120→40（cordis.patch.yml L140、L355）：总量 14.9k，技能注入 766→461（−305）
- 禁用 dsh-harness-dev-context：总量 14.6k，系统提示 1716→1383（−333）
- 累计省约 900 token/步；用户一条 "hi" 仅 9 token，94%+ 是工具体系固定开销

## 剩余构成（合理终态）
- 工具定义 6.2k（54%），已裁到骨头，剩 Team 工具组约 1.2k 属功能所需
- 注入内容 3.3k（29%），AGENTS.md 硬规则，不应改动
- 系统提示 1.4k（12%），harness 默认行为段硬编码，dev 噪音已去掉
- 技能注入 461、用户 9、助手约 100

## 测量与验证
- 面板有两套数（累计环形图 vs 当前请求），须看"当前上下文/上下文浏览器"才是本次单轮实值
- projcache sys_last：新进程会话 d819b524、d95391b1 为 1383；旧进程会话 39e84ea8、c1b36f90 为 1716
- 原估降幅 560 系按字符数/2.5 估算偏高，tokenizer 实际为 333（已诚实更正）
- 验证工具仍可用，优化后无功能异常

## 落点与回滚
- 落点：~/.dsh/profiles/web/cordis.patch.yml（技能两处 120→40、末尾新增 harness-dev-context disabled:true），该文件不在 git 仓库
- 回滚：删 harness-dev-context 那条、技能两处改回 120，重启 web 即可
- 计划文档 p1c-trim-skill-catalog、p1d-disable-harness-dev-context（均在 .plan/，已 approved）；restart-web.ps1 的 bug 未修，按用户意愿手动重启

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_context_budget",
  "source_extraction_id": "fa049ff27bf94cea909ff331a50cdbbf",
  "version": 1,
  "memory_type": "entities"
}
-->