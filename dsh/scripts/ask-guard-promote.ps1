# ask-guard-promote.ps1 · askGuard 灰度切换脚本（需 PowerShell 7+ / pwsh）
# 用法：
#   pwsh dsh/scripts/ask-guard-promote.ps1 -Mode warn    # 切回告警模式（回滚）
#   pwsh dsh/scripts/ask-guard-promote.ps1 -Mode block   # 灰度通过后切换（默认判据见下）
#   pwsh dsh/scripts/ask-guard-promote.ps1 -Mode off     # 一键关闭
# 灰度判据（.plan/p0-hooks-skills-20261113.md）：连续 2 个灰度会话 ledger 无误伤
# （误伤率 = user_bypass 的 warn 次数 / warn 总次数 ≤ 20%），高危豁免记录抽检均为真实高危。
# 本脚本只算并打印误伤率，切换本身改 cordis.patch.yml 的 askGuard.mode（带 -Apply 才写文件）。
param(
  [ValidateSet('off', 'warn', 'block')][string]$Mode = 'warn',
  [switch]$Apply
)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent (Split-Path -Parent $PSCommandPath)  # dsh/
$ledger = Join-Path $repo 'reports/agent-guard-ledger.jsonl'
if (-not (Test-Path $ledger)) { Write-Host "ledger 不存在：$ledger（灰度期尚无数据）"; exit 0 }
$rows = Get-Content $ledger | ForEach-Object { try { $_ | ConvertFrom-Json } catch { $null } } |
  Where-Object { $_ -and $_.kind -eq 'ask-guard' }
$warns = @($rows | Where-Object { $_.verdict -eq 'warn' })
# user_bypass 记在独立的 ask-guard-bypass 行（空选择/跳过时写入），按会话近似归并到 warn 统计。
$bypassRows = @($rows | Where-Object { $_.kind -eq 'ask-guard-bypass' -and $_.user_bypass -eq $true })
$bypassed = $bypassRows.Count
$rate = if ($warns.Count -gt 0) { [math]::Round($bypassed.Count / $warns.Count, 4) } else { 0 }
Write-Host ("warn 总数={0}  user_bypass={1}  误伤率(近似)={2:P1}" -f $warns.Count, $bypassed, $rate)
Write-Host ("高危豁免记录={0}（需人工抽检均属真实高危）" -f @($rows | Where-Object { $_.high_risk -eq $true }).Count)
if ($rate -gt 0.20) { Write-Warning '误伤率 >20%，不建议切 block。' }
if ($Apply) {
  $cfg = Join-Path $repo 'agent-guard/cordis.patch.yml'
  $content = Get-Content $cfg -Raw
  $content = $content -replace '(?m)^(\s*mode: )(off|warn|block)$', "`$1$Mode"
  Set-Content -Path $cfg -Value $content -NoNewline
  Write-Host "askGuard.mode 已切换为 $Mode（$cfg）。回滚：-Mode warn 再跑一次。"
}
