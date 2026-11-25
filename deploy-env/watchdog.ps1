# deploy-env dashboard watchdog: relaunch api.py dashboard when its listening port dies.
# Intentionally ASCII-only (no UTF-8 BOM issues with Windows PowerShell 5.1).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File <this file>
$ErrorActionPreference = 'Stop'

$Root     = $PSScriptRoot
$TaskName = 'deploy-env-dashboard'
$Ports    = @(18098, 18099)   # preferred + fallback port used by dashboard/api.py
$ApiMatch = '*dashboard\api.py*'

function Get-ApiProcesses {
    Get-CimInstance Win32_Process -Filter "name='pythonw.exe'" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -and $_.CommandLine -like $ApiMatch }
}

function Get-WatchedListeners {
    Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
        Where-Object { $Ports -contains $_.LocalPort }
}

function Invoke-Watchdog {
    $listeners = @(Get-WatchedListeners)
    $apiProcs  = @(Get-ApiProcesses)

    # Health criterion: a real api.py process is healthy; a 18098 listener is healthy;
    # a 18099 listener is healthy ONLY if its owner is api.py (foreign owner ignored).
    $healthy = $false
    if ($apiProcs.Count -gt 0) { $healthy = $true }
    if (-not $healthy) {
        $p98 = $listeners | Where-Object { $_.LocalPort -eq 18098 }
        $p99 = $listeners | Where-Object { $_.LocalPort -eq 18099 }
        if ($p98) { $healthy = $true }
        elseif ($p99) {
            $owner = Get-CimInstance Win32_Process -Filter "ProcessId=$($p99.OwningProcess)" -ErrorAction SilentlyContinue
            if ($owner -and $owner.CommandLine -and $owner.CommandLine -like $ApiMatch) { $healthy = $true }
        }
    }
    if ($healthy) {
        Write-Host "dashboard healthy (api.py process / own port listening), no action"
        return
    }

    $task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
    if (-not $task) {
        Write-Host "task $TaskName not found, cannot relaunch"
        return
    }

    # Stuck case: task says Running but no api.py and no port. Stop it first,
    # then wait for state AND process AND port to settle (bounded loop).
    if ($task.State -eq 'Running') {
        Write-Host "task $TaskName stuck in Running with no port, stopping first"
        Stop-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
        $deadline = (Get-Date).AddSeconds(20)
        while ((Get-Date) -lt $deadline) {
            $st = (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue).State
            $stillApi  = @(Get-ApiProcesses)
            $stillPort = @(Get-WatchedListeners)
            if ($st -in @('Ready','Stopped') -and $stillApi.Count -eq 0 -and $stillPort.Count -eq 0) { break }
            Start-Sleep -Milliseconds 500
        }
    }

    Start-ScheduledTask -TaskName $TaskName
    $newState = (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue).State
    Write-Host "relaunched $TaskName (State=$newState)"

    # Confirm the port actually comes back up (bounded; api.py may need >15s to bind).
    $upDeadline = (Get-Date).AddSeconds(30)
    while ((Get-Date) -lt $upDeadline) {
        if (@(Get-WatchedListeners).Count -gt 0) { Write-Host "dashboard port is listening again"; return }
        Start-Sleep -Milliseconds 500
    }
    Write-Host "WARNING: relaunched but no port observed within 30s"
}

# Single-instance guard: named mutex prevents overlapping triggers from double-starting.
$mutexName = 'deploy-env-dashboard-watchdog'
$mutex = New-Object System.Threading.Mutex($false, $mutexName)
try {
    if (-not $mutex.WaitOne(0, $false)) {
        Write-Host "another watchdog instance is running, exit"
        return
    }
    Invoke-Watchdog
    $mutex.ReleaseMutex()
}
finally {
    $mutex.Dispose()
}
