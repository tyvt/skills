# OpenViking Memory Server
OpenViking 是 agent 本地部署的记忆与向量数据库服务，嵌入依赖 Ollama。

## 基本构成
- 主进程 openviking-server.exe，由 start-server.bat 以 --config ov.conf 启动
- 嵌入走 Ollama（端口 11434）；server 监听端口 1933，/health 返回 200 healthy
- 记忆 md 文件位于 data/viking/default/user/default/，向量在 data/vectordb/，另有 backend_meta.json

## 运维关系
- 由 watch-openviking.ps1 看门狗监控并自动重启
- 由 run-openviking-snapshots.ps1 每日备份到 skills/openviking-data/，原始数据在 data/vectordb/

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "openviking",
  "source_extraction_id": "6918e6043fcc4daa9872921ea3761dca",
  "version": 2,
  "memory_type": "entities"
}
-->