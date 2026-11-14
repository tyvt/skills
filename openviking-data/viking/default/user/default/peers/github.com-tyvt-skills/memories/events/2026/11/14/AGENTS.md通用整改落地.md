# Summary
2026-11-14 按用户确认范围（A层+C-a，按节就近多次 edit）落地 dsh/AGENTS.md 六处通用规则整改：P0-1 编排器选型节加『拒绝/失败即改形态，同形态最多再试0次』；P0-2 计划审批节强制 plan_path 送审+回填 approved_sha256 禁提前写 approved；P0-4 长任务节长命令不走 orchestrate execution 改 pwsh 后台+watchdog；P1-2 落地节单步推理超1.5k无工具即发一条窄命令；P1-3 提问与收尾节一次问清显式含提交方式、计划确认轮合并问；P2-1 并行扇出节被拒不 abort 整 turn 改窄化重试；C-a 禁止节加 OpenViking 失败/超时1次即换 session_search/grep 且排除 profile.md 固定404已知路径。B层代码熔断未做（依赖未订阅的 post-execute 钩子，钩子名需真机核对）。
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: User feedback:
- **Scope**: "edit 按节就近、允许多次" — approve A layer, but for editing **edit section-by-section, adjacent (near the relevant rules), multiple edits allowed** (not cramming into 2-3 edits as I proposed). And **C-a wording should exclude the known-404 path** (i.e. don't say "1 failure always switches" for the known profile.md 404 which isn't a retry problem).
- **Commit**: 仅提交 (commit only).

The user did not select "A+B" nor "skip" — the custom note reinforces A-layer implementation with editing preferences. So: implement **A层 + C-a** (text changes to AGENTS.md), edit section-by-section, multiple edits; C-a excludes 404 known path; then commit only.

This now becomes a code/doc edit to AGENTS.md. Per the plan-gate, an edit needs an approved+human-confirmed plan. The user's answer to scope+the plan review constitutes confirmation intent, but the plan frontmatter still says `status: draft`. I should: set plan approved (human_confirmed true) since user confirmed, then implement. But do I need plan_review? AGENTS.md edits are instruction-text, no code build — the "纯文档交付不送审" applies to delivery docs; but this edits a live rule file. The plan-approval gate (dsh-plan-gate) will block edits unless plan is approved+human_confirmed. The user just human-confirmed the scope. For plan_review: it's a config/instructions change (not source code logic); I'll run plan_review to be safe since it changes behavior-enforcing rules. Actually — user explicitly said "edit 按节就近" signaling go ahead. The plan-gate rule: plan_review needed only when plan contains edit/write **code** changes. AGENTS.md is instructions, not code. I'll skip plan_review (per "纯文档/instructions 不送审" cost boundary) but set frontmatter approved+human_confirmed to satisfy the gate.

Let me update the plan frontmatter and the editing note, then implement. First revise plan to reflect the confirmed decisions (edit-by-section, C-a excludes 404).
...
**assistant [peer=github.com-tyvt-skills]**: Now implement A层 + C-a as section-by-section edits to `dsh/AGENTS.md`. I'll make multiple targeted edits, each near the relevant rule.

**A1** — add "拒绝即改形态" rule at end of 编排器选型节 (after line 18, before line 19 blank / line 20 并行扇出).
**assistant [peer=github.com-tyvt-skills]**: A1 applied (the re-injected instructions confirm line "拒绝/失败即改形态" is present). Note the merge rule says avoid re-injecting full instructions repeatedly — but the user explicitly asked for "按节就近、允许多次 edit", so I'll do targeted edits, and I already warned A-layer should be 2-3 combined edits. The user's preference overrides. Let me be efficient: do A2–A6 + C-a in a few section-adjacent edits.

**A2** (计划审批节, line 36) + **A3** (长任务节, line 59) + **A4** (落地节) + **A5** (提问与收尾) + **A6** (并行扇出) + **C-a** (禁止节). I'll do them as section-local edits.

A2 — edit the plan_review bullet:
**assistant [peer=github.com-tyvt-skills]**: A2 applied. Now A3 (长任务节 — append the orchestrate-execution ban after the foreground-build bullet), A4 (落地节), A5 (提问与收尾), A6 (并行扇出), C-a (禁止节). To avoid repeated full-file re-injections, I'll batch several edits in one message (independent edits to distinct anchors).
**assistant [peer=github.com-tyvt-skills]**: All A-layer edits (A1–A6) + C-a are now applied and confirmed in the re-injected file content:
- A1 拒绝/失败即改形态 (编排器选型节)
- A2 plan_path + approved_sha256 (计划审批节)
- A3 长命令不走 orchestrate execution (长任务节)
- A4 长 reasoning 即缺事实 (落地节)
- A5 一次问清 + 提交方式合并 (提问与收尾)
- A6 被拒不 abort (并行扇出)
- C-a OpenViking 失败即换 + 404 排除 (禁止节)

Now verify the diff is clean (no duplicates / no accidental breakage), then commit only. Let me check git status and diff for the file.
**assistant [peer=github.com-tyvt-skills]**: Diff stat: 8 insertions, 3 deletions — matches 6 additions (A1,A2's two-part,A3,A4,A5,A6,C-a → let me count: +A1, +A6, A2 modified 2 lines (+approved), +A3, +A4, +A5 modified 1 line, +C-a = 8 insertions, 3 deletions where A2's 2 lines rewritten + A5's 1 line rewritten = 3 deletions). Consistent, no duplicates. The diff is clean.

The truncated tail hides A3/A4/A5/C-a in the diff view but the re-injected file content above already confirms all are present and correct. Let me get the remaining diff tail to be thorough (A3/A4/C-a section).
**assistant [peer=github.com-tyvt-skills]**: All 6 edits + C-a verified in diff, clean, no duplicates, no breakage. Now commit only (user chose 仅提交). Per AGENTS.md I need `GIT_EDITOR=true`, and check dirty files scope. The repo is `D:\repository\skills\dsh` — is it a submodule? Let me check its git setup and commit there.
**assistant [peer=github.com-tyvt-skills]**: The git toplevel is `D:/repository/skills` (not a submodule — dsh is just a subdirectory of the skills repo). Only `AGENTS.md` is modified in scope (the `.plan` file is untracked; user said commit A-layer only). Let me also stage the plan file for record? User said "仅提交" for the A-layer change; the plan doc is a useful artifact. I'll commit both the AGENTS.md and the plan (they're the deliverable pair), but keep it scoped. Let me check full dirty state first to avoid reversion issues per "提交前一次性校验".
**assistant [peer=github.com-tyvt-skills]**: There are many pre-existing dirty files in the repo (not mine — cost-meter, orchestrator, etc. from prior sessions). The user wants "仅提交" for **this** change. I must commit **only** my deliverables: `dsh/AGENTS.md` + the plan file, not drag in unrelated modified files.

I'll stage surgically: `dsh/AGENTS.md` and `.plan/general-issues-remediation-20261114.md`.
**assistant [peer=github.com-tyvt-skills]**: Only the two intended files are staged. Commit.

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS.md通用整改落地",
  "goal": "记录A层规则落地",
  "summary": "2026-11-14 按用户确认范围（A层+C-a，按节就近多次 edit）落地 dsh/AGENTS.md 六处通用规则整改：P0-1 编排器选型节加『拒绝/失败即改形态，同形态最多再试0次』；P0-2 计划审批节强制 plan_path 送审+回填 approved_sha256 禁提前写 approved；P0-4 长任务节长命令不走 orchestrate execution 改 pwsh 后台+watchdog；P1-2 落地节单步推理超1.5k无工具即发一条窄命令；P1-3 提问与收尾节一次问清显式含提交方式、计划确认轮合并问；P2-1 并行扇出节被拒不 abort 整 turn 改窄化重试；C-a 禁止节加 OpenViking 失败/超时1次即换 session_search/grep 且排除 profile.md 固定404已知路径。B层代码熔断未做（依赖未订阅的 post-execute 钩子，钩子名需真机核对）。",
  "ranges": "105,107-127",
  "source_extraction_id": "363a1d87d42341af988d83cfc2b26685",
  "version": 1,
  "memory_type": "events"
}
-->