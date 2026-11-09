# Summary
2026-11-09，用户请求做监听任务：当 dsh web 启动但 OpenViking 未启动时自动拉起。助手创建看门狗脚本 C:\Users\Administrator\.openviking\watch-openviking.ps1，逻辑为仅当 dsh web（端口3080）在跑而 OpenViking（端口1933）未跑时调用 start-server.bat 自动拉起，并带端口监听检查、进程存在检查、2分钟冷却状态文件三重防重复启动保护。
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 可以做一个监听任务吗？如果启动dsh web的时候没有启动openviking，自动启动。目前好像就没启动
...
**assistant [peer=deepseek-harness-default-workspace]**: `openviking-server.exe` exists and `ov.conf` confirms port 1933. Notably, there's already an `OpenVikingServer.lnk` in the Startup folder meant to launch it at logon — but it's not running now, which is exactly the gap a watchdog should close.

Here's my plan:
1. **Start OpenViking now** (it's down) via `start-server.bat`.
2. **Create a watchdog script** `watch-openviking.ps1` that, when `dsh web` (port 3080) is up but OpenViking (port 1933) is down, auto-launches `start-server.bat` — with double-launch guards (port + process check + cooldown).
3. **Register a Windows Scheduled Task** `OpenViking-Watchdog` that polls every 5 min at logon, so it self-heals across reboots and whenever `dsh web` is started.

Let me write the watchdog and kick off OpenViking in parallel.
...
**assistant [peer=deepseek-harness-default-workspace]**: 已完成。先说现状，再说我做了什么。

**现状（你判断对了）**
- `dsh web` 在跑（pid 2448，监听 127.0.0.1:3080）。
- OpenViking 之前**确实没启动**（1933 没监听）。我刚用 `start-server.bat` 拉起来了，现在 1933 已监听、`openviking-server.exe` 在跑。
- 顺带发现：启动项里其实有个 `OpenVikingServer.lnk`（登录时启动 OpenViking），但这次没生效——这正是需要一个看门狗来兜底的原因。

**做的监听任务（两部分）**
1. 看门狗脚本 [C:\Users\Administrator\.openviking\watch-openviking.ps1](C:\Users\Administrator\.openviking\watch-openviking.ps1)：每轮检查「`dsh web` 在跑（3080）但 OpenViking 没跑（1933）」就调用 `start-server.bat` 自动拉起；并带三重防重复启动保护（端口监听 + 进程存在 + 2 分钟冷却状态文件）。逻辑严格按你的要求：**只有 dsh web 在跑时才管 OpenViking**，dsh web 没跑就不动。
2. Windows 计划任务 `OpenViking-Watchdog`：每 5 分钟跑一次该脚本，登录后持续生效、重启也能自愈（不依赖某个 dsh 会话）。已手动触发验证，日志显示 `dsh web up; OpenViking healthy (port 1933 listening). OK.`，未误启。

效果：以后只要 `dsh web` 起来了而 OpenViking 没起，最多 5 分钟内自动补启，不用你手动管。

一个说明：OpenViking MCP（记忆库）在这个会话里是断开的，所以没法直接读它的 peer 记忆；不过注入的索引已确认 `start-server.bat` 就是官方启动路径，我用的就是它。

另外，新脚本落在 `C:\Users\Administrator\.openviking`（它自身是个 git 仓库，放的是 OpenViking 运行/配置数据，不是项目源码）。按规则需要跟你确认是否提交：
...
**assistant [peer=deepseek-harness-default-workspace]**: ...- **看门狗脚本**：`C:\Users\Administrator\.openviking\watch-openviking.ps1` —— 仅在 `dsh web` 在跑而 OpenViking 没跑时自动调用 `start-server....

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking看门狗脚本创建",
  "goal": "创建自动拉起看门狗脚本",
  "summary": "2026-11-09，用户请求做监听任务：当 dsh web 启动但 OpenViking 未启动时自动拉起。助手创建看门狗脚本 C:\\Users\\Administrator\\.openviking\\watch-openviking.ps1，逻辑为仅当 dsh web（端口3080）在跑而 OpenViking（端口1933）未跑时调用 start-server.bat 自动拉起，并带端口监听检查、进程存在检查、2分钟冷却状态文件三重防重复启动保护。",
  "ranges": "0,15,34,37",
  "source_extraction_id": "5434ba8abf5441a6bdc39a1571b8e168",
  "version": 1,
  "memory_type": "events"
}
-->