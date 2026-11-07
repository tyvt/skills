# OpenViking
本地上下文补跑服务，运行于 1933 端口。
## 描述
- 提供补跑（backfill）相关能力，供 dshweb 调用。
- 版本 0.5.3。
## 启动方式
- 通过 `%USERPROFILE%\.openviking\start-server.bat` 拉起，约 20 秒后 health ok。
## 关联关系
- 与 dshweb（the agent harness Web）协同；重启 dshweb 可能导致其 1933 端口暂时不可达。

<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "程序服务",
  "name": "openviking",
  "source_extraction_id": "8a44d852e87b4306b4a29ee019983c10",
  "version": 1,
  "memory_type": "entities"
}
-->