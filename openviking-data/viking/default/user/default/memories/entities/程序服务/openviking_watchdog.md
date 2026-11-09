# OpenViking看门狗
OpenViking 自启动看门狗机制，由 DeepSeek Harness 于 2026-11-09 创建，用于填补 dsh web 已启动但 OpenViking 未启动的缺口。

## 看门狗脚本
- 路径 C:\Users\Administrator\.openviking\watch-openviking.ps1
- 每轮检查「dsh web 在跑（端口 3080）但 OpenViking 没跑（端口 1933）」时，调用 start-server.bat 自动拉起 OpenViking
- 严格只在 dsh web 运行时管理 OpenViking；dsh web 未运行则不动

## 防重复启动
- 三重保护：端口监听检查 + 进程存在检查 + 2 分钟冷却状态文件

## 配套计划任务
- Windows 计划任务 OpenViking-Watchdog：每 5 分钟运行脚本一次，登录后持续生效、重启自愈
- 已验证 Last Result 0，日志显示 dsh web up; OpenViking healthy (port 1933 listening). OK.，未误启

<!-- MEMORY_FIELDS
{
  "category": "程序服务",
  "name": "openviking_watchdog",
  "source_extraction_id": "5434ba8abf5441a6bdc39a1571b8e168",
  "version": 1,
  "memory_type": "entities"
}
-->