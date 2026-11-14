# Summary
github.com-tyvt-skills found on 2026-11-14 that a relative path `.task-state\...` resolved under the wrong cwd when the runner launched from `dsh/langgraph-orchestrator`; the rerun must use the repo-root workdir so the relative path resolves correctly.
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Note: I ran from `dsh/langgraph-orchestrator` (cwd), but the runner script uses absolute paths so it's fine. Let me wait.
...
**assistant [peer=github.com-tyvt-skills]**: The relative path `.task-state\...` resolved under the wrong cwd. Let me rerun with the correct workdir (repo root) so relative path resolves, or use absolute path.

<!-- MEMORY_FIELDS
{
  "event_name": "taskstate_cwd_bug",
  "goal": "Fix relative path cwd error",
  "summary": "github.com-tyvt-skills found on 2026-11-14 that a relative path `.task-state\\...` resolved under the wrong cwd when the runner launched from `dsh/langgraph-orchestrator`; the rerun must use the repo-root workdir so the relative path resolves correctly.",
  "ranges": "15,17",
  "source_extraction_id": "02aeabaeb34741a4afdef7ba6f873d05",
  "version": 1,
  "memory_type": "events"
}
-->