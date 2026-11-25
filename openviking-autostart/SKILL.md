---
name: openviking-autostart
description: OpenViking 服务不可用时检测并拉起本机服务。当 mcp_gateway(server=openviking) 调用超时/连接拒绝、http://127.0.0.1:1933/health 直连失败、或会话开头 openviking-context 缺失且被动 /health 探测失败时使用。处理端口未监听（启动）、端口监听但健康检查失败（假死重启）、就绪等待与恢复记录。
---

# openviking-autostart

会话内发现 OpenViking（127.0.0.1:1933）不可用时，立即按本流程恢复，不等待 OpenViking-Watchdog 计划任务（它依赖 dsh web 在线且延迟数分钟）。

## 1. 确认不可用（1 条命令）

```powershell
try { (Invoke-WebRequest -Uri http://127.0.0.1:1933/health -TimeoutSec 5 -UseBasicParsing).Content } catch { "OV_DOWN: $($_.Exception.Message)" }
```

- 返回含 `"status":"ok"` → 服务正常，结束。
- `OV_DOWN` → 记录 `detected_at = Get-Date`，进入第 2 步。

## 2. 互斥锁（防止与 Watchdog/其他会话双启动）

```powershell
$lock = [System.Threading.Mutex]::new($false, 'Global\OpenVikingAutostart')
if (-not $lock.WaitOne(0)) { "LOCKED: 他方正拉起，转入轮询 /health（第 4 步）后结束" }
```

获取失败时不启动，只轮询等待他人拉起。辅助锁文件（双保险）：`%USERPROFILE%\.openviking\.autostart.lock`，进入前创建，结束时删除。

## 3. 端口分支

```powershell
Get-NetTCPConnection -LocalPort 1933 -State Listen -ErrorAction SilentlyContinue
```

- **未监听** → 第 4 步启动。
- **已监听但 /health 连续 3 次失败（间隔 2s）→ 假死**：
  1. 留证：`Get-Content "$env:USERPROFILE\.openviking\server.log" -Tail 20`
  2. 受控重启：`taskkill /F /IM openviking-server.exe` → 第 4 步启动。
- **已监听且 /health 正常** → 不应到达（第 1 步已判）。

## 4. 启动与分阶段就绪等待

```powershell
$p = Start-Process cmd -ArgumentList '/c', "$env:USERPROFILE\.openviking\start-server.bat" -WindowStyle Hidden -PassThru
```

复用现有 `start-server.bat`（先保 Ollama 11434，再检查 1933 未监听才启动单实例；日志 `%USERPROFILE%\.openviking\server.log`）。`-PassThru` 句柄仅用于失败诊断，不主动 kill。

**阶段一**：等端口 Listen，每 2s 查一次，最多 60s（覆盖 Ollama 冷启动）。
**阶段二**：等 `/health` 返回 `status == "ok"`，每 2s 一次，最多 60s。

判定只用 `status == "ok"`；`auth_mode` 不是健康指标，忽略。

- 成功 → 第 5 步。
- 超时 → **报告人工处理，不重试**。报告必须附：Ollama 11434 状态、`$p.HasExited`/退出码、`server.log` 尾部 20 行。

## 5. 恢复记录

写 OpenViking event memory（try/catch 包裹）：

| 字段 | 含义 |
|---|---|
| `detected_at` | skill 发现不可用的时刻（ISO 8601） |
| `recovered_at` | `/health` 首次 ok 的时刻 |
| `duration_ms` | detected_at → recovered_at |
| `trigger` | `mcp_timeout` \| `health_fail` \| `context_probe` \| `zombie` |
| `version` | /health 返回的 version |

记录写入失败时降级追加到 `%USERPROFILE%\.openviking\.autostart-history.log`，并在结果中标注「记录未落库」。

## 边界

- 只操作健康检查与本机服务拉起，不改任何代码/配置。
- 假死重启前必先留存 server.log 尾部证据。
- 整个流程总耗时上限约 2 分钟，超时即上报，不做二次尝试。
