#requires -Version 7
$s = Get-Content (Join-Path $PSScriptRoot 'results\score-full.json') -Raw | ConvertFrom-Json
$ids = @('T8','T9','T10','T11')
$m15 = @('M1-1','M1-2','M1-3','M1-4','M1-5','M1-6','M2-1','M2-2','M2-3','M2-4','M2-5','M3-1','M3-2','M3-3','M3-4','M3-5','M4-1','M4-2','M4-3','M4-4','M4-5','M5-1','M5-2','M5-3','M5-4')
$rep = foreach ($grp in ($s | Group-Object model)) {
  $mrows = @($grp.Group | Where-Object { $m15 -contains $_.task })
  $trows = @($grp.Group | Where-Object { $ids -contains $_.task })
  $mAvg = ($mrows | Measure-Object total -Average).Average
  $tAvg = ($trows | Measure-Object total -Average).Average
  [pscustomobject]@{
    model   = $grp.Name
    M_TOTAL = [math]::Round($mAvg, 3)
    T_TOTAL = [math]::Round($tAvg, 3)
    delta   = [math]::Round($tAvg - $mAvg, 3)
    T_ms    = [math]::Round(($trows | Measure-Object ms -Average).Average, 0)
  }
}
Write-Output '=== 按上一轮 M1-M5 排名（即「前15」顺序）与 T8-T11 对照 ==='
$rep | Sort-Object M_TOTAL -Descending | ForEach-Object {
  "{0,-32} M={1,-6} T={2,-6} dT={3,-7} Tms={4}" -f $_.model, $_.M_TOTAL, $_.T_TOTAL, $_.delta, $_.T_ms
}
Write-Output ''
Write-Output '=== 按 T8-T11 排名 ==='
$rep | Sort-Object T_TOTAL -Descending | ForEach-Object {
  "{0,-32} T={1,-6} M={2,-6} dT={3}" -f $_.model, $_.T_TOTAL, $_.M_TOTAL, $_.delta
}
