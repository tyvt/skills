param([switch]$KillFirst)
$ErrorActionPreference = 'Continue'
$health = 'http://127.0.0.1:1933/health'
function Test-Ov { try { (Invoke-WebRequest -Uri $health -TimeoutSec 5 -UseBasicParsing).Content } catch { $null } }

if ($KillFirst) {
  "=== 停服演练：kill openviking-server ==="
  taskkill /F /IM openviking-server.exe 2>$null | Out-Null
  Start-Sleep 2
  if (Test-Ov) { "ABORT: 服务仍在响应"; exit 1 }
  "OV 已停止，进入恢复流程"
}

# 幂等分支
$detectedAt = Get-Date
$listening = Get-NetTCPConnection -LocalPort 1933 -State Listen -ErrorAction SilentlyContinue
$healthy = Test-Ov
if ($listening -and $healthy) { "IDEMPOTENT分支: 端口监听且 health ok → 跳过启动 (PASS)"; exit 0 }
if ($listening -and -not $healthy) { "假死分支: 端口监听但 health 失败 → 受控重启"; taskkill /F /IM openviking-server.exe 2>$null | Out-Null; Start-Sleep 2 }
if (-not $listening) { "启动分支: 端口未监听" }

# 互斥
$lock = [System.Threading.Mutex]::new($false, 'Global\OpenVikingAutostart')
if (-not $lock.WaitOne(0)) { "LOCKED: 他方拉起中"; exit 1 }
try {
  "启动 start-server.bat ..."
  $p = Start-Process cmd -ArgumentList '/c', "$env:USERPROFILE\.openviking\start-server.bat" -WindowStyle Hidden -PassThru
  # 阶段一: 等端口 Listen (60s)
  $t0 = Get-Date; $ok1 = $false
  while (((Get-Date) - $t0).TotalSeconds -lt 60) {
    if (Get-NetTCPConnection -LocalPort 1933 -State Listen -ErrorAction SilentlyContinue) { $ok1 = $true; break }
    Start-Sleep 2
  }
  "阶段一 Listen: $ok1 (耗时 $([int]((Get-Date)-$t0).TotalSeconds)s)"
  # 阶段二: 等 health ok (60s)
  $t1 = Get-Date; $ok2 = $false; $ver = $null
  while (((Get-Date) - $t1).TotalSeconds -lt 60) {
    $h = Test-Ov
    if ($h -and $h -match '"status":"ok"') { $ok2 = $true; $ver = ($h | ConvertFrom-Json).version; break }
    Start-Sleep 2
  }
  $dur = [int]((Get-Date) - $detectedAt).TotalMilliseconds
  "阶段二 Health ok: $ok2, version=$ver, duration_ms=$dur"
  if ($ok1 -and $ok2) { "RESULT: PASS (trigger=$($args[0]))" } else { "RESULT: FAIL"; Get-Content "$env:USERPROFILE\.openviking\server.log" -Tail 20 }
} finally { $lock.ReleaseMutex(); $lock.Dispose() }
