# dshweb
the agent harness Web 服务，承载后台补跑 job 与定时监控。
## 描述
- 提供 Web 界面与后台任务调度；原补跑 job `pwsh-e0a6a3f287c8463d` 随其重启被终止。
- 重启会连带杀掉运行中的补跑 job，并使 OpenViking 1933 暂时不可达。
## 关联任务
- 串行补跑 4 个项目：iHome、d-repository、i淮安公版、V3。

<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "程序服务",
  "name": "dshweb",
  "source_extraction_id": "8a44d852e87b4306b4a29ee019983c10",
  "version": 1,
  "memory_type": "entities"
}
-->