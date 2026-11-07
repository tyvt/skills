# Summary
2026-11-02，course 指示拉取 bge-m3 嵌入模型（约 1.2GB、1024 维），成功落入 Ollama，验证两种接口均返回 1024 维向量。
# 2026-11-02 (Monday) ChatLog:
**assistant**: Ollama 服务已跑（11434，v0.40.13），无模型。拉 `bge-m3`（1024维，中文强，约 1.2GB）。后台。

course拉取 bge-m3 模型。
**assistant**: 拉模型后台进行（约 1.2GB，需要几分钟）。等它完成期间，先确认 Ollama 的 OpenAI 兼容 embedding 端点——因为 openviking 用 `provider: ollama` 但日志里报的是 "OpenAI API error"，说明它可能走 `/v1/embeddings`（Ollama 也提供 OpenAI 兼容层）。

先确认 bge-m3 拉取进度和 Ollama 的 embedding 接口行为。
**assistant**: 还在下载中（模型列表还空）。继续等，给足时间。
**assistant**: bge-m3 拉取成功（1.2GB 完成，success）。exit 1 只是进度条 stderr。验证模型存在并测 embedding 接口。

<!-- MEMORY_FIELDS
{
  "event_name": "bge-m3模型拉取成功",
  "goal": "记录模型部署",
  "summary": "2026-11-02，course 指示拉取 bge-m3 嵌入模型（约 1.2GB、1024 维），成功落入 Ollama，验证两种接口均返回 1024 维向量。",
  "ranges": "5-13",
  "source_extraction_id": "7e51d92889ed442aba7030e94557ef24",
  "version": 1,
  "memory_type": "events"
}
-->