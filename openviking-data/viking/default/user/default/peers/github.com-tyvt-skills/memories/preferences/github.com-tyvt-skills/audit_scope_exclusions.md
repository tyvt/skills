- Exclude memory-store directories such as `skills/openviking-memory/`, `skills/openviking-data/`, and `skills/memory-migration-archive/` from code scans; circular hits inside stored memories are not real code evidence.
- Skip `node_modules`, `dist`, and backup directories in bounded searches to avoid invalid hits in dependencies and build artifacts.
- When results are dominated by `dist/` or other build artifacts, narrow verification to source directories with targeted globs and exact source files.
- Worktree copies can inflate scan counts; verify against the main repository's narrow paths.
- When capped grep output lets memory-archive files sort ahead of real source, treat archive-only hits as a sampling artifact and rerun the decisive check excluding memory-archive directories before judging INVALID.
- If decisive symbol hits fall mostly in `skills/memory-migration-archive/`, `skills/openviking-data/`, or `skills/openviking-memory/`, treat them as archive or mirror hits rather than source evidence and exclude the whole `skills/` directory for the rescan.
- Writing audit or cache scripts is not a frontend code change; build-gate does not apply, so verification scripts can be run directly.
- When only cache or helper files are written under `~/.dsh/cache/memory-audit/`, continue without establishing a project code baseline.
- Exclude irrelevant loaded skills from task execution: when a loaded skill addresses a different topic, such as OpenViking troubleshooting during a memory-audit task, do not force-fit it; treat the task reminder prompt as self-contained.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "audit_scope_exclusions",
  "source_extraction_id": "3304d4eccd944b89bbd565c61fc394e6",
  "version": 1,
  "memory_type": "preferences"
}
-->