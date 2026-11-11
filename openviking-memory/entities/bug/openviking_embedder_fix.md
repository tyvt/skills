# OpenViking Embedder 客户端关闭修复
OpenViking 在 litellm_embedders.py 的本地补丁曾因每次调用后关闭共享 httpx 客户端，导致嵌入失败。

## 根因
- OpenViking 的 litellm_embedders.py 在每次 embed_async 后主动关闭共享 module_level_aclient 并删除该属性
- LiteLLM 1.91.1 客户端缓存（TTL 1 小时）下次请求仍返回同一个已关闭的 httpx 客户端句柄
- 经 httpx client.send 调用 Ollama 嵌入时抛出 RuntimeError: Cannot send a request, as the client has been closed
- 熔断器 OPEN、LoggingWorker 任务被销毁为下游连锁影响
- 保留 DISABLE_AIOHTTP_TRANSPORT=True 以规避此前 aiohttp 跨事件循环问题

## 修复详情
- 移除了每次嵌入后主动关闭共享 httpx 客户端的逻辑
- 重试判定已放宽：异常链中只要出现 `client has been closed` 即清空 LiteLLM 客户端缓存（in_memory_llm_clients_cache.flush_cache()）并重试一次，不再限定 RuntimeError；`Server disconnected` 与 `OllamaException` 也仅重试一次（判定 stale=True、ollama=True、other=False）
- get_async_httpx_client 现改为创建新客户端，而非返回缓存的已关闭对象

## 文件与归属
- 受影响文件：litellm_embedders.py（OpenViking 本地补丁）
- 环境：OpenViking + Ollama bge-m3-ov 模型用于知识库嵌入

## 验证
- OpenViking 以原始 ov.conf 重启，/health 返回 ok（版本 0.5.3）
- 异步嵌入 ollama/bge-m3 返回 1024 维，耗时约 6.2 秒

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "openviking_embedder_fix",
  "source_extraction_id": "bc8b08c42cf742b9b15729a245549da2",
  "version": 2,
  "memory_type": "entities"
}
-->