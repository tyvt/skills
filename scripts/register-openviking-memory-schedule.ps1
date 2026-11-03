param(
  [switch]$Unregister,
  [switch]$Weekly,
  [string]$At = "03:00",
  [switch]$Push
)

$ErrorActionPreference = "Stop"
$TaskName = "OpenViking-Memory-Snapshot"
$SkillsRoot = "D:\repository\skills"
$Node = (Get-Command node -ErrorAction Stop).Source
$Script = Join-Path $SkillsRoot "scripts\snapshot-openviking-memory.mjs"

if ($Unregister) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
  Write-Host "Removed scheduled task: $TaskName"
  exit 0
}

if (-not (Test-Path $Script)) { throw "Missing script: $Script" }

$commitArgs = "--commit --reason scheduled"
if ($Push) { $commitArgs += " --push" }

$action = New-ScheduledTaskAction `
  -Execute $Node `
  -Argument "`"$Script`" $commitArgs" `
  -WorkingDirectory $SkillsRoot

$parts = $At -split ":"
$hour = [int]$parts[0]
$minute = if ($parts.Length -gt 1) { [int]$parts[1] } else { 0 }

if ($Weekly) {
  $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At (Get-Date -Hour $hour -Minute $minute -Second 0)
} else {
  $trigger = New-ScheduledTaskTrigger -Daily -At (Get-Date -Hour $hour -Minute $minute -Second 0)
}

$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -DontStopOnIdleEnd `
  -ExecutionTimeLimit (New-TimeSpan -Hours 2)

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Sync OpenViking memories to skills/openviking-memory (see scripts/README-openviking-snapshot.md)" `
  -Force | Out-Null

$schedule = if ($Weekly) { "weekly Sunday $At" } else { "daily $At" }
$gitMode = if ($Push) { "commit + push" } else { "commit only (no push)" }

Write-Host "Registered: $TaskName"
Write-Host "  script: $Script"
Write-Host "  schedule: $schedule"
Write-Host "  git: $gitMode"