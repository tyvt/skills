---
status: approved
human_confirmed: true
approved_sha256: 1abc98253bfdd737728946635fb40e38f3b1d0849a15e823d4c81fe4e15e198f
approved_version: 1
---

# 编排器 config.yaml 按评测数据最优重编 + 修复已下线引用

## 一、前因后果（痛点）
config.yaml 仍引用两个**网关已下线**模型：`codex/gpt-5.6-luna`（planner 第2档）、`cursor/grok-4.7@256k`（plan_reviewer/verifier 首档）——不修则这些池请求失败降级。且 code_edit_with_signal 主选 composer-2.5 实测 JSON 坍缩（初筛 4/6）。需按 35 题全量评测数据把各池换成实测最优模型。

## 二、现状与证据
- 网关现存 22 模型（2026-11-14 拉取）；**已下线仍在 config 引用**：`codex/gpt-5.6-luna`(planner L104)、`cursor/grok-4.7@256k`(plan_reviewer L168 / verifier L186，网关只剩 `@500k`)。
- 全量评测有效分（fmt/err 记 0，35 题）关键数据：workbuddy/kimi-k3.1-pro **0.849**（JSON 最稳 1/35 fmt、M2 0.94、M4 0.96、M7 1.0）；cursor/grok-4.7@500k **0.820**（M4 0.94、M10 评审 1.0）；cursor/gpt-5.4-mini 0.809（T 对抗 0.83 最高、M7 扇出 1.0、M3 坏工具 0.96）；cursor/claude-opus-4-7 0.803（M1 0.85、M4 0.98 最高）；cursor/dsv41-flash-1017 0.787（最快 4.0s、M3 0.92）；codex/gpt-6-luna 0.769（T 对抗 0.79、M2 0.98）；workbuddy/deepseek-v4.1-flash 0.732（最快兜底）。
- planner 现池 L101-107；plan_reviewer L164-173；verifier L185-192；code_edit_with_signal L83-90。

## 三、实施方案（逐池改，仅 model 行；max_tokens/timeout 沿用）
1. **planner**（L102-107）：`[gpt-6-luna, gpt-5.6-luna(下线), deepseek-v4.1-flash]` → **`[codex/gpt-6-luna, cursor/gpt-5.4-mini, workbuddy/deepseek-v4.1-flash]`**（首档保留 gpt-6-luna 依赖/T 对抗强；第2档换 gpt-5.4-mini 补对抗/扇出；第3档 flash 兜底）。逐档 max_tokens 8192 沿用。
2. **code_edit_with_signal**（L84-89）：主选 `cursor/composer-2.5`(JSON坍缩) → **`workbuddy/kimi-k3.1-pro`**(0.849 最高、代码强、JSON 稳)，max_tokens 6144；兜底维持 space-bunny / deepseek-v4.1-flash。
3. **plan_reviewer**（L168）：首档 `cursor/grok-4.7@256k`(下线) → **`cursor/grok-4.7@500k`**（网关唯一 grok-4.7 变体、综合最强、M10 评审 1.0）；deepseek / auto 兜底不变。
4. **verifier**（L186）：同上 `@256k` → **`@500k`**；兜底不变。
5. **其余池不动**：file_reader/code_editor/image_analyst/security_guard/security_guard_fast/summarizer/pwsh 均已在网关且评测可用（flash 系轻量/兜底恰当），不换。
6. 不改 graph.py、不改 router.py、不改测试（改后跑 pytest 校验；若有断言硬编码 gpt-5.6-luna/grok-4.7@256k 再同步）。

## 四、验证计划
- 残留已下线模型=空（带 provider 前缀逐条核对，回应 P1-1）：`python -c "from src.config import load_config;c=load_config('config.yaml');bad=[(t,m.model) for t in c.tools for m in getattr(c.tools[t],'models',[]) if m.model in ('codex/gpt-5.6-luna','cursor/grok-4.7@256k')];print('残留:',bad);assert not bad"`。
- 逐池完整 dump 核对（provider 前缀全程一致）：planner=[codex/gpt-6-luna,cursor/gpt-5.4-mini,workbuddy/deepseek-v4.1-flash]、code_edit_with_signal=[workbuddy/kimi-k3.1-pro,workbuddy/space-bunny,workbuddy/deepseek-v4.1-flash]、plan_reviewer/verifier 首档=cursor/grok-4.7@500k。
- 改前先全仓 grep `gpt-5.6-luna\|grok-4.7@256k`（*.py *.yaml）确认无遗留引用需同步（已核 *.py 无匹配），再改 config，最后 pytest（回应 P1-2 顺序）。
- `python -m pytest -q`（全量 160）无回归（本次改动为配置项，verify.kind=unit，回应 P2）。
- 重启 DSH Web 后 `op:list` 冒烟复验池结构（真机）。

> 变更受 git 管理，git revert 即可。
