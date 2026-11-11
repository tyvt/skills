# OpenViking看门狗
OpenViking 自启动看门狗机制，由 DeepSeek Harness 于 2026-11-09 创建，用于填补 dsh web 已启动但 OpenViking 未启动的缺口。

## 看门狗脚本
- 主脚本路径 C:\Users\Administrator\.openviking\watch-openviking.ps1
- 静默启动包装脚本 C:\Users\Administrator\.openviking\watch-openviking-hidden.vbs（由 wscript.exe 调用，窗口隐藏）
- 每轮在 dsh web 在跑（端口 3080）时检查 OpenViking（端口 1933）与 Ollama（端口 11434）；均正常则写一行日志后退出，挂了才尝试拉起
- 严格只在 dsh web 运行时管理 OpenViking；dsh web 未运行则不动

## 防重复启动
- 三重保护：端口监听检查 + 进程存在检查 + 2 分钟冷却状态文件

## 配套计划任务
- Windows 计划任务 OpenViking-Watchdog：每 1 分钟运行一次，登录后持续生效、重启自愈
- 2026-11-11 起改为 wscript.exe 运行 watch-openviking-hidden.vbs 实现静默启动，不再经过可见 powershell/cmd（原先 powershell.exe -WindowStyle Hidden 仍会先建控制台导致闪屏）
- 已验证 Last Result 0，日志显示 dsh web up; OpenViking healthy (port 1933 listening). OK.，未误启

<!-- MEMORY_FIELDS
{
  "category": "程序服务",
  "name": "openviking_watchdog",
  "source_extraction_id": "bda0c3611e0d43a4950b936eb31b3def",
  "version": 2,
  "memory_type": "entities"
}
-->