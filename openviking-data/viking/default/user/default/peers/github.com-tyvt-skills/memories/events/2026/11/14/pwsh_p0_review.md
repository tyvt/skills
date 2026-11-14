# Summary
github.com-tyvt-skills identified a P0 bug while reviewing orchestrator-gate plan step 5 on 2026-11-14: placing the pwsh branch before the existing path-based interception and returning null for not-git did not confine the new git-gate logic to pwsh-only, risking path-interception bypass. The corrected design keeps the entire git-gate inside a strictly `tool==="pwsh"` early-return branch so pwsh never flows into plan-approval; unknown states always reject.
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Review now **REJECT (66/100, 1 P0)**. The reviewer's P0 is a valid bug in my step-5 wording:

> P0: "pwsh 分支置路径拦截之前……not-git 显式 return null，但 command 缺失/非字符串→拒，**且未限定对 pwsh 以外 git 工具的前置拦截**……路径类拦截会被绕过 / args.command 字符串被拦"

Reading carefully: the P0 concern is that putting the pwsh branch **before** the existing path-based interception, and having `not-git` `return null`, doesn't confine the new logic to pwsh only — a non-pwsh tool could be affected, or the ordering lets something slip. The reviewer suggests: **when tool is pwsh handle three states; `not-git` should not `return null` early — should fall through to the original path**, and `unknown` always reject (drop write-priority complexity).

Also P1-3: must verify `from src.verify import compute_content_sha` is actually importable AND use identical path bytes; the review wants me to confirm the import path works.

Let me verify the Python import works (cheap, concrete), then fix the plan:
- pwsh branch: **only within `tool==="pwsh"`**; `not-git` → fall through to existing logic (which for pwsh is harmless since pwsh isn't in default path tools—but after I add pwsh to guardTools, the existing path branch would call `rejectReason` requiring a plan!). That's the real trap: if pwsh is in guardTools and I `return null` for not-git, fine; but if I let it fall through, the existing `findApprovedPlan` logic applies — which would require a plan for every pwsh command. So `not-git` must `return null` to avoid that. The reviewer's suggestion conflicts.

Let me re-read: reviewer says "not-git 显式 return null 应保留原路径处理" — this is ambiguous. The correct design: keep the **entire new git-gate inside the pwsh branch and return early** so pwsh never flows into the plan-approval path branch. The P0 seems to be about **not clobbering non-pwsh tools**. Let me make it explicit and unambiguous: the pwsh handling is a separate early return guarded strictly by `if (tool === "pwsh")`, and it completely owns pwsh (never falls into plan-approval check). First verify the import, then rewrite.

<!-- MEMORY_FIELDS
{
  "event_name": "pwsh_p0_review",
  "goal": "Review plan step 5 pwsh bug",
  "summary": "github.com-tyvt-skills identified a P0 bug while reviewing orchestrator-gate plan step 5 on 2026-11-14: placing the pwsh branch before the existing path-based interception and returning null for not-git did not confine the new git-gate logic to pwsh-only, risking path-interception bypass. The corrected design keeps the entire git-gate inside a strictly `tool===\"pwsh\"` early-return branch so pwsh never flows into plan-approval; unknown states always reject.",
  "ranges": "1",
  "source_extraction_id": "02aeabaeb34741a4afdef7ba6f873d05",
  "version": 1,
  "memory_type": "events"
}
-->