# OpenViking Async Client Cache Cross-Loop Close Error Fix
OpenViking 0.5.3 console raised RuntimeError "Task attached to a different loop"; root cause was async_client_cache.close_all creating a new event loop to close clients bound to the server's main loop, fixed by closing each client on its home loop and awaiting completion.

## Symptoms
- openviking console logged ERROR "Task exception was never retrieved" with RuntimeError("Task <Task pending...> attached to a different loop")
- Traceback from aiohttp client.py:1593 close() -> connector.py:1083 close(); internal aiohttp ClientSession bound to the server's main loop
- Triggered when the watchdog restarted OpenViking at 16:58 and 17:18 on 2026-11-09; error log timestamp 2026-11-09 17:59:35
- User pasted the same "Task exception was never retrieved" / "attached to a different loop" traceback (client.py:1593 -> connector.py:1083) again on 2026-11-10 03:29; the recurring error was later root-caused to a separate LiteLLM embedder aiohttp cross-loop close in litellm_embedders.py (see openviking_litellm_loop_fix), so the async_client_cache patch alone was insufficient

## Root Cause
- openviking/utils/async_client_cache.py: close_all() (line 132) calls asyncio.run(self._close_clients(...)) (line 146) when no running loop exists, creating a new loop to close clients
- Cached clients were created in the server's main loop (e.g. AsyncOpenAI / Volcengine async SDK internal aiohttp ClientSession bound to main loop)
- Trigger chain: OpenAIEmbedder.close() (synchronous) -> close_all_with_close() -> asyncio.run branch when no running loop -> closes main-loop-bound sessions on a fresh loop -> RuntimeError
- OpenViking 0.5.3 is a regular site-packages install (C:\Program Files\Python310\Lib\site-packages\openviking), no source checkout

## Fix
- Patched async_client_cache.py to track each client's home loop and close on that loop instead of a new loop
- pop_all() records the client's creation loop; close_all() rewritten as loop-aware closing
- Cross-thread case now awaits close completion on the target loop to avoid fire-and-forget "Unclosed client session" / "Task was destroyed but it is pending"; same-loop case avoids deadlock
- Verified: three real-world paths (cross-loop / cross-thread awaited / same-loop inline) all close cleanly with no RuntimeError and no unclosed-session warnings

## Deployment Status
- Patch written to the loaded site-packages copy; syntax check and module-level tests pass
- Running openviking-server.exe still holds old code in memory; fix takes effect only after service restart (watchdog can auto-recover)

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "openviking_async_loop_fix",
  "source_extraction_id": "10a5b6db04964ff69bb531bc5aeb19fe",
  "peer_id": "deepseek-harness-default-workspace",
  "version": 3,
  "memory_type": "entities"
}
-->