# OpenViking Embedder Client Closed Fix
OpenViking's local patch in litellm_embedders.py caused embedding failures by closing the shared httpx client after each call.

## Root Cause
- OpenViking's litellm_embedders.py closed shared `module_level_aclient` and deleted the attribute after every `embed_async`
- LiteLLM 1.91.1 client cache (TTL 1 hour) still returned the same closed httpx client handler on next request
- Ollama embedding call via httpx `client.send` then raised RuntimeError: Cannot send a request, as the client has been closed
- Circuit breaker OPEN and LoggingWorker task destroyed were downstream side effects
- `DISABLE_AIOHTTP_TRANSPORT=True` retained to avoid earlier aiohttp cross-event-loop issues

## Fix Details
- Removed the active close of shared httpx client after each embedding
- Added fallback: if client closed error occurs, flush LiteLLM client cache (`in_memory_llm_clients_cache.flush_cache()`) and retry once
- `get_async_httpx_client` now creates a new client instead of returning cached closed object

## Files and Ownership
- Affected file: litellm_embedders.py (OpenViking local patch)
- Environment: OpenViking with Ollama bge-m3-ov model for knowledge base embeddings

## Verification
- OpenViking restarted with original ov.conf, `/health` returned ok (version 0.5.3)
- Async embedding with ollama/bge-m3 returned 1024 dimensions in ~6.2 seconds


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "openviking_embedder_fix",
  "source_extraction_id": "228e4673d5394ffab4c96567b3741b67",
  "version": 1,
  "memory_type": "entities"
}
-->