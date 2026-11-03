# Ollama
本地大模型与嵌入向量服务程序，用于运行 LLM 和 embedding 模型。

## 基本信息
- 版本 v0.40.13，于 2026-11-02 安装完成
- 默认监听端口 11434，安装后自动启动服务（ollama.exe 及 ollama/ollama app 进程）
- 提供 OpenAI 兼容的 /v1/embeddings 端点

## 开机自启
- 安装程序默认注册了启动项（Ollama.lnk + start-llama.bat）
- 系统重启后 Ollama 会自动运行；OpenViking 的 start-server.bat 也会先确保 Ollama 在跑再启 server

## 相关关系
- 为 OpenViking 提供 bge-m3 与派生模型 bge-m3-ov（num_batch=1024、num_ctx=8192，解决默认 batch 2048 超限导致 Server disconnected）嵌入模型服务
- 通过 litellm 桥接被 OpenViking 的嵌入器调用

<!-- MEMORY_FIELDS
{
  "category": "AI服务程序",
  "name": "ollama",
  "source_extraction_id": "08b4e28d632d490994fac9f9165a72a8",
  "version": 2,
  "memory_type": "entities"
}
-->