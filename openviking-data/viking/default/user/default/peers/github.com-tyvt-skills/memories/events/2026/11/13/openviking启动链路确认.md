# Summary
用户于 2026-11-13 要求确认启动命令后，助手查清 OpenViking 启动链路：服务端为 C:\Program Files\Python310\Scripts\openviking-server.exe --config %USERPROFILE%\.openviking\ov.conf；现成脚本 C:\Users\Administrator\.openviking\start-server.bat（先保 Ollama、1933 未监听才单实例启动）；计划任务 OpenViking-Watchdog（wscript 隐藏窗口跑 watch-openviking.ps1，dsh web 在线且 OV 掉线时调用 start-server.bat）。确认系统已有兜底，skill 复用 start-server.bat 做会话内即时拉起。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...结论
方案骨架可接受，但不建议现在写 SKILL.md——先补两件事：

确认启动命令（关键路径，未知则方案不成立）；

补"启动前检查端口是否已监听"的幂等逻辑（解决并发冲突）。

这两点确定后，其余是措辞和字段细化，可以直接送 plan_review 并落文件。当前状态送 review 大概率会被打回"启动命令未定义"。
...
**assistant [peer=github.com-tyvt-skills]**: 启动链路已查清，关键依赖落实：

- **服务端**：`C:\Program Files\Python310\Scripts\openviking-server.exe --config %USERPROFILE%\.openviking\ov.conf`
- **现成启动脚本**：`C:\Users\Administrator\.openviking\start-server.bat`（先保 Ollama，再检查 1933 未监听才启动单实例，日志写 `server.log`）
- **已有看门狗**：计划任务 `OpenViking-Watchdog`（wscript 隐藏窗口跑 `watch-openviking.ps1`，dsh web 在线且 OV 掉线时调用 start-server.bat）

即系统已有兜底，但看门狗依赖“dsh web 在线”条件且最长延迟数分钟。skill 的定位是**会话内即时检测 + 立即拉起**，直接复用 start-server.bat，不另造启动逻辑。

修正后的方案（已合入你的 7 条意见）：

1. **触发**：MCP openviking 调用超时/连接拒绝，或直连 `/health` 失败；context 缺失只做一次被动 `/health` 探测，失败才触发。
2. **幂等**：启动前 `Get-NetTCPConnection -LocalPort 1933`，已监听则跳过启动直接轮询就绪。
3. **启动**：`Start-Process cmd '/c start-server.bat' -WindowStyle Hidden`，保留进程句柄；就绪轮询 2s×15 次（30s 上限），判定条件 `status == "ok"`。
4. **记录**：写 event memory，字段 `detected_at / recovered_at / duration_ms / trigger / version`。
5. **description** 写明“OpenViking 不可用/超时/连接拒绝时使用”。

按流程送审：

<!-- MEMORY_FIELDS
{
  "event_name": "openviking启动链路确认",
  "goal": "查清启动命令与看门狗",
  "summary": "用户于 2026-11-13 要求确认启动命令后，助手查清 OpenViking 启动链路：服务端为 C:\\Program Files\\Python310\\Scripts\\openviking-server.exe --config %USERPROFILE%\\.openviking\\ov.conf；现成脚本 C:\\Users\\Administrator\\.openviking\\start-server.bat（先保 Ollama、1933 未监听才单实例启动）；计划任务 OpenViking-Watchdog（wscript 隐藏窗口跑 watch-openviking.ps1，dsh web 在线且 OV 掉线时调用 start-server.bat）。确认系统已有兜底，skill 复用 start-server.bat 做会话内即时拉起。",
  "ranges": "20,31",
  "source_extraction_id": "68619ab83cde4408957970de4fca9709",
  "version": 1,
  "memory_type": "events"
}
-->