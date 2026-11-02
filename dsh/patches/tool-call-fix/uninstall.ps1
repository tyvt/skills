$ErrorActionPreference = 'Stop'
$flag = '--import=' + ([uri](Join-Path $PSScriptRoot 'bootstrap.mjs')).AbsoluteUri
$prior = [Environment]::GetEnvironmentVariable('NODE_OPTIONS', 'User')
if ($prior -and $prior.Contains($flag)) {
  $next = $prior.Replace($flag, '').Trim()
  [Environment]::SetEnvironmentVariable('NODE_OPTIONS', $(if ($next) { $next } else { $null }), 'User')
}
Write-Output 'Removed only the tool-call-fix preload flag. Patch files and backups were retained.'
