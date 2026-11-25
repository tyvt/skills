# Install the deploy-env dashboard watchdog scheduled task (idempotent).
# Intentionally ASCII-only (no UTF-8 BOM issues with Windows PowerShell 5.1).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File <this file>
$ErrorActionPreference = 'Stop'

$Root     = $PSScriptRoot
$TaskName = 'deploy-env-watchdog'
$Script   = Join-Path $Root 'watchdog.ps1'

if (-not (Test-Path $Script)) { throw "watchdog.ps1 not found: $Script" }

$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "removed old task $TaskName"
}

$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -NonInteractive -ExecutionPolicy Bypass -File `"$Script`""

# Two triggers: at logon, and a repeating check every 5 minutes.
$tLogon = New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME"
$tRepeat = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(5) `
    -RepetitionInterval (New-TimeSpan -Minutes 5)

$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType S4U -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries -ExecutionTimeLimit 0 -MultipleInstances IgnoreNew

Register-ScheduledTask -TaskName $TaskName -Action $action `
    -Trigger @($tLogon, $tRepeat) -Principal $principal -Settings $settings `
    -Description 'deploy-env dashboard watchdog: relaunch api.py if port dies' | Out-Null

Write-Host "registered task $TaskName (S4U/Highest, every 5 min)"
Start-ScheduledTask -TaskName $TaskName
Write-Host "started task $TaskName (State=$((Get-ScheduledTask -TaskName $TaskName).State))"
