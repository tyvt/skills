# bge-m3-ov
bge-m3-ov 是 OpenViking 本地使用的 embedding 模型，由本地 Ollama 运行。

## 描述
- 派生自 bge-m3，调大 num_batch=1024、num_ctx=8192
- 向量维度为 1024 维

## 关系
- 由本地 Ollama 运行，为 OpenViking 提供 embedding

<!-- MEMORY_FIELDS
{
  "category": "嵌入模型",
  "name": "bge_m3_ov",
  "source_extraction_id": "ca1b4cb0635f4bb9a375cf3998105289",
  "version": 1,
  "memory_type": "entities"
}
-->