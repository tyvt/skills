# Summary
2026-11-02，发现原 provider: ollama + model: bge-m3 导致 404 错误；修正为 provider: litellm、model: ollama/bge-m3、api_base: http://localhost:11434、api_key: no-key、dimension: 1024。
# 2026-11-02 (Monday) ChatLog:
**assistant**: 只剩 Embedding FAIL：`OpenAI API error: 404 page not found`。Ollama 现在 PASS（服务在跑），但 embedding 探活得到 404——说明 openviking 的 `ollama` embedder 走的路径和我测的 `/v1/embeddings` 不同，可能它把 api_base + 某路径拼成了不存在的 URL。

看 `ollama` embedder 实现，确认它请求的确切路径。
**assistant**: 关键：**没有独立的 ollama embedder 模块**——`provider: "ollama"` 实际走 **`LiteLLMDenseEmbedder`**（通过 litellm 桥接 Ollama）。而 litellm 需要 model 名写成 `ollama/bge-m3` 格式，且 api_base 要指向 Ollama 的 **`/v1`** 或 native 端点，走法与我配的不同，所以 404。

看 litellm embedder 如何构造请求（model 前缀、api_base 处理），以及 `provider: "ollama"` 在配置层怎么映射到 litellm。
**assistant**: 关键：litellm 的 ollama 模型名必须是 **`ollama/bge-m3`**（带 `ollama/` 前缀），而非 `bge-m3`。配置里 `provider: "ollama"` + `model: "bge-m3"` 会导致 litellm 拼出不存在的路由 → 404。

我需要确认 `provider: ollama` 在配置层如何映射到 litellm、以及 model 是否会自动加前缀。查工厂的 provider 分派逻辑。
**assistant**: 分派逻辑不在这些文件。搜全包找 `provider` 到 litellm 的实际映射（可能在 service 或 registry）。

course全包搜 "ollama" 与 provider 工厂注册。
**assistant**: `LiteLLMDenseEmbedder` 只在自身文件出现——工厂在别处（可能在 `openviking_cli` 或 service 层）。搜更广。
**assistant**: 关键在 `openviking_cli/utils/config/embedding_config.py:340`——`elif provider == "litellm"`。看 provider 分派全貌（L300-360），确认 `ollama` 到底映射到哪个 embedder。
**assistant**: 这是校验逻辑，不是构造。关键证据在 `doctor.py:393` 和 `setup_wizard.py`：**`provider == "litellm" and model.startswith("ollama/")`** 是官方识别 Ollama 的模式。也就是说正确写法是：

- `provider: litellm`
- `model: ollama/bge-m3`
- `api_base: http://127.0.0.1:11434`
- `dimension: 1024`

而我之前写的 `provider: ollama` + `model: bge-m3` 是错的（`provider: ollama` 不在 litellm 桥接的触发条件里，导致 404）。看 setup_wizard 里 Ollama 的标准配置块确认。
**assistant**: 确认了 Ollama 的标准写法：`provider: litellm`、`model: <litellm_model>`（形如 `ollama/bge-m3`）、`api_key: "no-key"`、`api_base: http://localhost:11434`（**无 /v1**）。

修正 ov.conf 的 embedding 块。注意 litellm provider 的 model 必须是 `ollama/bge-m3`。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking嵌入配置修正",
  "goal": "修正嵌入配置",
  "summary": "2026-11-02，发现原 provider: ollama + model: bge-m3 导致 404 错误；修正为 provider: litellm、model: ollama/bge-m3、api_base: http://localhost:11434、api_key: no-key、dimension: 1024。",
  "ranges": "17-40",
  "source_extraction_id": "7e51d92889ed442aba7030e94557ef24",
  "version": 1,
  "memory_type": "events"
}
-->