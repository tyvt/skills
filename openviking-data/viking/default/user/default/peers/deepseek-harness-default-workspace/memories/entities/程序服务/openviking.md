# OpenViking
本地上下文补跑服务，运行于 1933 端口。
## 描述
- 提供补跑（backfill）相关能力，供 dshweb 调用。
- 版本 0.5.3。
## 启动方式
- 安装目录为 `C:\Users\Administrator\.openviking\`（即 `%USERPROFILE%\.openviking\`）。
- 通过 `start-server.bat` 拉起，约 20 秒后 health ok。
- 含 `watch-openviking.ps1` 看门狗监控进程存活。
## 关联关系
- 与 dshweb（the agent harness Web）协同；重启 dshweb 可能导致其 1933 端口暂时不可达。
- 2026-11-09 14:23 核查：1933 端口 LISTENING（pid 14796，13:57 启动），/health 返回 healthy:true，依赖 VLM 3425 与 Ollama 11434 均在线。

<!-- MEMORY_FIELDS
{
  "category": "程序服务",
  "name": "openviking",
  "source_extraction_id": "4d95a7db424b4cacb4344294a41d299d",
  "peer_id": "deepseek-harness-default-workspace",
  "version": 3,
  "memory_type": "entities"
}
-->