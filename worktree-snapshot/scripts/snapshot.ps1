param(
  [Parameter(Mandatory = $true)][string]$Repo
)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $Repo).Path
$repos = @($root)
$subs = git -C $root submodule foreach --quiet --recursive 'echo $toplevel/$sm_path'
if ($subs) { $repos += @($subs) }
foreach ($r in $repos) {
  if (-not (Test-Path -LiteralPath $r)) { continue }
  Write-Output ("# " + $r)
  $raw = git -C $r worktree list --porcelain
  $path = $null; $head = $null; $branch = 'DETACHED'
  function Emit($p, $b, $h) {
    if (-not $p) { return }
    $n = @(git -C $p status --porcelain).Count
    $short = if ($h) { $h.Substring(0, [Math]::Min(12, $h.Length)) } else { '-' }
    Write-Output ("{0} | {1} | dirty={2} | {3}" -f $p, $b, $n, $short)
  }
  foreach ($line in $raw) {
    if ($line -like 'worktree *') {
      Emit $path $branch $head
      $path = $line.Substring(9)
      $head = $null
      $branch = 'DETACHED'
    } elseif ($line -like 'HEAD *') {
      $head = $line.Substring(5)
    } elseif ($line -like 'branch *') {
      $branch = $line.Substring(7) -replace '^refs/heads/', ''
    } elseif ($line -eq '') {
      Emit $path $branch $head
      $path = $null
    }
  }
  Emit $path $branch $head
}
