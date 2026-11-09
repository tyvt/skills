# OpenViking Snapshot Backup
`run-openviking-snapshots.ps1` is the wrapper that snapshots and git-pushes the OpenViking memory data.

## Description
- Windows scheduled task `OpenViking-Memory-Snapshot` runs it daily at 03:00 with `-Reason scheduled -Push`
- Mirrors `data/viking/default/user/default/`, `data/vectordb/`, `backend_meta.json` into `skills/openviking-data/` (robocopy /MIR guard, zero-fill on memory `.md`)
- With `--commit --push`: `git add openviking-data` only, commits `chore(openviking-data): 全量快照 N files (reason)`, pushes `origin main` with retries
- Logs every run to `%TEMP%/openviking-snapshot/<timestamp>.log`

## Known Issues
- Push-success detection gives false negatives: on 2026-11-09 the snapshot + local commit `c9a15051` reached GitHub (ancestor of `origin/main` `d1e022e9`) yet the script reported push failure (EXIT 1), flagging the task failed
- Wrapper stops OpenViking for the vectordb copy, then restarts only `if ($wasRunning)` via `Start-OpenVikingIfDown`, which does NOT start Ollama and does NOT verify the server returned — causing OV to stay down (e.g. 2026-11-09 until watchdog revived at 16:58)

## Related Facts
- Raw exports in `memory-migration/out/` are 240 MB / 4359 files (cursor/workbuddy/opencode); copied into backup before commit
- Git remote `tyvt/skills.git`; node v22.23.2 available

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "openviking_snapshot",
  "source_extraction_id": "6f5d10adb0bc48258ef3bd043a2e3b79",
  "version": 1,
  "memory_type": "entities"
}
-->