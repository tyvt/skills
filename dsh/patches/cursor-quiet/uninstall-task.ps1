# Removes the scheduled task and its hidden launcher. The patch itself is
# removed separately with: node install.mjs --restore
$ErrorActionPreference = 'Stop'
$patchDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Unregister-ScheduledTask -TaskName 'dsh-cursor-quiet-reapply' -Confirm:$false -ErrorAction SilentlyContinue
Remove-Item (Join-Path $patchDir 'reapply-hidden.vbs') -Force -ErrorAction SilentlyContinue
Write-Output "Removed task 'dsh-cursor-quiet-reapply'. Plugin restore: node $(Join-Path $patchDir 'install.mjs') --restore"
