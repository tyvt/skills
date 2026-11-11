# OpenViking embed retry

Live file (overwritten by `pip install -U openviking`):

`C:\Program Files\Python310\Lib\site-packages\openviking\models\embedder\litellm_embedders.py`

`litellm_embedders.py` in this directory is the patched copy. After an upgrade, copy it back over the live file and restart `openviking-server.exe`.

What it changes:

- Treat any exception whose text contains `client has been closed` as a stale httpx client (LiteLLM wraps it in `APIConnectionError`, so a `RuntimeError`-only check never retries).
- On that error, drop the LiteLLM client cache and retry the embedding once.
- On `Server disconnected` / `OllamaException`, retry the embedding once.
