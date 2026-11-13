#requires -Version 7
<#
  run-bench.ps1 — 主控模型批量测试 runner（直连 magpie 网关）
  用法:
    pwsh run-bench.ps1 -Suite ping    # 18 候选各 1 次 ping，锁定可用 ID
    pwsh run-bench.ps1 -Suite screen  # 18 候选 × 6 题快筛
    pwsh run-bench.ps1 -Suite full    # 快筛通过者 × 25 题全量
    加 -DryRun 只打印组合数。幂等：model+task 已有结果则跳过。
  结果: results\bench-<suite>.json；成本硬上限 $10（含 ping/screen，超限即停落盘）。
#>
param(
  [ValidateSet('ping','screen','full')]
  [string]$Suite = 'ping',
  [switch]$DryRun,
  [int]$TimeoutSec = 180,
  [double]$CapUSD = 10.0,
  [string]$Gw = 'http://127.0.0.1:3425/v1'
)
$ErrorActionPreference = 'Stop'
$gw = $Gw
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$resDir = Join-Path $dir 'results'
New-Item -ItemType Directory -Force -Path $resDir | Out-Null
$doc = Get-Content (Join-Path $dir 'tasks-master.json') -Raw -Encoding UTF8 | ConvertFrom-Json

# 候选 18：workbuddy 全系 + codex 全系 + auto/autoclaw + cursor 3
$CANDIDATES = @(
  'workbuddy/deepseek-v4.1-flash','workbuddy/glm-5.3-flash','workbuddy/hy3',
  'auto/glm-5.3-flash','autoclaw-cn/zai_glm-5.3-flash',
  'codex/gpt-5.6-sol','codex/gpt-5.6-luna','codex/gpt-5.6-terra',
  'codex/gpt-6-sol','codex/gpt-6-luna','codex/gpt-6-astra',
  'codex/gpt-6.1-sol','codex/gpt-6.1-terra',
  'cursor/grok-4.7@256k','cursor/composer-2.5','cursor/deepseek-v41-flash-1017'
)
# 快筛 6 题：陷阱选择 / git 正解 / signal 场景 / 幻觉工具 / 直答 / 拒绝
$SCREEN_IDS = @('M1-1','M1-3','M1-5','M3-3','M4-3','M4-5')

$TOOLS_TEXT = @"
可用工具（仅限此清单，不存在的工具禁止使用）:
- file_reader: 摘要/整理"已提供"的文本内容（无磁盘读取权限；要读本地文件请用 pwsh Get-Content）。
- code_editor: 生成或修改代码（纯文本生成，无本地磁盘读写权限；读写磁盘文件请用 pwsh）。
- code_edit_with_signal: 生成或修改代码，用于「有可执行验证手段」的任务：需跑测试/修报错/按方案逐条改/需验证跑通。纯文本生成，无本地磁盘读写（读写文件请用 pwsh）。不适用于纯片段生成、改写、格式化、解释代码等无需验证的轻量场景。
- planner: 复杂任务的规划与推理。
- image_analyst: 分析图像内容(截图/图表/照片)，做视觉理解。
- security_guard: 审查 pwsh / 写库参数，只输出 JSON。
- summarizer: 汇总各步骤结果为最终答复。
- git: 本地只读 Git 摘要，默认只执行 git status --short 与 git diff --stat（超过 20 行截断）。不要用它执行 pull、rebase、push，也不要用它跑 git log。
- pwsh: 把自然语言转成一条 PowerShell 命令并执行（读盘/跑构建/批量处理都用它）。每步只做一件事。
注意: 读磁盘内容只能用 pwsh；file_reader/code_editor/code_edit_with_signal 都不能读写磁盘。
"@
$SCHEMA_TEXT = @"
只输出一个 JSON 对象（不要 markdown 代码块、不要多余文字）:
{"route":"execute_tools|direct_answer|refuse","analysis":"<=200字","steps":[{"tool":"工具名","intent":"做什么","depends_on":[],"estimate_tokens":0}],"notes":"风险/偏离说明"}
规则: direct_answer/refuse 时 steps=[]; 工具名必须来自清单; 步骤间有依赖用 depends_on 标前序序号(0起); 简单任务一步搞定,可聚合的命令合成一条。
"@

$script:SPENT = 0.0
$script:PRICES = @{}
function Get-Price([string]$m) {
  # 返回 @{p=USD/1M in; c=USD/1M out}；pricing=null 属池额度按 0 计（与 run-matrix 口径一致）
  if ($script:PRICES.ContainsKey($m)) { return $script:PRICES[$m] }
  $p = @{ p = 0.0; c = 0.0; priced = $false }
  try {
    $r = curl.exe -s -m 10 -H 'Authorization: Bearer magpie' "$gw/models" | ConvertFrom-Json
    $info = $r.data | Where-Object { $_.id -eq $m } | Select-Object -First 1
    if ($info -and $info.pricing) {
      $p.p = [double]$info.pricing.prompt * 1e6
      $p.c = [double]$info.pricing.completion * 1e6
      $p.priced = $true
    }
  } catch { }
  $script:PRICES[$m] = $p; return $p
}

function Invoke-PlannerCore([string]$model, [string]$userText) {
  $sys = "$TOOLS_TEXT`n`n$SCHEMA_TEXT"
  $payload = @{ model = $model; temperature = 0.2; max_tokens = 1500
    messages = @( @{ role='system'; content=$sys }, @{ role='user'; content=$userText } ) } | ConvertTo-Json -Depth 6 -Compress
  $pf = Join-Path $env:TEMP ("pl_" + [guid]::NewGuid().ToString('N') + ".json")
  # 无 BOM 写入（带 BOM 会被网关判 "expected a JSON object" 400）
  [IO.File]::WriteAllText($pf, $payload, [Text.UTF8Encoding]::new($false))
  $rf = "$pf.out"
  $sw = [Diagnostics.Stopwatch]::StartNew()
  $code = curl.exe -s -m $TimeoutSec -o $rf -w '%{http_code}' -X POST "$gw/chat/completions" `
    -H 'Authorization: Bearer magpie' -H 'Content-Type: application/json' --data-binary "@$pf"
  $ms = $sw.ElapsedMilliseconds
  try {
    if ($code -ne '200') { return @{ error = "http_$code"; ms = $ms } }
    $resp = Get-Content $rf -Raw -Encoding UTF8 | ConvertFrom-Json
    $msg = $resp.choices[0].message.content
    $pt = [long]$resp.usage.prompt_tokens; $ct = [long]$resp.usage.completion_tokens
    $cached = 0; if ($resp.usage.prompt_tokens_details.cached_tokens) { $cached = [long]$resp.usage.prompt_tokens_details.cached_tokens }
    $price = Get-Price $model
    $cost = if ($price.priced) { [math]::Round(($pt * $price.p + $ct * $price.c) / 1e6, 6) } else { 0.0 }
    return @{ ms = $ms; pt = $pt; ct = $ct; cached = $cached; cost = $cost; content = $msg }
  } finally { Remove-Item $pf, $rf -ErrorAction SilentlyContinue }
}

# --- 成本读数与熔断 ---
function Get-Spent {
  $f = Join-Path $resDir 'bench-spend.json'
  if (Test-Path $f) { return (Get-Content $f -Raw | ConvertFrom-Json).spent_usd } else { return 0.0 }
}
function Add-Spend([double]$x) {
  $f = Join-Path $resDir 'bench-spend.json'
  $cur = Get-Spent; $new = [math]::Round($cur + $x, 6)
  @{ spent_usd = $new; updatedAt = (Get-Date -Format o) } | ConvertTo-Json | Set-Content $f -Encoding UTF8
  return $new
}

# --- 结果读写（幂等） ---
function Get-Store([string]$suite) {
  $f = Join-Path $resDir "bench-$suite.json"
  if (Test-Path $f) { return Get-Content $f -Raw -Encoding UTF8 | ConvertFrom-Json }
  return @{ rows = @() }
}
function Save-Store([string]$suite, $store) {
  $f = Join-Path $resDir "bench-$suite.json"
  $store | ConvertTo-Json -Depth 8 | Set-Content $f -Encoding UTF8
}
function Have-Row($store, [string]$m, [string]$t) {
  return ($store.rows | Where-Object { $_.model -eq $m -and $_.task -eq $t }).Count -gt 0
}
function Add-Row($store, $row) { $store.rows += $row }

# --- 主流程 ---
$tasks = $doc.tasks
if ($Suite -eq 'ping') {
  $targets = $CANDIDATES
  $sel = @(@{ id = 'ping'; route_expect = 'direct_answer'; prompt = 'ping: 只输出 {"route":"direct_answer","analysis":"ok","steps":[],"notes":""}' })
  $combos = $targets.Count
} elseif ($Suite -eq 'screen') {
  $targets = $CANDIDATES
  $sel = $tasks | Where-Object { $SCREEN_IDS -contains $_.id }
  $combos = $targets.Count * $sel.Count
} else {
  # full: 快筛通过者（screen.json 中该模型 >=5/6 行成功且输出可解析为 JSON）
  $scr = Get-Store 'screen'
  $pass = @($scr.rows | Group-Object model | Where-Object {
    $ok = ($_.Group | Where-Object { -not $_.error -and $_.raw }).Count
    $parsed = 0
    foreach ($row in ($_.Group | Where-Object { -not $_.error -and $_.raw })) {
      try { $null = $row.raw | ConvertFrom-Json; $parsed++ } catch { }
    }
    $ok -ge 5 -and $parsed -ge 5
  } | ForEach-Object { $_.Name })
  if (-not $pass) { Write-Output 'full: 无快筛通过模型，请先跑 screen'; exit 1 }
  $targets = $pass; $sel = $tasks; $combos = $targets.Count * $sel.Count
}

if ($DryRun) { Write-Output "suite=$Suite models=$($targets.Count) tasks=$($sel.Count) combos=$combos"; $targets | ForEach-Object { "  $_" }; exit 0 }

$store = Get-Store $Suite
$done = 0; $stopped = 'no'
foreach ($m in $targets) {
  foreach ($t in $sel) {
    if (Have-Row $store $m $t.id) { continue }
    if ((Get-Spent) -ge $CapUSD) { $stopped = "cap_reached_at_`$$((Get-Spent))"; break }
    $prompt = if ($Suite -eq 'ping') { 'ping: 只输出 {"route":"direct_answer","analysis":"ok","steps":[],"notes":""}' } else { $t.prompt }
    $r = Invoke-PlannerCore $m $prompt
    if ($r.error) {
      Add-Row $store @{ model=$m; task=$t.id; error=$r.error; ms=$r.ms; ts=(Get-Date -Format o) }
    } else {
      $spent = Add-Spend $r.cost
      Add-Row $store @{ model=$m; task=$t.id; route_expect=$t.route_expect; ms=$r.ms; pt=$r.pt; ct=$r.ct; cached=$r.cached; cost=$r.cost; raw=$r.content; ts=(Get-Date -Format o) }
    }
    $done++
    Save-Store $Suite $store
    Write-Output ("[{0}/{1}] {2} {3} ms={4} spent=`${5}" -f $done, $combos, $m, $t.id, $r.ms, (Get-Spent))
  }
  if ($stopped -ne 'no') { break }
}
Save-Store $Suite $store
Write-Output "suite=$Suite done=$done stopped=$stopped spent=`$$(Get-Spent)"
