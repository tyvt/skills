param(
  [switch]$Push,
  [string]$Reason = "scheduled"
)

# Keep ASCII only: Windows PowerShell 5.1 reads BOM-less UTF-8 as ANSI.
$ErrorActionPreference = "Continue"
$SkillsRoot = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { "D:\repository\skills" }
$Node = (Get-Command node -ErrorAction Stop).Source
$DataScript = Join-Path $SkillsRoot "scripts\snapshot-openviking-data.mjs"
$MemScript = Join-Path $SkillsRoot "scripts\snapshot-openviking-memory.mjs"
$OvServer = "C:\Program Files\Python310\Scripts\openviking-server.exe"
$OvConf = Join-Path $env:USERPROFILE ".openviking\ov.conf"
$LogDir = Join-Path $env:TEMP "openviking-snapshot"
$LogFile = Join-Path $LogDir "$(Get-Date -Format yyyyMMdd-HHmmss).log"

New-Item -ItemType Directory -Force -Path $LogDir -ErrorAction Stop | Out-Null

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

# PS 5.1 turns native stderr piped via 2>&1 into ErrorRecord and aborts under Stop.
# Redirect all streams to a file (no pipeline), then log the lines and check exit code.
function Invoke-Snapshot([string]$scriptPath, [string]$tag, [string[]]$argv) {
  $tmp = Join-Path $LogDir "$tag.out"
  Write-Log "RUN: $scriptPath $($argv -join ' ')"
  & $Node $scriptPath @argv *> $tmp
  $code = $LASTEXITCODE
  if (Test-Path $tmp) {
    foreach ($l in (Get-Content $tmp -ErrorAction SilentlyContinue)) { Write-Log ([string]$l) }
    Remove-Item $tmp -Force -ErrorAction SilentlyContinue
  }
  Write-Log "EXIT: $code"
  return $code
}

$commitArgs = @("--commit", "--reason", $Reason)
if ($Push) { $commitArgs += "--push" }

$wasRunning = Stop-OpenVikingIfRunning
try {
  Write-Log "=== snapshot-openviking-data.mjs ==="
  $c1 = Invoke-Snapshot $DataScript "data" $commitArgs
  if ($c1 -ne 0) { throw "snapshot-openviking-data failed exit $c1" }

  Write-Log "=== snapshot-openviking-memory.mjs ==="
  $c2 = Invoke-Snapshot $MemScript "memory" $commitArgs
  if ($c2 -ne 0) { throw "snapshot-openviking-memory failed exit $c2" }

  Write-Log "DONE"
} catch {
  Write-Log "FAILED: $($_.Exception.Message)"
  throw
} finally {
  if ($wasRunning) { Start-OpenVikingIfDown }
}
