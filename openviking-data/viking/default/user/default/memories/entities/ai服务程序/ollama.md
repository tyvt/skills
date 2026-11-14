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

## 模型参数
- 派生模型 bge-m3-ov 的 Modelfile：FROM bge-m3、PARAMETER num_ctx 8192、PARAMETER num_batch 1024
- num_ctx 8192 是 bge-m3 的训练上限，加大无意义、减小会截断长记忆；num_batch 1024 已高于默认 512
- 环境变量 OLLAMA_KEEP_ALIVE=-1，bge-m3-ov 常驻约 645 MB（size_vram 645136383），闲置不被卸载
- 2026-11-14 确认本机无独显（仅 Intel UHD 770 核显 + 基础 Radeon R5 430），嵌入实际为 CPU/共享内存推理
- temperature、top_p、num_predict 对嵌入无作用，不要加入 Modelfile
- 仅当提交队列明显积压时可设 OLLAMA_NUM_PARALLEL=2 与 OLLAMA_FLASH_ATTENTION=1（并行度按上下文倍数占显存，2 为 8192 上下文上限，勿设 4）；本机无 nvidia-smi 看不清剩余显存，暂不建议改
- 2026-11-14 仍未调整 NUM_PARALLEL 与 FLASH_ATTENTION

## 性能与容量（2026-11-14）
- 单条嵌入（200–3000 字）约 6.7–16.5s，1500 字静息约 5.7s，维度 1024
- 日志显示 n_ctx_slot=4096、物理批 2048，输入超 2048/2409 token 报 too large to process
- 40 并发嵌入压测：avg 128.66s / max 315.26s、wait_ms 达 145891ms，随后读超时断连
- 并发是瓶颈：OpenViking 侧 max_concurrent 由 10 降到 2 后 16 并发 0 断连、最大 103.85s

<!-- MEMORY_FIELDS
{
  "category": "AI服务程序",
  "name": "ollama",
  "source_extraction_id": "6918e6043fcc4daa9872921ea3761dca",
  "version": 4,
  "memory_type": "entities"
}
-->