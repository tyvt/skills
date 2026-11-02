$ErrorActionPreference = 'Stop'
$installed = & node (Join-Path $PSScriptRoot 'install.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Persistent patch installation failed.' }
$info = $installed | ConvertFrom-Json
$bootstrap = Join-Path $info.destination 'bootstrap.mjs'
$flag = '--import=' + ([uri]$bootstrap).AbsoluteUri
$prior = [Environment]::GetEnvironmentVariable('NODE_OPTIONS', 'User')
$backup = Join-Path $info.destination 'environment-backup.json'
if (-not (Test-Path -LiteralPath $backup)) {
  @{ NODE_OPTIONS = $prior; installedFlag = $flag; installedAt = [datetime]::UtcNow.ToString('o') } | ConvertTo-Json | Set-Content -LiteralPath $backup -Encoding UTF8
}
if (-not $prior -or -not $prior.Contains($flag)) {
  $next = (($prior, $flag | Where-Object { $_ }) -join ' ')
  [Environment]::SetEnvironmentVariable('NODE_OPTIONS', $next, 'User')
}
# Affect only this installer process now; existing DSH and other sessions keep running.
if (-not $env:NODE_OPTIONS -or -not $env:NODE_OPTIONS.Contains($flag)) {
  $env:NODE_OPTIONS = (($env:NODE_OPTIONS, $flag | Where-Object { $_ }) -join ' ')
}
Write-Output ('Persistent patch directory: ' + $info.destination)
Write-Output ('User NODE_OPTIONS registered: ' + $flag)
Write-Output 'Existing processes are unchanged; new terminals inherit the startup guard.'
