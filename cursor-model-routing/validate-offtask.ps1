#requires -Version 7
<#
  validate-offtask.ps1 — 离线验证跑题正则（无模型调用）
  语料 = results/*.json 已有记录；ground-truth 为人工确认的 off-task 样本。
  输出 OLD vs NEW 正则的 precision/recall 混淆矩阵。
  详见 REPORT.md §6b.2。当前：4 正类（全部 composer-2.5），NEW 100%/100%。
  注意：只覆盖模板坍缩+文件转储两类，未命中≠on-task。
#>
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$files = @('primary','gift','t3-repro','composer-repro','t7b','grok-repro','smoke')

$rows = @()
foreach ($f in $files) {
  $p = "results/$f.json"; if (-not (Test-Path $p)) { continue }
  $data = Get-Content $p -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($r in @($data)) { if ($r.content) { $rows += [pscustomobject]@{ src=$f; model=$r.model; task=$r.task; rep=$r.rep; content=[string]$r.content } } }
}

function Truth($r) {
  $c = $r.content
  if ($r.model -ne 'cursor/composer-2.5') { return $false }
  if ($r.src -eq 'primary'        -and $r.task -eq 'T3' -and $c -match 'instruction\.md|SkillUpgradeTracker') { return $true }
  if ($r.src -eq 't3-repro'       -and $c -match '【ID】|【Title】|前端面试题') { return $true }
  if ($r.src -eq 'composer-repro' -and $r.task -eq 'T5' -and $c -match 'Final file content|tasks/architecture') { return $true }
  if ($r.src -eq 't7b'            -and $c -match '第\s*1[89]\s*轮|第\s*20\s*轮') { return $true }
  return $false
}

$OLD = '第\s*\d+\s*轮|【ID】|【Title】|【Difficulty】|SkillUpgradeTracker|skill-upgrade-tracker|前端面试题|面试题|#{1,3}\s*助手\s*$|#{1,3}\s*用户\s*$'
$NEW = '第\s*\d+\s*轮|【ID】|【Title】|【Difficulty】|SkillUpgradeTracker|skill-upgrade-tracker|前端面试题|面试题|instruction\.md|Final file content|tasks/architecture|#{1,3}\s*助手\s*$|#{1,3}\s*用户\s*$'

function Eval($pat, $label) {
  $tp=0;$fp=0;$tn=0;$fn=0; $fps=@(); $fns=@()
  foreach ($r in $rows) {
    $t = Truth $r; $p = ([string]$r.content -match $pat)
    if ($t -and $p) { $tp++ } elseif (-not $t -and $p) { $fp++; $fps += "$($r.src)/$($r.model)/$($r.task)" }
    elseif (-not $t -and -not $p) { $tn++ } else { $fn++; $fns += "$($r.src)/$($r.model)/$($r.task)rep$($r.rep)" }
  }
  $prec = if ($tp+$fp) { [math]::Round(100.0*$tp/($tp+$fp),1) } else { 0 }
  $rec  = if ($tp+$fn) { [math]::Round(100.0*$tp/($tp+$fn),1) } else { 0 }
  Write-Output "[$label] n=$($rows.Count) positives=$(($rows | Where-Object { Truth $_ }).Count) TP=$tp FP=$fp TN=$tn FN=$fn  Precision=$prec% Recall=$rec%"
  if ($fps) { Write-Output "   FP: $($fps -join '; ')" }
  if ($fns) { Write-Output "   FN: $($fns -join '; ')" }
}
Eval $OLD 'OLD pattern'
Eval $NEW 'NEW pattern'
