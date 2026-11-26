---
audit_status: valid
last_checked: 2026-11-26T20:17:54+08:00
verdict_note: 实机 ollama list 命中 bge-m3-latest(1.2GB)，记忆所述嵌入模型属实。
---
# bge-m3
Ollama 托管的嵌入模型，用于中文语义向量化。

## 基本信息
- 向量维度 1024，模型大小约 1.2GB
- 中文嵌入效果强，于 2026-11-02 拉取成功
- 在 litellm 中模型名需写作 ollama/bge-m3

## 用途
- 作为 OpenViking 的 embedding 模型（dimension: 1024）
- 被 LiteLLMDenseEmbedder 通过 Ollama 调用

<!-- MEMORY_FIELDS
{
  "category": "嵌入模型",
  "name": "bge_m3",
  "source_extraction_id": "7e51d92889ed442aba7030e94557ef24",
  "version": 1,
  "memory_type": "entities"
}
-->