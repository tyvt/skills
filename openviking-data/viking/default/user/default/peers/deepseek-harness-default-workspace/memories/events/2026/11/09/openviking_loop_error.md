# Summary
On 2026-11-09 17:59:35 the user reported an OpenViking console RuntimeError "Task attached to a different loop" from aiohttp ClientSession.close(); the error fired when the watchdog restarted OpenViking at 16:58 and 17:18 on 2026-11-09.
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

<!-- MEMORY_FIELDS
{
  "event_name": "openviking_loop_error",
  "goal": "Report console RuntimeError",
  "summary": "On 2026-11-09 17:59:35 the user reported an OpenViking console RuntimeError \"Task attached to a different loop\" from aiohttp ClientSession.close(); the error fired when the watchdog restarted OpenViking at 16:58 and 17:18 on 2026-11-09.",
  "ranges": "0-35",
  "source_extraction_id": "30ff07316c0c48b7b69f8a74b22e5fcd",
  "version": 1,
  "memory_type": "events"
}
-->