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
  Add-Content -Path $LogFile -Value $line -Encoding utf8
  Write-Host $line
}

function Stop-OpenVikingIfRunning {
  $p = Get-Process -Name "openviking-server" -ErrorAction SilentlyContinue
  if (-not $p) { return $false }
  Write-Log "Stopping openviking-server (pid $($p.Id)) for vectordb snapshot"
  Stop-Process -Id $p.Id -Force
  Start-Sleep -Seconds 3
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

$commitArgs = @("--commit", "--reason", $Reason)
if ($Push) { $commitArgs += "--push" }

$wasRunning = Stop-OpenVikingIfRunning
try {
  Write-Log "=== snapshot-openviking-data.mjs ==="
  & $Node $DataScript @commitArgs 2>&1 | ForEach-Object { Write-Log $_; $_ }
  if ($LASTEXITCODE -ne 0) { throw "snapshot-openviking-data failed exit $LASTEXITCODE" }

  Write-Log "=== snapshot-openviking-memory.mjs ==="
  & $Node $MemScript @commitArgs 2>&1 | ForEach-Object { Write-Log $_; $_ }
  if ($LASTEXITCODE -ne 0) { throw "snapshot-openviking-memory failed exit $LASTEXITCODE" }

  Write-Log "DONE"
} finally {
  if ($wasRunning) { Start-OpenVikingIfDown }
}
