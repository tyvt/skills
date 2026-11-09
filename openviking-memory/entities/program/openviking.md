# OpenViking Memory Server
OpenViking is the agent's local memory and vector database server backed by Ollama embeddings.

## Description
- Main process is `openviking-server.exe` launched with `--config ov.conf` via `start-server.bat`
- Uses Ollama for embeddings on port 11434; the server listens on port 1933
- Health endpoint `/health` returns `200 healthy` when running
- Holds memory `.md` files under `data/viking/default/user/default/` and vectors under `data/vectordb/`, plus `backend_meta.json`

## Relations
- Monitored and auto-restarted by the `watch-openviking.ps1` watchdog
- Backed up daily by `run-openviking-snapshots.ps1` into `skills/openviking-data/`

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "openviking",
  "source_extraction_id": "6f5d10adb0bc48258ef3bd043a2e3b79",
  "version": 1,
  "memory_type": "entities"
}
-->