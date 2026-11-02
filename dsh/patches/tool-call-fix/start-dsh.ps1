$ErrorActionPreference = 'Stop'
$flag = '--import=' + ([uri](Join-Path $PSScriptRoot 'bootstrap.mjs')).AbsoluteUri
if (-not $env:NODE_OPTIONS -or -not $env:NODE_OPTIONS.Contains($flag)) {
  $env:NODE_OPTIONS = (($env:NODE_OPTIONS, $flag | Where-Object { $_ }) -join ' ')
}
$entry = (Get-Command dsh.cmd -ErrorAction Stop).Source
& $entry @args
exit $LASTEXITCODE
