param([string]$Root = 'D:\repository\skills')
$ErrorActionPreference = 'Stop'
$skills = Get-ChildItem -LiteralPath $Root -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') }
$rows = foreach ($d in $skills) {
  $p = Join-Path $d.FullName 'SKILL.md'
  $text = Get-Content -LiteralPath $p -Raw
  $lines = (Get-Content -LiteralPath $p | Measure-Object -Line).Lines
  $desc = if ($text -match '(?m)^description:\s*(.+)$') { $Matches[1].Trim() } else { '' }
  [pscustomobject]@{
    name = $d.Name
    lines = $lines
    descChars = $desc.Length
    over200 = $lines -gt 200
    noDesc = [string]::IsNullOrWhiteSpace($desc)
  }
}
$rows | Sort-Object lines -Descending | Format-Table -AutoSize | Out-String -Width 120
$bad = @($rows | Where-Object { $_.over200 -or $_.noDesc })
if ($bad.Count) { exit 1 }
