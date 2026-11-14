# OpenViking embed retry

Live file (overwritten by `pip install -U openviking`):

`C:\Program Files\Python310\Lib\site-packages\openviking\models\embedder\litellm_embedders.py`

`litellm_embedders.py` in this directory is the patched copy. After an upgrade, copy it back over the live file and restart `openviking-server.exe`.

What it changes:

- Treat any exception whose text contains `client has been closed` as a stale httpx client (LiteLLM wraps it in `APIConnectionError`, so a `RuntimeError`-only check never retries).
- On that error, drop the LiteLLM client cache and retry the embedding once.
- On `Server disconnected` / `OllamaException`, retry the embedding once.

## 2026-11-14（OpenViking 0.5.5 起：本地补丁作废，改配置）

升级到 0.5.5 后 `litellm_embedders.py` 被覆盖，本目录旧补丁作废——0.5.5 已内置重试：
`models/embedder/retry_embedder.RetryEmbedder` + `utils/model_retry.py`，
`EmbeddingConfig.max_retries` 默认 3，`_create_embedder` 末尾 `return RetryEmbedder(embedder)` 已自动包住 dense 嵌入器。
`Server disconnected` 被 `_retry_limit` 判为 `TRANSIENT_NETWORK_ERROR`，会自动重试——**无需再拷补丁**。

真正问题是「抖动」= 并发把单槽 CPU 的 Ollama 排队打爆（bge-m3-ov 纯 CPU，无独显；40 并发实测 avg128s/max315s，
读超时后 `Server disconnected`）。修复靠限流：

- `~/.openviking/ov.conf` `embedding` 段加 `"max_concurrent": 2`（原默认 10）。改后重启 `openviking-server.exe`。
- 重启后 16 并发压测全部 OK、0 disconnect；单条 200–3000 字嵌入 6.7–16.5s。
- 升级/重装 OpenViking 后确认该键仍在；必要时同步调 `OLLAMA_NUM_PARALLEL`/`OLLAMA_MAX_LOADED_MODELS=1`（本轮未动）。
