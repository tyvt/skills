# OpenViking
OpenViking is the memory system used by the peer, with a plugin and scheduled audit task.

## Plugin and Startup
- dsh-memory-plugin provides profile-inject injection and proactive retrieval.
- Startup script and watchdog are at C:\Users\Administrator\.openviking\ (git repo on master, no remote configured so cannot push; back up to .bak before changes).
- From 2026-11-25, two LLM entries switched to hy4flash-free primary with hy4flash points fallback.

## Memory Store
- The memory library holds about 6585 entries, pure Markdown with no frontmatter.
- URIs follow viking://user/default/memories/{entities,preferences,_archive}/...
- ov CLI v0.5.5 supports ls -r, read, write, set-tags, glob, and --output json.
- The Python SDK has no top-level exports, so scripts can only use the CLI.

## Scheduled Audit
- A daily 08:30 memory audit task schedule-e31f1263-6af2-4270-9031-b04f4a795ce9 is active with target=new; next run is 2026-11-26 08:30.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "software_system",
  "name": "openviking",
  "source_extraction_id": "e2f409bd407d469e808bee653001c5b7",
  "version": 1,
  "memory_type": "entities"
}
-->