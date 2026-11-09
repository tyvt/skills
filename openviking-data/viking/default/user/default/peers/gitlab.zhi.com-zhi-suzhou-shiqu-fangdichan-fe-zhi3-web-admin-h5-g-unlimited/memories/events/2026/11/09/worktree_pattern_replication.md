# Summary
On base branch develop/v3.0.0, the assistant planned to replicate the established parallel-worktree pattern from bug-6372 (parent-level worktree 苏州市房地产监测V3-wt-bug-6372 with node_modules as a ReparsePoint junction to the main tree and the submodule on a matching branch) to set up a worktree for bug 6373.
# 2026-11-09 (Monday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: Good — the base is `develop/v3.0.0` and there's an established parallel-worktree pattern (`苏州市房地产监测V3-wt-bug-6372`). Let me inspect how that worktree set up its submodule + `node_modules` (worktree + submodule + build paths are finicky here) so I can replicate it for bug 6373.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: The established pattern is clear: a parent-level worktree (`苏州市房地产监测V3-wt-bug-6372`) with `node_modules` as a **ReparsePoint (junction)** to the main tree, and the submodule checked out on a matching branch. I'll replicate that for bug 6373. Let me set up the todo list and create the worktree.

<!-- MEMORY_FIELDS
{
  "event_name": "worktree_pattern_replication",
  "goal": "Set up bug 6373 worktree",
  "summary": "On base branch develop/v3.0.0, the assistant planned to replicate the established parallel-worktree pattern from bug-6372 (parent-level worktree 苏州市房地产监测V3-wt-bug-6372 with node_modules as a ReparsePoint junction to the main tree and the submodule on a matching branch) to set up a worktree for bug 6373.",
  "ranges": "4-6",
  "source_extraction_id": "433bccefcb4041fdb2a5670372442e62",
  "version": 1,
  "memory_type": "events"
}
-->