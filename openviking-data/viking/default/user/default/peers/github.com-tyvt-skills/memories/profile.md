# github.com-tyvt-skills
- Maintains the LangGraph+Magpie multi-model orchestrator: planner pool gpt-6-luna/gpt-5.4-mini/dsv4.1-flash; code_edit_with_signal and security_guard primary kimi-k3.1-pro; plan_reviewer/verifier grok-4.7@256k; workbuddy fallback space-bunny (file_reader/code_editor/summarizer/pwsh). (as of 2026-11-14)
- Model gateway exposes 22 available models; the cursor pool shrank from 14 to 10 on 2026-11-14; running an A/B comparison of auto/glm-5.3-flash (pay-as-you-go). (as of 2026-11-14)
- Retired models: codex/gpt-6-astra, codex/gpt-5.6-luna (all variants), cursor/composer-2.5, cursor/gpt-5.3-codex, cursor/gemini-4-hydrogen, cursor/gpt-5.4-nano, cursor/glm-5p3-flash, cursor/gpt-5.5@1m, cursor/gpt-5.5@272k, cursor/kimi-k3, cursor/muse-spark-1.3@300k, workbuddy/glm-5.3-flash, workbuddy/deepseek-v4-pro, workbuddy/glm-5.3. (as of 2026-11-14)
- Maintains the agent-guard interception system (exploration-drift rules enabled:true, mode:'warn', bookkeeping only) and the dsh-explore exploration-outsourcing skill. (as of 2026-11-14)
- Maintains dsh tools: cost-meter (tools.guard whitelist blocks whole read/grep/dump, bigMissStreak>=2, perStepUncachedBudget=10000, stepReminderThreshold=120, no per-step cacheRead/context-growth guard), plan-gate (pwsh git three-state interception for write/not-git/unknown plus _review.json credential check), solve-captcha.mjs (default vision model auto/deepseek-v4.1-flash, auto/hy3 image recognition disabled), concise-report (conclusion/evidence/pending three-part format, pointer at AGENTS.md:94). (as of 2026-11-16)
- Maintains zentao-analyzer (attachment-cache downloader zentao_file.py under D:\repository\skills\zentao-analyzer) and the OpenViking dsh-memory-plugin (profile-inject injection plus active retrieval; L1 active retrieval verified, caller=user baseline 0, observed across 5 troubleshooting sessions). (as of 2026-11-14)
- dsh subagent model selection is unconfigured in-repo: gated by per-tool enabled switches and the Session-level policy.routes whitelist; without a policy, subagents inherit the parent model. (as of 2026-11-14)
- Evaluation assets: T1–T7 execution-layer tasks, planner attribution samples #1–#15, route_miss logs, controller-bench (35 tasks across multiple models). (as of 2026-11-14)
- Maintains the DSH web profile config cordis.patch.yml at C:\Users\Administrator\.dsh\profiles\web\ (outside git); config and code/plugin changes take effect only after a manual web restart; ~/.dsh/orchestrator and ~/.dsh/cost-meter are symlinks to the repo, while ~/.dsh/profiles is a separate real directory. (as of 2026-11-16)
- The managed copy dsh/profiles/web/cordis.patch.yml in the skills repo is a stale snapshot (1055 lines vs 1418 live, roughly 409 lines behind); appends one line per semantic change and commits that single file. (as of 2026-11-14)
- web profile presets: preset-standard's tool-workflow is disabled while preset-cordis and preset-full-tools stay enabled; batches 1+2 together save about 2,123 tokens per step. (as of 2026-11-14)
- web profile skill catalog cut from 120 to 40 entries and dsh-harness-dev-context disabled; per-step fixed context 15.5k→14.6k (system prompt 1716→1383, skill injection 766→461), about 900 tokens/step saved; 14.6k treated as the reasonable end state. (as of 2026-11-14)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "32c920e17f2d469aa04dfc739405acc7",
  "peer_id": "github.com-tyvt-skills",
  "source_extraction_ids": [
    "0924dc862aaa409aa51cbab9170f1d9e",
    "1f9af026e7b54d939eb27b0664623a3e"
  ],
  "version": 37,
  "memory_type": "profile"
}
-->