# openviking
Open-source memory service: session storage, vector index, memory extraction; used by DSH as long-term memory.

## Basic
- Version 0.5.3, port 1933, auth_mode=dev (no auth); /health returns {"status":"ok","healthy":true}
- Data dir ~/.openviking; memory path data/viking/default/user/default/memories/ (identity/soul/entities/events/preferences)
- Installed in C:\Program Files\Python310\Lib\site-packages\openviking; config ~/.openviking/ov.conf
- start-server.bat starts Ollama then server; auto-start shortcut; cold start recovers within 12s

## Config & Components
- Embed model bge-m3-ov (dim 1024, num_batch=1024, num_ctx=8192)
- Extract VLM: openai/auto/hy3 via magpie; VLM max_concurrent=8 (raised from 4 on 2026-11-09); session_commit max_concurrent default 8, VLM is bottleneck
- DSH plugin @openviking/dsh-memory-plugin writes mirror; allow_metadata_override:true
- Per-round injection logged in .recall_log.json (e.g., dsh-session-fe39d020 turn 2524 logged 10 URIs)
- 2026-11-05 import dsh-session-fe39d020: pending_tokens~7459, commit_count 42, memories_extracted 29

## CLI
- ov CLI needs ovcli.conf; add-memory auto-classifies; mv/rm keep index consistent; reindex --mode vectors_only --wait true rebuilds (async, may timeout but continues)

## 2026-11-09 Audit
- False alarm: /debug/health and /observer falsely false due to Embedding Errors=2 (in_progress=1) counted by NamedQueue._has_active_errors; reset_status never called
- Real endpoint memories=4428; Requeued 1008 frozen, not active failure; all queues empty
- Pre-fix throughput: VLM conc=4 + serial commit ~3min; 38/39 session_commit done (p50 163.6s)
- Fix: patched _has_active_errors to 900s window, restarted (pid 14796) → healthy; VLM 4→8 retest 8/8 success; stuck e5c4be47 auto-failed, total 5102
- 14:23 check: port 1933 LISTENING, healthy, total_memories 5116; VLM 3425 and Ollama 11434 LISTENING


<!-- MEMORY_FIELDS
{
  "category": "记忆服务程序",
  "name": "openviking",
  "source_extraction_id": "ee9bac6a81c444b4b0f9e699cdd3d61e",
  "version": 28,
  "memory_type": "entities"
}
-->