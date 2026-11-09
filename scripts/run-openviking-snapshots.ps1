param(
  [switch]$Push,
  [string]$Reason = "scheduled"
)

$ErrorActionPreference = "Stop"
$SkillsRoot = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { "D:\repository\skills" }
$Node = (Get-Command node -ErrorAction Stop).Source
$DataScript = Join-Path $SkillsRoot "scripts\snapshot-openviking-data.mjs"
$MemScript = Join-Path $SkillsRoot "scripts\snapshot-openviking-memory.mjs"
$OvServer = "C:\Program Files\Python310\Scripts\openviking-server.exe"
$OvConf = Join-Path $env:USERPROFILE ".openviking\ov.conf"
$LogDir = Join-Path $env:TEMP "openviking-snapshot"
$LogFile = Join-Path $LogDir "$(Get-Date -Format yyyyMMdd-HHmmss).log"

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Write-Log([string]$msg) {
  $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $msg"
  Add-Content -Path $LogFile -Value $line -Encoding UTF8
  Write-Host $line
}

function Stop-OpenVikingIfRunning {
  $p = Get-Process -Name "openviking-server" -ErrorAction SilentlyContinue
  if (-not $p) { return $false }
  Write-Log "Stopping openviking-server (pid $($p.Id)) for vectordb snapshot"
  Stop-Process -Id $p.Id -Force
  Start-Sleep -Seconds 5
  return $true
}

function Start-OpenVikingIfDown {
  $listening = netstat -ano 2>$null | Select-String ":1933 " | Select-String "LISTENING"
  if ($listening) { return }
  if (-not (Test-Path $OvServer)) {
    Write-Log "WARN: OV server exe missing, skip start"
    return
  }
  Write-Log "Starting openviking-server"
  Start-Process -FilePath $OvServer -ArgumentList "--config", $OvConf -WindowStyle Minimized
  Start-Sleep -Seconds 4
}

# Windows PowerShell 5.1 会把 native 命令 stderr 经 2>&1 变成 ErrorRecord，
# 与 $ErrorActionPreference="Stop" 一起会终止脚本且吞掉日志。
# 用 cmd.exe /c 在 cmd 层合并输出，并把错误偏好临时降为 Continue。
function Invoke-Snapshot([string]$script, [string[]]$scriptArgs) {
  $argLine = ($scriptArgs | ForEach-Object { $_ }) -join ' '
  $cmdLine = '"' + $Node + '" "' + $script + '" ' + $argLine + ' 2>&1'
  Write-Log "RUN: $cmdLine"
  $oldEap = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $lines = & cmd.exe /c $cmdLine
  $code = $LASTEXITCODE
  $ErrorActionPreference = $oldEap
  foreach ($l in $lines) { Write-Log ([string]$l) }
  Write-Log "EXIT: $code"
  return $code
}

$commitArgs = @("--commit", "--reason", $Reason)
if ($Push) { $commitArgs += "--push" }

$wasRunning = Stop-OpenVikingIfRunning
try {
  Write-Log "=== snapshot-openviking-data.mjs ==="
  $c1 = Invoke-Snapshot $DataScript $commitArgs
  if ($c1 -ne 0) { throw "snapshot-openviking-data failed exit $c1" }

  Write-Log "=== snapshot-openviking-memory.mjs ==="
  $c2 = Invoke-Snapshot $MemScript $commitArgs
  if ($c2 -ne 0) { throw "snapshot-openviking-memory failed exit $c2" }

  Write-Log "DONE"
} catch {
  Write-Log "FAILED: $($_.Exception.Message)"
  throw
} finally {
  if ($wasRunning) { Start-OpenVikingIfDown }
}
