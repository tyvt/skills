---
audit_status: valid
last_checked: 2026-11-27T19:20:24+08:00
verdict_note: .openviking 下 watch-openviking.ps1、start-server-bat-hidden.vbs、OpenViking-Watchdog 命中，看门狗记忆属实。
---
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
- Windows 计划任务 OpenViking-Watchdog：每 1 分钟运行一次（早期版本约 5 分钟轮询），登录后持续生效、重启自愈
- 2026-11-11 起改为 wscript.exe 运行 watch-openviking-hidden.vbs 实现静默启动，不再经过可见 powershell/cmd（原先 powershell.exe -WindowStyle Hidden 仍会先建控制台导致闪屏）
- 已验证 Last Result 0，日志显示 dsh web up; OpenViking healthy (port 1933 listening). OK.，未误启

## 启动链路与自愈
- 无窗口链路（2026-11-24）：新增 C:\Users\Administrator\.openviking\start-server-bat-hidden.vbs 与 start-ovserver-hidden.vbs，用 WScript.Shell.Run(..., 0, False)（窗口样式 0）真正隐藏启动
- watch-openviking.ps1:94 由 cmd.exe -WindowStyle Minimized 改为 wscript.exe 调隐藏 VBS；start-server.bat:22 由 start "" /min cmd /c 改为 wscript.exe 调隐藏 VBS
- 原启动命令与日志重定向逐字保留（VBS 计算的命令行与原 bat 一致），原脚本备份为 .bak 可回滚；Ollama 启动仍为 Minimized，不在本次改动范围
- 重启耗时约 15s（8s 延迟 + Ollama 预热）；2026-11-24 演练 kill 后经隐藏链 12s 恢复 200:ok，进程数 1、1933 监听、server.log 正常写入
- 2026-11-09 16:58:02 快照任务把 OpenViking 留在停止状态后由看门狗自愈；同日快照包装脚本的 finally 块也用 Start-OpenVikingIfDown 尝试重启

<!-- MEMORY_FIELDS
{
  "category": "程序服务",
  "name": "openviking_watchdog",
  "source_extraction_id": "7d094108eeb24f9dad3f83ba17f356b5",
  "version": 3,
  "memory_type": "entities"
}
-->