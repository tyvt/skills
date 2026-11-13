#requires -Version 7
<#
  run-matrix.ps1 — Cursor 模型分流测试运行器（直连 magpie 网关，不改编排器）
  用法:
    pwsh run-matrix.ps1 -DryRun                 # 只打印将执行的组合，不真调
    pwsh run-matrix.ps1 -Suite smoke            # 12 个 cursor 模型各 ping 1 次
    pwsh run-matrix.ps1 -Suite primary          # 主池 5 模型 × T1-T7
    pwsh run-matrix.ps1 -Suite gift             # 赠额 6 模型 × 2 题，累计硬上限
    pwsh run-matrix.ps1 -Suite primary -Only T1 # 只跑某题（调试）
  结果: <skilldir>\results\<suite>.json（幂等：按 model+task 覆盖写）
#>
param(
  [ValidateSet('smoke','primary','gift')]
  [string]$Suite = 'smoke',
  [switch]$DryRun,
  [string]$Only = '',
  [double]$GiftCapUSD = 8.0,
  [int]$TimeoutSec = 180
)
$ErrorActionPreference = 'Stop'
$gw = 'http://127.0.0.1:3425/v1'
$skillDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$resultsDir = Join-Path $skillDir 'results'
New-Item -ItemType Directory -Force -Path $resultsDir | Out-Null
$tasksFile = Join-Path $skillDir 'tasks.json'
$tasksDoc = Get-Content $tasksFile -Raw -Encoding UTF8 | ConvertFrom-Json

# --- 动态取 cursor 模型清单 ---
function Get-CursorModels {
  $r = Invoke-RestMethod -Uri "$gw/models" -TimeoutSec 15
  $r.data | Where-Object { $_.id -like 'cursor/*' } | ForEach-Object { $_.id }
}

# 主池 / 赠额分组（按用户口径）
$PRIMARY = @('cursor/composer-2.5','cursor/grok-4.7@256k','cursor/grok-4.7@500k','cursor/grok-4.6','cursor/grok-4.5')
$GIFT    = @('cursor/deepseek-v41-flash-1017','cursor/kimi-k3','cursor/kimi-k2.7-code','cursor/glm-5p3','cursor/glm-5.2','cursor/glm-5p3-flash')

# 跑题（模板坍缩 / 串题 runaway）检测正则。离线验证见 REPORT §6b.2：
# 84 样本 / 4 正类，Precision 100% / Recall 100%（含 composer T5rep3 的 "Final file content: tasks/architecture" 串题）。
# 注意：只覆盖已观测到的模板坍缩、文件转储与虚构交付物三类，不穷尽所有串题；未命中不等于 on-task。
# 2026-11-13 新增第 5 类「虚构交付物型」：凭空构造项目路径/blog_skill/风格名并输出无关成稿。
#   样本=code_edit_with_signal 首次冒烟（32.6s）；旧模式对该样本 Recall=0，补后 1正/11负=100%/100%。
#   「请保存为」「正在阅读项目内的风格指南」属高度特征化词，保守入选：宁可漏检也不误伤正常回答。
$script:OFFTASK_PATTERN = '第\s*\d+\s*轮|【ID】|【Title】|【Difficulty】|SkillUpgradeTracker|skill-upgrade-tracker|前端面试题|面试题|instruction\.md|Final file content|tasks/architecture|#{1,3}\s*助手\s*$|#{1,3}\s*用户\s*$|source/blogs|blog_skill|Mike Dane|Giraffa|请保存为|drafts/[\w-]+\.md|正在阅读项目内的风格指南'
function Test-OffTask {
  param([string]$Text)
  if ([string]::IsNullOrEmpty($Text)) { return $false }
  # 只扫头部 200 字，降低成本（坍缩特征几乎都在开头）
  $head = if ($Text.Length -gt 200) { $Text.Substring(0, 200) } else { $Text }
  return ($Text -match $script:OFFTASK_PATTERN)  # 全文匹配更稳；如需降本可改 $head
}

# 单价（USD / 1M tokens），直接从网关 /v1/models 的 pricing 读取（每 token 价 ×1e6）；
# 网关返回 pricing=null 的模型（如 composer-2.5、glm-5p3 系列、deepseek-v41-flash-1017）
# 属池额度/未标价，成本按 0 计并在报告注明「池额度前提」。
$script:PRICE_CACHE = @{}
function Get-Price {
  param([string]$Model)
  if ($script:PRICE_CACHE.ContainsKey($Model)) { return $script:PRICE_CACHE[$Model] }
  $p = @{ p = 0; c = 0; cr = 0; cw = 0; priced = $false }
  try {
    $r = Invoke-RestMethod -Uri "$gw/models" -TimeoutSec 15
    $m = $r.data | Where-Object { $_.id -eq $Model } | Select-Object -First 1
    if ($m -and $m.pricing) {
      $p.p = [double]$m.pricing.prompt * 1e6
      $p.c = [double]$m.pricing.completion * 1e6
      if ($m.pricing.input_cache_read) { $p.cr = [double]$m.pricing.input_cache_read * 1e6 }
      if ($m.pricing.input_cache_write) { $p.cw = [double]$m.pricing.input_cache_write * 1e6 }
      $p.priced = $true
    }
  } catch { }
  $script:PRICE_CACHE[$Model] = $p
  return $p
}

function Invoke-One {
  param([string]$Model, [string]$TaskId, [string]$Prompt, [int]$MaxTok = 1024)
  $bodyObj = @{ model = $Model; messages = @(@{ role = 'user'; content = $Prompt }); max_tokens = $MaxTok; temperature = 0.2 }
  $body = $bodyObj | ConvertTo-Json -Depth 8
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    $resp = Invoke-RestMethod -Uri "$gw/chat/completions" -Method Post -Body $body -ContentType 'application/json' -TimeoutSec $TimeoutSec
    $sw.Stop()
    $u = $resp.usage
    $pt = [int]$u.prompt_tokens; $ct = [int]$u.completion_tokens
    $cached = 0; $cw = 0
    if ($u.prompt_tokens_details) { $cached = [int]$u.prompt_tokens_details.cached_tokens; $cw = [int]$u.prompt_tokens_details.cache_write_tokens }
    $pr = Get-Price $Model
    $uncached = [math]::Max(0, $pt - $cached)
    $cost = ($uncached * $pr.p + $cached * $pr.cr + $cw * $pr.cw + $ct * $pr.c) / 1e6
    $hit = if ($pt -gt 0) { [math]::Round(100.0 * $cached / $pt, 1) } else { 0 }
    return [pscustomobject]@{
      model = $Model; task = $TaskId; ok = $true; error = '';
      priced = $pr.priced;
      elapsed_ms = $sw.ElapsedMilliseconds;
      prompt_tokens = $pt; completion_tokens = $ct; cached_tokens = $cached; cache_write_tokens = $cw;
      cache_hit_pct = $hit; est_cost_usd = [math]::Round($cost, 6);
      off_task = (Test-OffTask ([string]$resp.choices[0].message.content));
      quality = $null; content = $resp.choices[0].message.content
    }
  } catch {
    $sw.Stop()
    return [pscustomobject]@{
      model = $Model; task = $TaskId; ok = $false; error = $_.Exception.Message;
      priced = $false;
      elapsed_ms = $sw.ElapsedMilliseconds;
      prompt_tokens = 0; completion_tokens = 0; cached_tokens = 0; cache_write_tokens = 0;
      cache_hit_pct = 0; est_cost_usd = 0; quality = $null; content = ''
    }
  }
}

# --- 组装执行计划 ---
$taskMap = @{}; foreach ($t in $tasksDoc.tasks) { $taskMap[$t.id] = $t }
$plan = @()   # 每项 @{model; taskId; prompt}
$cursorModels = Get-CursorModels
Write-Output "动态 cursor 模型 ($($cursorModels.Count)): $($cursorModels -join ', ')"

switch ($Suite) {
  'smoke' {
    foreach ($m in $cursorModels) {
      $plan += [pscustomobject]@{ model = $m; task = 'PING'; prompt = 'Reply with exactly: OK'; max = 32 }
    }
  }
  'primary' {
    foreach ($m in $PRIMARY) {
      foreach ($tid in @('T1','T2','T3','T4','T5','T6','T7')) {
        if ($Only -and $Only -ne $tid) { continue }
        $plan += [pscustomobject]@{ model = $m; task = $tid; prompt = $taskMap[$tid].prompt; max = 1024 }
      }
    }
  }
  'gift' {
    $giftTasks = @('T1','T2')
    if ($Only) { $giftTasks = @($Only) }
    foreach ($m in $GIFT) {
      foreach ($tid in $giftTasks) {
        $plan += [pscustomobject]@{ model = $m; task = $tid; prompt = $taskMap[$tid].prompt; max = 1024 }
      }
    }
  }
}

Write-Output "Suite=$Suite 组合数=$($plan.Count)  赠额上限=`$$GiftCapUSD"
if ($DryRun) {
  $plan | ForEach-Object { Write-Output ("  {0,-32} {1}" -f $_.model, $_.task) }
  Write-Output "[DryRun] 未实际调用。"
  return
}

# --- 执行 ---
$results = @()
$spent = 0.0
foreach ($item in $plan) {
  if ($Suite -eq 'gift' -and $spent -ge $GiftCapUSD) {
    Write-Warning "赠额累计 ~`$$([math]::Round($spent,4)) >= 上限 `$$GiftCapUSD，终止。"
    break
  }
  Write-Output ("→ {0,-32} {1} ..." -f $item.model, $item.task)
  $r = Invoke-One -Model $item.model -TaskId $item.task -Prompt $item.prompt -MaxTok ([int]$item.max)
  $spent += [double]$r.est_cost_usd
  $tag = if ($r.ok) { "ok ${($r.elapsed_ms)}ms pt=$($r.prompt_tokens) ct=$($r.completion_tokens) hit=$($r.cache_hit_pct)% cost=$($r.est_cost_usd)$(if($r.off_task){' ⚠OFFTASK'})" } else { "FAIL $($r.error)" }
  Write-Output "   $tag"
  $results += $r
}

# 幂等合并：按 model+task 覆盖已存在项
$outFile = Join-Path $resultsDir "$Suite.json"
$existing = @()
if (Test-Path $outFile) {
  try { $existing = @(Get-Content $outFile -Raw -Encoding UTF8 | ConvertFrom-Json) } catch { $existing = @() }
}
$merged = @{}
foreach ($e in $existing) { $merged["$($e.model)|$($e.task)"] = $e }
foreach ($n in $results) { $merged["$($n.model)|$($n.task)"] = $n }
$merged.Values | Sort-Object model, task | ConvertTo-Json -Depth 8 | Set-Content -Path $outFile -Encoding UTF8
Write-Output "写出 $($merged.Count) 行 → $outFile"
if ($Suite -eq 'gift') { Write-Output "赠额累计估算花费 ~`$$([math]::Round($spent,4))" }
