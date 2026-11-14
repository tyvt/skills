# restart-web.ps1
用于重启 DSH web 服务的 PowerShell 脚本。
## 设计
- 通过 CIM／Start-Process 以分离方式重启，不依赖当前会话存活
- 流程：杀 3080 端口监听者 → 等端口释放 → 起新进程 → 等监听，日志落 web-restart.log
## 实测问题
- 2026-11-14 日志显示成功杀掉旧 web 进程（PID 2700），但之后没有 web up: True 或 spawned cmd wrapper 记录，新进程未拉起
- 每次都由用户手动重启 web 才恢复服务；助手判断其启动新进程步骤存在缺陷
## 处理
- 曾被提议另行修复，但与 token 优化相互独立，需另开计划

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "脚本",
  "name": "restart-web.ps1",
  "source_extraction_id": "c7e177820f0a4226b8c7ecffec51fb82",
  "version": 1,
  "memory_type": "entities"
}
-->