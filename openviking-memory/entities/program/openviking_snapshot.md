# OpenViking Snapshot Backup
`run-openviking-snapshots.ps1` is the wrapper that snapshots and git-pushes the OpenViking memory data.

## Description
- Windows scheduled task `OpenViking-Memory-Snapshot` runs it daily at 03:00 with `-Reason scheduled -Push`
- Mirrors `data/viking/default/user/default/`, `data/vectordb/`, `backend_meta.json` into `skills/openviking-data/` (robocopy /MIR guard, zero-fill on memory `.md`)
- A third step (added 2026-11-09) runs `scripts/snapshot-memory-migration-archive.mjs`, mirroring `memory-migration/out/` into the separate top-level `memory-migration-archive/` (raw exports) via `robocopy /MIR` with the same source-too-small skip-/PURGE guard and zero-fill protection as vectordb, committing into its own git history so `openviking-data/` stays a pure mirror; archive-local `README.md`/`.snapshot-meta.json` are excluded via `/XF`
- With `--commit --push`: `git add openviking-data` only, commits `chore(openviking-data): 全量快照 N files (reason)`, pushes `origin main` with retries
- Logs every run to `%TEMP%/openviking-snapshot/<timestamp>.log`

## Known Issues
- Push-success detection gives false negatives: on 2026-11-09 the snapshot + local commit `c9a15051` reached GitHub (ancestor of `origin/main` `d1e022e9`) yet the script reported push failure (EXIT 1), flagging the task failed
- Wrapper stopped OpenViking for the vectordb copy and restarted only `if ($wasRunning)` via `Start-OpenVikingIfDown`, which did NOT start Ollama and did NOT verify the server returned — causing OV to stay down (e.g. 2026-11-09 until watchdog revived at 16:58). Hardened on 2026-11-09 (commit `0c12dc40`, branch `fix/ov-snapshot-restart`, ff-merged to `main`): stop now waits for port 1933 to free; start brings up Ollama (mirroring `start-server.bat`) and polls until 1933 is listening, logging a clear error if not, so the watchdog is only the backstop.

## Related Facts
- Raw exports in `memory-migration/out/` are 240 MB / 4359 files (cursor/workbuddy/opencode); were temporarily copied into `openviking-data/source-exports/` before commit dc290366 on 2026-11-09 (scanned for NUL-filled files, none found), violating the pure-mirror contract of openviking-data/; on 2026-11-09 they were moved (git rename, 4359 files, history preserved) to a separate top-level `memory-migration-archive/` with a dedicated archive snapshot script (third step in the wrapper); the refactor was committed locally and merged to `main` at `db2fd1bc`; its buggy pre-`/XF`-fix version was pushed to `origin/main` that day, but a `robocopy /MIR` purge bug was then found (it deleted archive-local `README.md` and `.snapshot-meta.json` because they are absent from the source); the fix (added `/XF` exclusion and made the before/after file-count set symmetric so `removed` is accurate) was committed as `1724a2f4`, merged to `main`, and pushed via background retry (GitHub connectivity flapping); the local `main` working tree already held the corrected script, so the scheduled 03:00 task uses the fixed version
- Git remote `tyvt/skills.git`; node v22.23.2 available

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "openviking_snapshot",
  "source_extraction_id": "2b3ce83884ab48449e027ddd1d2ba6b5",
  "version": 5,
  "memory_type": "entities"
}
-->