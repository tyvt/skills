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

function Wait-PortListening([int]$port, [int]$timeoutSec) {
  $deadline = (Get-Date).AddSeconds($timeoutSec)
  while ((Get-Date) -lt $deadline) {
    $up = netstat -ano 2>$null | Select-String (":{0} " -f $port) | Select-String "LISTENING"
    if ($up) { return $true }
    Start-Sleep -Seconds 1
  }
  return $false
}

function Stop-OpenVikingIfRunning {
  $p = Get-Process -Name "openviking-server" -ErrorAction SilentlyContinue
  if (-not $p) { return $false }
  Write-Log "Stopping openviking-server (pid $($p.Id)) for vectordb snapshot"
  Stop-Process -Id $p.Id -Force
  # Wait for the port to free so the LevelDB lock releases cleanly before the copy.
  if (Wait-PortListening 1933 10) {
    Write-Log "WARN: port 1933 still listening after stop; proceeding anyway"
  } else {
    Write-Log "openviking-server stopped, port 1933 free"
  }
  return $true
}

function Ensure-Ollama {
  $up = netstat -ano 2>$null | Select-String ":11434 " | Select-String "LISTENING"
  if ($up) { return }
  $ollama = Join-Path $env:LOCALAPPDATA "Programs\Ollama\ollama.exe"
  if (-not (Test-Path $ollama)) { Write-Log "WARN: ollama.exe missing, cannot ensure embeddings"; return }
  Write-Log "Starting Ollama"
  Start-Process -FilePath $ollama -ArgumentList "serve" -WindowStyle Minimized
  Start-Sleep -Seconds 6
}

function Start-OpenVikingIfDown {
  if (Wait-PortListening 1933 3) {
    Write-Log "openviking-server already listening on 1933"
    return
  }
  Ensure-Ollama
  if (-not (Test-Path $OvServer)) {
    Write-Log "WARN: OV server exe missing, skip start"
    return
  }
  Write-Log "Starting openviking-server"
  Start-Process -FilePath $OvServer -ArgumentList "--config", $OvConf -WindowStyle Minimized
  if (Wait-PortListening 1933 25) {
    Write-Log "openviking-server is back up on 1933"
  } else {
    Write-Log "ERROR: openviking-server did NOT come back up on 1933 (watchdog should recover)"
  }
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
