# litellm
模型调用桥接库，被 OpenViking 用于连接 Ollama 等后端。

## 关键规则
- OpenViking 的 LiteLLMDenseEmbedder 通过 litellm 桥接 Ollama
- Ollama 模型名必须带 ollama/ 前缀（如 ollama/bge-m3），否则拼接路由 404
- api_base 指向 Ollama 的 /v1 或 native 端点（如 http://localhost:11434，无 /v1）

## 配置映射
- 正确写法：provider: litellm, model: ollama/bge-m3, api_key: "no-key", api_base: http://localhost:11434
- provider: "ollama" 不在 litellm 触发条件内，会导致 404 错误

<!-- MEMORY_FIELDS
{
  "category": "模型桥接库",
  "name": "litellm",
  "source_extraction_id": "7e51d92889ed442aba7030e94557ef24",
  "version": 1,
  "memory_type": "entities"
}
-->