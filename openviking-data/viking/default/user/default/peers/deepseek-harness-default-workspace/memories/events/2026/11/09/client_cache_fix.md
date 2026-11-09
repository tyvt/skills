# Summary
On 2026-11-09 the assistant diagnosed that openviking/utils/async_client_cache.py close_all() created a new event loop to close loop-bound aiohttp clients (triggered by the synchronous OpenAIEmbedder.close() call), raising "attached to a different loop"; patched the file to track each client's home loop and close on it with awaited completion, verified clean across three paths. The running openviking-server.exe still holds old code and needs restart.
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: openviking控制台有报错。[11/09/26 17:59:35] ERROR    Task exception was never retrieved                                      base_events.py:1729
                             future: <Task finished name='Task-166773' coro=<ClientSession.close()
                             done, defined at C:\Program
                             Files\Python310\lib\site-packages\aiohttp\client.py:1586>
                             exception=RuntimeError("Task <Task pending name='Task-166773'
                             coro=<ClientSession.close() running at C:\\Program
                             Files\\Python310\\lib\\site-packages\\aiohttp\\client.py:1593>> got
                             Future <Task pending name='Task-166774' coro=<_wait_for_close() running
                             at C:\\Program
                             Files\\Python310\\lib\\site-packages\\aiohttp\\connector.py:122>>
                             attached to a different loop")>
                             ╭───────────────── Traceback (most recent call last) ─────────────────╮
                             │ C:\Program Files\Python310\lib\site-packages\aiohttp\client.py:1593 │
                             │ in close                                                            │
                             │                                                                     │
                             │   1590 │   │   """                                                  │
                             │   1591 │   │   if not self.closed:                                  │
                             │   1592 │   │   │   if self._connector is not None and self._connect │
                             │ ❱ 1593 │   │   │   │   await self._connector.close()                │
                             │   1594 │   │   │   self._connector = None                           │
                             │   1595 │                                                            │
                             │   1596 │   @property                                                │
                             │                                                                     │
                             │ C:\Program                                                          │
                             │ Files\Python310\lib\site-packages\aiohttp\connector.py:1083 in      │
                             │ close                                                               │
                             │                                                                     │
                             │   1080 │   │   │   │   │   │    - If ssl_shutdown_timeout>0: gracef │
                             │   1081 │   │   """                                                  │
                             │   1082 │   │   # Use abort_ssl param if explicitly set, otherwise u │
                             │        default                                                      │
                             │ ❱ 1083 │   │   await super().close(abort_ssl=abort_ssl or self._ssl │
                             │   1084 │   │   if self._resolver_owner:                             │
                             │   1085 │   │   │   await self._resolver.close()                     │
                             │   1086                                                              │
                             ╰─────────────────────────────────────────────────────────────────────╯
                             RuntimeError: Task <Task pending name='Task-166773'
                             coro=<ClientSession.close() running at C:\Program
                             Files\Python310\lib\site-packages\aiohttp\client.py:1593>> got Future
                             <Task pending name='Task-166774' coro=<_wait_for_close() running at
                             C:\Program Files\Python310\lib\site-packages\aiohttp\connector.py:122>>
                             attached to a different loop
...
**assistant [peer=deepseek-harness-default-workspace]**: Found a strong candidate: `openviking/utils/async_client_cache.py:146` calls `asyncio.run(self._close_clients(...))`, which creates a *new* event loop to close clients that were created in the server's main loop. Let me read it.
**assistant [peer=deepseek-harness-default-workspace]**: Now I see the mechanism. `close_all()` (line 132) calls `asyncio.run(self._close_clients(...))` (line 146) when there's no running loop — creating a *new* loop to close clients that were bound to the server's *main* loop. For aiohttp `ClientSession`, closing from a different loop raises "Task attached to a different loop". Let me find who creates these cached clients and who calls `close_all`.
**assistant [peer=deepseek-harness-default-workspace]**: The grep got truncated. Let me narrow to the actual usages of this cache class and its `close_all` / `close_current_loop_clients`.
**assistant [peer=deepseek-harness-default-workspace]**: The error is from closing loop-bound aiohttp sessions (inside async SDK clients like OpenAI/Volcengine) via a freshly created loop. Let me confirm the trigger timing and check the watchdog log and how `close_all` is invoked.
**assistant [peer=deepseek-harness-default-workspace]**: Confirmed the trigger. `OpenAIEmbedder.close()` (a **synchronous** method) calls `close_all_with_close()`, which hits the `asyncio.run(...)` branch when there's no running loop — closing `AsyncOpenAI` clients whose internal aiohttp `ClientSession` is bound to the server's **main** loop on a freshly created loop → "attached to a different loop". The watchdog restarting OpenViking (16:58, 17:18) is exactly when this fires.

Let me check whether OpenViking is an editable/source install (so I can patch the real source rather than only site-packages).
**assistant [peer=deepseek-harness-default-workspace]**: OpenViking 0.5.3 is a regular (non-editable) install in site-packages, with no source checkout — so the running service is what's there. The root cause is in `async_client_cache.close_all`: it closes loop-bound async clients (aiohttp sessions inside the async SDK clients) on a **freshly created loop** when no loop is running, which raises "attached to a different loop".

Let me patch `async_client_cache.py` to track each client's home loop and close it on that loop instead.
**assistant [peer=deepseek-harness-default-workspace]**: Now update `pop_all()` and rewrite `close_all()` with loop-aware closing.
**assistant [peer=deepseek-harness-default-workspace]**: Let me verify the edited file and syntax-check it.
**assistant [peer=deepseek-harness-default-workspace]**: The file looks correct. Let me syntax-check it and run a quick import test.
**assistant [peer=deepseek-harness-default-workspace]**: Syntax is clean. Now let me verify the fix actually prevents the cross-loop error with a focused test that reproduces the exact scenario (an aiohttp session cached in one loop, then `close_all` called from a context with no running loop).
**assistant [peer=deepseek-harness-default-workspace]**: Let me remove the dead helper function I left in, then run the test.
**assistant [peer=deepseek-harness-default-workspace]**: The fix works. Let me confirm the test is meaningful by reproducing the **original** buggy behavior inline (old `close_all` logic) to prove it would have raised.
**assistant [peer=deepseek-harness-default-workspace]**: The synthetic session wasn't actually used, so its connector wasn't loop-bound yet. Let me make the negative test realistic by creating an explicit connector on the loop (as happens after real requests), which forces the loop binding.
**assistant [peer=deepseek-harness-default-workspace]**: The positive case passed, but I spotted a real follow-on issue: in the cross-thread case my code fire-and-forgets the close on the other loop without waiting, which leaves sessions **unclosed** ("Unclosed client session" / "Task was destroyed but it is pending"). I need to *wait* for the close to complete on the other thread's loop, while avoiding a deadlock in the same-loop case. Let me refine.
**assistant [peer=deepseek-harness-default-workspace]**: Now let me re-run both tests to confirm: no `RuntimeError`, and no "Unclosed client session" / "never awaited" warnings.
**assistant [peer=deepseek-harness-default-workspace]**: No warnings now — the loop-bound connector session closes cleanly. Let me also verify the **same-loop (most likely real) path**: `close_all` called from *within* the running loop (current_loop is client_loop), which must not deadlock and must close cleanly.
**assistant [peer=deepseek-harness-default-workspace]**: All three real-world paths now close cleanly with no `RuntimeError` and no "unclosed session" warnings. The fix is verified at the module level.

One thing remains: the **currently running** `openviking-server.exe` process still has the old code loaded in memory — the fix only takes effect after a restart. Let me find and gracefully restart the service (the watchdog will also recover it if needed).

<!-- MEMORY_FIELDS
{
  "event_name": "client_cache_fix",
  "goal": "Fix cross-loop client close",
  "summary": "On 2026-11-09 the assistant diagnosed that openviking/utils/async_client_cache.py close_all() created a new event loop to close loop-bound aiohttp clients (triggered by the synchronous OpenAIEmbedder.close() call), raising \"attached to a different loop\"; patched the file to track each client's home loop and close on it with awaited completion, verified clean across three paths. The running openviking-server.exe still holds old code and needs restart.",
  "ranges": "0-35,55-105",
  "source_extraction_id": "30ff07316c0c48b7b69f8a74b22e5fcd",
  "version": 1,
  "memory_type": "events"
}
-->