# OpenViking Watchdog
`watch-openviking.ps1` is the watchdog script that keeps the OpenViking memory server running.

## Description
- Polls every 5 minutes; detects OpenViking down and auto-launches `start-server.bat`
- `start-server.bat` starts Ollama (embedding) then `openviking-server.exe`
- Full restart needs ~15s (8s delay + Ollama warmup)
- Runs as Windows scheduled task `OpenViking-Watchdog`

## Significance
- Provides self-recovery: on 2026-11-09 it revived OpenViking at 16:58:02 after the snapshot task left it down
- On 2026-11-09 the snapshot wrapper's `finally` block also attempted a restart via `Start-OpenVikingIfDown`

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "openviking_watchdog",
  "source_extraction_id": "6f5d10adb0bc48258ef3bd043a2e3b79",
  "version": 1,
  "memory_type": "entities"
}
-->