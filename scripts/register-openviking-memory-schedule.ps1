param(
  [switch]$Unregister,
  [switch]$Weekly,
  [string]$At = "03:00",
  [switch]$Push
)

$ErrorActionPreference = "Stop"
$TaskName = "OpenViking-Memory-Snapshot"
$SkillsRoot = "D:\repository\skills"
$Runner = Join-Path $SkillsRoot "scripts\run-openviking-snapshots.ps1"
function Resolve-Pwsh {
  $p = Get-Command pwsh -ErrorAction SilentlyContinue
  if ($p) { return $p.Source }
  return (Get-Command powershell.exe -ErrorAction Stop).Source
}
$Pwsh = Resolve-Pwsh

if ($Unregister) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
  Write-Host "Removed scheduled task: $TaskName"
  exit 0
}

if (-not (Test-Path $Runner)) { throw "Missing script: $Runner" }

$runnerArgs = @(
  "-NoProfile",
  "-ExecutionPolicy", "Bypass",
  "-File", "`"$Runner`"",
  "-Reason", "scheduled"
)
if ($Push) { $runnerArgs += "-Push" }

$action = New-ScheduledTaskAction `
  -Execute $Pwsh `
  -Argument ($runnerArgs -join " ") `
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
  -ExecutionTimeLimit (New-TimeSpan -Hours 3)

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Daily: snapshot-openviking-data + snapshot-openviking-memory 鈫?tyvt/skills (see scripts/README-openviking-snapshot.md)" `
  -Force | Out-Null

$schedule = if ($Weekly) { "weekly Sunday $At" } else { "daily $At" }
$gitMode = if ($Push) { "commit + push" } else { "commit only (no push)" }

Write-Host "Registered: $TaskName"
Write-Host "  runner: $Runner"
Write-Host "  jobs: snapshot-openviking-data.mjs, then snapshot-openviking-memory.mjs"
Write-Host "  schedule: $schedule"
Write-Host "  git: $gitMode"
