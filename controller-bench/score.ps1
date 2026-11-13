#requires -Version 7
<#
  score.ps1 — 主控测试评分器（4 维 + 混淆矩阵）
  用法: pwsh score.ps1 -Suite screen|full
  输出: results\score-<suite>.json + 控制台表格
  口径（与 tasks-master.json _meta.scoring 一致）:
    tool_selection 0.35 / completeness 0.25 / routing 0.25 / efficiency 0.15
    format_error → 全维 0
#>
param(
  [ValidateSet('screen','full')]
  [string]$Suite = 'screen',
  [double]$WTool = 0.35, [double]$WComp = 0.25, [double]$WRoute = 0.25, [double]$WEff = 0.15
)
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$resDir = Join-Path $dir 'results'
$doc = Get-Content (Join-Path $dir 'tasks-master.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$taskMap = @{}; foreach ($t in $doc.tasks) { $taskMap[$t.id] = $t }
$rows = (Get-Content (Join-Path $resDir "bench-$Suite.json") -Raw -Encoding UTF8 | ConvertFrom-Json).rows

$out = @()
foreach ($r in $rows) {
  if ($r.error) { $out += [pscustomobject]@{ model=$r.model; task=$r.task; error=$r.error; total=0 }; continue }
  if ($r.task -eq 'ping') { continue }
  $t = $taskMap[$r.task]
  $parsed = $null
  try { $parsed = $r.raw | ConvertFrom-Json } catch { }
  if (-not $parsed -or -not $parsed.route) {
    $out += [pscustomobject]@{ model=$r.model; task=$r.task; format_error=$true; tool=0; comp=0; route=0; eff=0; total=0 }
    continue
  }
  $routeScore = if ($parsed.route -eq $t.route_expect) { 1.0 } else { 0.0 }
  $steps = @($parsed.steps) | Where-Object { $_ -and $_.tool }
  # tool_selection
  $toolScore = 0.0
  if ($t.route_expect -ne 'execute_tools') {
    $toolScore = if ($steps.Count -eq 0) { 1.0 } else { 0.0 }
  } elseif ($steps.Count -gt 0) {
    $sum = 0.0
    foreach ($s in $steps) {
      if ($t.optimal_tools -contains $s.tool) { $sum += 1.0 }
      elseif ($t.acceptable_tools -contains $s.tool) { $sum += 0.6 }
    }
    $toolScore = $sum / [Math]::Max(1, $steps.Count)
  }
  # completeness: required 关键词（支持 a|b 交替）在 analysis+intent+notes 中 recall
  $text = (@($parsed.analysis) + @($steps | ForEach-Object { $_.intent }) + @($parsed.notes)) -join ' '
  $hit = 0; $req = @($t.required).Count
  foreach ($pat in $t.required) { if ($text -match $pat) { $hit++ } }
  $compScore = if ($req -gt 0) { $hit / $req } else { 1.0 }
  # efficiency
  $effScore = if ($t.route_expect -ne 'execute_tools') { 1.0 }
    elseif ($steps.Count -ge 1) { [Math]::Min(1.0, $t.optimal_steps / $steps.Count) } else { 0.0 }
  $total = [math]::Round($WTool*$toolScore + $WComp*$compScore + $WRoute*$routeScore + $WEff*$effScore, 3)
  $out += [pscustomobject]@{ model=$r.model; task=$r.task; route_got=$parsed.route; route_expect=$t.route_expect
    n_steps=$steps.Count; tool=[math]::Round($toolScore,2); comp=[math]::Round($compScore,2)
    routeS=$routeScore; eff=[math]::Round($effScore,2); total=$total; ms=$r.ms }
}
$out | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $resDir "score-$Suite.json") -Encoding UTF8

# 汇总表
Write-Output '=== 按模型汇总（均值） ==='
$out | Where-Object { -not $_.error } | Group-Object model | ForEach-Object {
  $g = $_.Group
  [pscustomobject]@{
    model = $_.Name
    n = $g.Count
    fmt_err = @($g | Where-Object { $_.format_error }).Count
    tool = [math]::Round(($g | Measure-Object tool -Average).Average, 2)
    comp = [math]::Round(($g | Measure-Object comp -Average).Average, 2)
    route = [math]::Round(($g | Measure-Object routeS -Average).Average, 2)
    eff  = [math]::Round(($g | Measure-Object eff -Average).Average, 2)
    TOTAL = [math]::Round(($g | Measure-Object total -Average).Average, 3)
    avg_ms = [math]::Round(($g | Measure-Object ms -Average).Average, 0)
  }
} | Sort-Object TOTAL -Descending | Format-Table -AutoSize | Out-String -Width 160

Write-Output '=== 路由混淆矩阵（route 任务: 期望→实际） ==='
$out | Where-Object { $_.task -like 'M4-*' -or $_.task -in @('M3-3','M3-5') } |
  Group-Object route_expect, route_got | Sort-Object Name |
  ForEach-Object { "{0}  n={1}" -f $_.Name, $_.Count }
