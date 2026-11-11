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
- 环境变量 OLLAMA_KEEP_ALIVE=-1，bge-m3-ov 常驻显存约 645 MB、处理器 100% GPU，闲置不被卸载
- temperature、top_p、num_predict 对嵌入无作用，不要加入 Modelfile
- 仅当提交队列明显积压时可设 OLLAMA_NUM_PARALLEL=2 与 OLLAMA_FLASH_ATTENTION=1（并行度按上下文倍数占显存，2 为 8192 上下文上限，勿设 4）；本机无 nvidia-smi 看不清剩余显存，暂不建议改

<!-- MEMORY_FIELDS
{
  "category": "AI服务程序",
  "name": "ollama",
  "source_extraction_id": "bc8b08c42cf742b9b15729a245549da2",
  "version": 3,
  "memory_type": "entities"
}
-->