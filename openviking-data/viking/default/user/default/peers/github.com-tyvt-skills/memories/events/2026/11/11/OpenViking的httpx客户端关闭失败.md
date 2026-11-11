# Summary
2026-11-10 11:46 与 11:49，OpenViking 的 2 次 session_commit 任务因 litellm.APIConnectionError（client has been closed）失败；embedder 的 stale client 判定仅认 RuntimeError，重试未触发。2026-11-10 11:49 后无新失败。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 分析一下openViking最近的失败日志，给出解决方案
**assistant [peer=github.com-tyvt-skills]**: 先查 OpenViking 记忆和失败日志位置，再按最近失败记录归纳原因和改法。
**assistant [peer=github.com-tyvt-skills]**: 近三天 OpenViking 本身现在是健康的（`127.0.0.1:1933` `/health` 正常，版本 0.5.3）。失败集中在会话提交时的向量化，不是当前进程已经挂掉。

## 日志里实际失败了什么

任务目录 `~\.openviking\data\viking\default\_system\tasks\default` 近 3 天 112 条任务：105 成功，7 失败。全部是 `session_commit`，错误都是 `Failed to generate embedding`。

| 时间 | 次数 | 直接原因 |
|---|---|---|
| 11-09 13:57–20:34 | 5 | `OllamaException - Server disconnected`（Ollama `11434` 把连接掐了） |
| 11-10 11:46、11:49 | 2 | `Cannot send a request, as the client has been closed` |

看门狗 `~\.openviking\watchdog.log` 同期还记录了 8 次「dsh web 在、1933 不在」，由计划任务拉起：11-09 四次、11-10 三次、11-11 03:03 一次。今天 08:08 之后每 5 分钟都是 healthy。11-10 11:49 之后没有新的 failed 任务。

## 原因

1. **Ollama 断连（11-09）**
   和看门狗在 19:18、19:23 发现 OpenViking 挂掉是同一段时间。`start-server.bat` 只在 11434 没人监听时才拉 Ollama；Ollama 进程还在、但已经不接新连接时，不会被重启。提交正好打到这个窗口，就变成 `Server disconnected`。

2. **httpx 客户端被关掉（11-10）**
   补丁已经在 `C:\Program Files\Python310\Lib\site-packages\openviking\models\embedder\litellm_embedders.py`：`embed_async` 会在判定为 stale client 时清 LiteLLM 缓存并重试一次。
   判定函数 `_is_stale_client_error` 只认异常链里的 `RuntimeError`。实际抛出的是 `litellm.APIConnectionError`，文案里有 “client has been closed”，但类型对不上，重试不会发生。11-10 11:43 看门狗刚拉起服务，11:46 和 11:49 仍按这个错误失败，说明不是「旧进程没加载补丁」。

3. **夜间 03:03 掉线**
   11-10、11-11 都在 03:03 被看门狗发现 1933 没了。这和每天 03:00 的记忆快照时间重合。快照本身不一定是凶手，但进程没有被服务管理器托住，一死要等最多 5 分钟的计划任务。死掉期间的 commit 会丢或失败。

## 怎么改

1. **放宽 stale client 判定（针对仍在发生的那类）**
   在 `_is_stale_client_error` 里，除了 `RuntimeError`，只要异常自身或 `__cause__` / `__context__` 的字符串包含 `client has been closed` 就返回真，然后再 `_drop_cached_async_client()` 并重试一次。改的是已安装的 site-packages，升级 OpenViking 会被覆盖，应同时留一份本地补丁。

2. **Ollama 不健康就重启，不要只看端口**
   在 `start-server.bat` 或 `watch-openviking.ps1` 里对 `http://127.0.0.1:11434/api/tags` 做一次短超时探测。端口在听但请求失败时，先停掉现有 `ollama.exe` 再 `ollama serve`。OpenViking 侧对 `Server disconnected` 同样只重试一次，避免和 commit 队列叠在一起打满。

3. **进程不要只靠 5 分钟巡检**
   把 `openviking-server.exe` 和 Ollama 做成登录后常驻（计划任务「不管用户是否登录都运行」或 NSSM），崩溃立即拉起。03:00 快照开始前确认 1933、11434 都活着，快照不要杀 OpenViking 进程。

当前不必停服清队列：没有 pending/running 卡死，也没有新的 lock I/O 500。先前那 7 条失败的 session 不会自动补嵌入，需要的话对那几个会话重新 commit 一次即可。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking的httpx客户端关闭失败",
  "goal": "记录httpx客户端关闭失败",
  "summary": "2026-11-10 11:46 与 11:49，OpenViking 的 2 次 session_commit 任务因 litellm.APIConnectionError（client has been closed）失败；embedder 的 stale client 判定仅认 RuntimeError，重试未触发。2026-11-10 11:49 后无新失败。",
  "ranges": "0-41",
  "source_extraction_id": "10236d7cfe80456d959ebc02386f2d15",
  "version": 1,
  "memory_type": "events"
}
-->