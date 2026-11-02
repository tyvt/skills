# Registers the scheduled task that keeps the cursor quiet-retry applied.
#
#   pwsh -File install-task.ps1 [-IntervalMinutes 5]
#
# The task runs reapply.mjs hidden (through wscript, so no console flashes)
# every few minutes and at logon. Re-running this script replaces the task.
param([int]$IntervalMinutes = 5)

$ErrorActionPreference = 'Stop'
$patchDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = (Get-Command node).Source
if (-not $node) { throw 'node.exe not found on PATH' }
$reapply = Join-Path $patchDir 'reapply.mjs'
if (-not (Test-Path $reapply)) { throw "reapply.mjs not found at $reapply" }

$vbs = Join-Path $patchDir 'reapply-hidden.vbs'
$lines = @(
  'Set shell = CreateObject("WScript.Shell")',
  ('shell.Run """{0}"" ""{1}""", 0, False' -f $node, $reapply)
)
Set-Content -Path $vbs -Value $lines -Encoding ASCII

$taskName = 'dsh-cursor-quiet-reapply'
$action = New-ScheduledTaskAction -Execute 'wscript.exe' -Argument ('"{0}"' -f $vbs)
$atLogon = New-ScheduledTaskTrigger -AtLogOn
$repeat = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
  -RepetitionInterval (New-TimeSpan -Minutes $IntervalMinutes) `
  -RepetitionDuration (New-TimeSpan -Days 3650)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
  -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 5) -MultipleInstances IgnoreNew
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited

Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger @($atLogon, $repeat) `
  -Settings $settings -Principal $principal -Description 'Re-applies the Cursor quiet-retry patch after magpie plugin updates' | Out-Null

& $node $reapply
$info = Get-ScheduledTask -TaskName $taskName | Select-Object TaskName, State
$info | Format-Table -AutoSize
Write-Output "Task '$taskName' registered: every $IntervalMinutes min and at logon (node: $node)"
