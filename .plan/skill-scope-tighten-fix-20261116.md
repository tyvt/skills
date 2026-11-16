---
plan_id: skill-scope-tighten-fix-20261116
status: approved
human_confirmed: true
approved_sha256: 072bc24ebb1b2804120c67ad51804f21141076c4c0ef169bda6047f68ab35c74
approved_version: 1
---

# token-frugal 收窄后的自洽修正

## ① 前因后果
上一轮把 token-frugal 从「审计+治理」收窄为「工作流归因」，删掉了 `audit-tokens.mjs` 命令与治理/阈值节，但 §0 与标题仍指向已删入口，读者找不到脚本。同时阈值口径散在 token-optimizer 与 dsh-token-policy 两处，易漂移。本计划只做纯文档自洽修正，不改变实际脚本行为。

## ② 现状与证据
- `token-frugal/SKILL.md:6` 标题仍为「会话 token 用量审计与治理」，与 body（§4 已声明不维护阈值）不一致。
- `token-frugal/SKILL.md:14` 「账的问题 → 用 `audit-tokens.mjs`」；脚本文件仍在（`token-frugal/audit-tokens.mjs` exists=True），但 §2 已删除其运行命令，§0 声称「用它」却无处看命令，指向断裂。
- `token-optimizer/SKILL.md:50` 节「判读阈值」维护整张数值表（`<80%`/`>12k`/`<5%`/`>20%`/`>60%`），与 `dsh-token-policy`（AGENTS.md 指向的权威口径）存在重复可能。
- dsh-token-policy skill 存在：`dsh-token-policy\SKILL.md`。

## ③ 实施方案
1. `token-frugal/SKILL.md:6` 标题改为「token-frugal — 会话 token / 上下文成本工作流归因」。
2. `token-frugal/SKILL.md:14` 将「账的问题 → 用 `audit-tokens.mjs`」改为「跨会话成本排序/账 → 见 `token-optimizer`；本 skill 只做归因」，避免 §0 指向正文已无命令的入口；保留 L15 每模型清单（`audit-models.mjs`，脚本存在 exists=True，命令见 §2.5）。
3. `token-optimizer/SKILL.md:50` 节首加一句：「数值口径以 `dsh-token-policy` 为准，本表为判读速查」，表体不动。

不改 `dsh/AGENTS.md`、`dsh/agent-guard/lib/rules.js`，不动任何 .mjs 脚本。

## ④ 验证计划
- `git diff` 复核三处仅文档文字改动。
- `grep -n "audit-tokens.mjs" token-frugal/SKILL.md` 确认 §0 内 L14 不再以该脚本作为入口，§2.5 的 `audit-models.mjs` 保留。
- 通读 token-frugal §0 与标题，确认与 §4 收窄声明一致。
- 构建：本次仅改 Markdown 文档，无 JS/TS 产物可编译，不执行 npm run build（未执行，原因：纯文档改动、仓内无对应构建目标）。
