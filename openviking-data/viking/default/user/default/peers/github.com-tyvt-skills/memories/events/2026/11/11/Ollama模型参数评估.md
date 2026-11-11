# Summary
2026-11-11 评估 bge-m3-ov 参数优化空间，结论：num_ctx 8192 为 bge-m3 训练上限、num_batch 1024 已高于默认 512，无需改 Modelfile；temperature/top_p/num_predict 对嵌入无效。仅当提交队列明显积压时可设 OLLAMA_NUM_PARALLEL=2 与 OLLAMA_FLASH_ATTENTION=1，但本机无 nvidia-smi 看不清剩余显存，暂不建议改。2026-11-10 的失败是 Ollama 断连和 httpx 客户端被关掉，不是参数慢。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ollama的模型参数还有什么优化空间吗?
**assistant [peer=github.com-tyvt-skills]**: 先看本机 `bge-m3-ov` 的 Modelfile 和当前运行参数，再判断还有没有值得改的地方。
**assistant [peer=github.com-tyvt-skills]**: Modelfile 里已经没有值得再调的参数。`bge-m3-ov` 现在常驻显存，占用 645 MB，上下文 8192，处理器显示 100% GPU。环境变量只有 `OLLAMA_KEEP_ALIVE=-1`，模型不会因闲置被卸载。

```1:3:C:\Users\Administrator\.openviking\bge-m3-ov.Modelfile
FROM bge-m3
PARAMETER num_ctx 8192
PARAMETER num_batch 1024
```

`num_ctx 8192` 已经是 bge-m3 的训练上限。再加大没有意义，减小则会截断长记忆。645 MB 说明这块显存不是瓶颈。`num_batch 1024` 已经高于默认的 512。OpenViking 每次只送一条文本，再加到 2048 几乎不降低单次延迟，却更容易顶满显存。`temperature`、`top_p`、`num_predict` 对嵌入没有作用，不要加。

昨天的失败是 Ollama 断连和 httpx 客户端被关掉，不是参数慢。保持常驻已经是对的设置。

只有在提交队列明显排队时才值得动运行参数，而不是改 Modelfile：把 `OLLAMA_NUM_PARALLEL` 设为 2，并打开 `OLLAMA_FLASH_ATTENTION=1`。并行度按上下文倍数占显存，2 是这条 8192 上下文的上限，不要设到 4。本机没有 `nvidia-smi`，改之前看不清剩余显存，所以现在不建议改。

<!-- MEMORY_FIELDS
{
  "event_name": "Ollama模型参数评估",
  "goal": "评估模型参数优化",
  "summary": "2026-11-11 评估 bge-m3-ov 参数优化空间，结论：num_ctx 8192 为 bge-m3 训练上限、num_batch 1024 已高于默认 512，无需改 Modelfile；temperature/top_p/num_predict 对嵌入无效。仅当提交队列明显积压时可设 OLLAMA_NUM_PARALLEL=2 与 OLLAMA_FLASH_ATTENTION=1，但本机无 nvidia-smi 看不清剩余显存，暂不建议改。2026-11-10 的失败是 Ollama 断连和 httpx 客户端被关掉，不是参数慢。",
  "ranges": "33-43",
  "source_extraction_id": "bc8b08c42cf742b9b15729a245549da2",
  "version": 1,
  "memory_type": "events"
}
-->