# Summary
2026-11-13 评测发现现役主控 workbuddy/deepseek-v4.1-flash 在 T9 输出含非法 JSON 转义（TS\d+ 中的 \d），被 score.ps1 判 format_error 全维0，致其 T 总分垫底（0.605，Δ-0.261）。该缺陷为模型真实行为非评分器bug；但其在 T10 单题拿0.906全场最高（正确写出 loadConfigFromFile 无侵入换道）。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: D:\repository\skills\controller-bench
取上一轮排名前15的模型，跑T8-T11测试
...
**assistant [peer=github.com-tyvt-skills]**: Scoring works. Key observations:
- **`workbuddy/deepseek-v4.1-flash` (current planner) has a format_error on T9** (that's why n=4 with fmt_err=1, and total 0.60). Let me inspect that row's raw — critical for the current planner model.
- `codex/gpt-5.6-sol T8` still http_000 timeout (only 3 tasks scored).
- **completeness（comp）普遍偏低**（0.25-0.75）— 这符合 _meta 说明的 T 题 required 是文本级严苛匹配（台阶式 0/1/2，邻近阈值 50/60 字容易漏）。这是设计局限，不是模型差。

Let me retry the two problem rows (gpt-5.6-sol T8 timeout + deepseek-v4.1-flash T9 format_error) since they materially affect the two most important data points. First inspect the deepseek T9 raw.
...
**assistant [peer=github.com-tyvt-skills]**: The raw is **valid JSON with route/steps/analysis/notes**. Why did score.ps1 flag it as format_error? The content is complete and sensible. Let me test parsing it directly — likely a PowerShell ConvertFrom-Json depth/escaping issue with the `TS\d+` or `cd (` etc. Actually the issue: `convertfrom-json` may fail if content has something. Let me test.
...
**assistant [peer=github.com-tyvt-skills]**: Found the cause: the model wrote `TS\d+` inside the JSON string — `\d` is an invalid JSON escape (should be `\\d`). The model produced **technically invalid JSON** (bad escape), so format_error=0 is **legitimately correct** per the scoring rule "输出无法解析为 JSON → 全维 0". This is a real model behavior flaw, not a scorer bug.

So `workbuddy/deepseek-v4.1-flash` genuinely emitted malformed JSON on T9. That's a legitimate finding. I won't "fix" it — it's the model's output. Good.

Now the only true data gap is `codex/gpt-5.6-sol T8 http_000` (180s timeout). That's a network/timeout, worth retrying once. Let me retry that single combo. I'll remove its row and re-run just that model+task via a targeted approach.
...
**assistant [peer=github.com-tyvt-skills]**: Excellent — now the full comparison is clear. Key insights:

- **T8-T11 综合对抗题对多数模型是"逆风题"**（dT 普遍为负，-0.04 ~ -0.26），因为 completeness 极严 + T9/T10 需要真实执行层策略文本。
- **冠军反差**：上一轮 M1-M5 第1名 `cursor/grok-4.7` 在 T 上掉到并列第10（0.756，dT=-0.148）；`codex/gpt-6-luna` 在 T 上封顶 0.875（唯一 dT 为正的常规模型之一）。
- **现役 planner `workbuddy/deepseek-v4.1-flash` T 上垫底（0.605）**，dT=-0.261 全场最差 —— 主要因 **T9 输出非法 JSON（`\d` 无效转义）被判 format_error 全维 0**，这一点非常关键。它有快速优势（Tms=7111 最快之一），但对抗类题目稳定性是硬伤。
- `codex/gpt-5.6-luna`、`gpt-6-luna` 两个 Luna 在 T 上"低开高走"（dT 正）。

Let me verify the deepseek T9 format_error detail and the T10 weak spots before writing the report. Let me also check T10 (the weakest common task) specifics.
...
**assistant [peer=github.com-tyvt-skills]**: ...而**上轮冠亚军 `cursor/grok-4.7`、`auto/glm-5.3-flash` 双双回落到 T 第 10**——通用规划强 ≠ 对抗场景策略强。
- **现役 planner `workbuddy/deepseek-v4.1-flash` 在 T 上垫底（0.605，Δ −0.261）**，两处硬伤：① T9 输出非法 JSON（`TS\d+` 的 `\d` 非法转义 → format_error 全维 0）；② 步骤冗余（eff 仅 0.32）。但它在 **T10 单题拿 0.906 全场最高**（正确写出 loadConfigFromFile 无侵入换道），说明因果推断能力不弱，栽在 JSON 规范性与步骤精简。...

<!-- MEMORY_FIELDS
{
  "event_name": "现役主控非法JSON缺陷发现",
  "goal": "记录现役planner缺陷",
  "summary": "2026-11-13 评测发现现役主控 workbuddy/deepseek-v4.1-flash 在 T9 输出含非法 JSON 转义（TS\\d+ 中的 \\d），被 score.ps1 判 format_error 全维0，致其 T 总分垫底（0.605，Δ-0.261）。该缺陷为模型真实行为非评分器bug；但其在 T10 单题拿0.906全场最高（正确写出 loadConfigFromFile 无侵入换道）。",
  "ranges": "0,92,94,96,112,132,133",
  "source_extraction_id": "a8f596e6caa44c1f997b8900addef7bc",
  "version": 1,
  "memory_type": "events"
}
-->