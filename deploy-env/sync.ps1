#requires -Version 5.1
# sync.ps1 — 以注册表为准收敛 nginx：备份 → 生成片段 → 冲突感知放置 → include → nginx -t → reload → 探活回滚
# 用法: pwsh -NoProfile -ExecutionPolicy Bypass -File sync.ps1 [-SimulateBadFragment]
param([switch]$SimulateBadFragment)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$root      = 'D:\repository\skills\deploy-env'
$sites     = 'D:\nginx\conf\sites-enabled'
$envSites  = Join-Path $root 'env-sites'
$archive   = Join-Path $root 'sites-archive'
$nginxConf = 'D:\nginx\conf\nginx.conf'
$nginxExe  = 'D:\nginx\nginx.exe'
$bakRoot   = 'D:\nginx\conf\backup'
$py        = 'C:\Program Files\Python310\python.exe'
$events    = New-Object System.Collections.Generic.List[string]
$ts        = Get-Date -Format 'yyyyMMdd_HHmmss'

function Add-Event([string]$project, [string]$envv, [string]$action, [string]$result, [string]$detail) {
    $detail = ($detail -replace "[`r`n`t]+", ' ')
    if ($detail.Length -gt 500) { $detail = $detail.Substring(0, 500) }
    $script:events.Add(($project + "`t" + $envv + "`t" + $action + "`t" + $result + "`t" + $detail))
}

function Write-EventLog {
    $tmp = Join-Path $env:TEMP ('deploy_events_' + $script:ts + '.tsv')
    $script:events | Set-Content -LiteralPath $tmp -Encoding utf8
    & $py -c "import sys,sqlite3,datetime; p=r'$tmp'; con=sqlite3.connect(r'D:\repository\skills\deploy-env\registry.sqlite'); [con.execute('INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)', (datetime.datetime.now().isoformat(timespec='seconds'),)+tuple(l.rstrip().split('\t'))) for l in open(p,encoding='utf-8-sig') if l.strip()]; con.commit(); con.close()"
    Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
}

function Restore-Backup {
    Copy-Item -LiteralPath (Join-Path $bak 'nginx.conf') -Destination $nginxConf -Force
    Get-ChildItem -LiteralPath $bak -File | Where-Object { $_.Name -notlike 'nginx.conf' } | Copy-Item -Destination $sites -Force
    Remove-Item -LiteralPath (Join-Path $envSites 'zz-bad.conf') -Force -ErrorAction SilentlyContinue
}

$mutex = New-Object System.Threading.Mutex($false, 'Global\dsh-deploy-env-sync')
if (-not $mutex.WaitOne(0)) { Write-Output 'LOCKED: 另一 sync 正在执行'; exit 1 }

try {
    # ---- 1) 备份 nginx.conf 与 sites-enabled ----
    $bak = Join-Path $bakRoot $ts
    New-Item -ItemType Directory -Force -Path $bak | Out-Null
    Copy-Item -LiteralPath $nginxConf -Destination $bak -Force
    Get-ChildItem -LiteralPath $sites -File | Copy-Item -Destination $bak -Force
    Write-Output ("BACKUP=" + $bak)

    # ---- 1.5) sync 前探活快照（用于退化对比）----
    $pre = & $py -c "import sys,json; sys.path.insert(0,r'$root'); from dashboard.api import probe_http, load_registry; rows,_=load_registry(); print(json.dumps({r['frontend_url']: probe_http(r['frontend_url'],3.0) for r in rows if r['status']=='enabled'}))" 2>$null
    $preMap = $pre | ConvertFrom-Json -AsHashtable

    # ---- 2) 由注册表重新生成 env-sites 片段 ----
    & pwsh -NoProfile -ExecutionPolicy Bypass -File (Join-Path $root 'gen_nginx_sites.ps1') | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'gen_nginx_sites 失败' }

    # ---- 3) 冲突感知放置：legacy conf 已占端口的片段归档不部署，记事件待人工 ----
    New-Item -ItemType Directory -Force -Path $archive | Out-Null
    $legacyPorts = @{}
    Get-ChildItem -LiteralPath $sites -Filter '*.conf' -File | ForEach-Object {
        $m = Select-String -LiteralPath $_.FullName -Pattern '^\s*listen\s+(\d+)' -ErrorAction SilentlyContinue
        foreach ($x in $m) { $legacyPorts[[int]$x.Matches[0].Groups[1].Value] = $_.Name }
    }
    $deployed = 0
    Get-ChildItem -LiteralPath $envSites -Filter '*.conf' -File | ForEach-Object {
        $m = Select-String -LiteralPath $_.FullName -Pattern '^\s*listen\s+(\d+)'
        $port = [int]$m.Matches[0].Groups[1].Value
        if ($legacyPorts.ContainsKey($port)) {
            Move-Item -LiteralPath $_.FullName -Destination (Join-Path $archive $_.Name) -Force
            Add-Event $_.BaseName.Split('-')[0] $_.BaseName.Split('-')[1] 'sync' 'conflict-archived' ("端口 {0} 被 legacy conf {1} 占用，片段归档待人工" -f $port, $legacyPorts[$port])
        } else { $deployed++ }
    }

    # ---- 4) nginx.conf 增加 include env-sites（幂等；必须插入 http 上下文内，锚点=sites-enabled include）----
    $incLine = 'include D:/repository/skills/deploy-env/env-sites/*.conf;'
    $raw = [System.IO.File]::ReadAllText($nginxConf)
    $includeAdded = $false
    if (-not $raw.Contains('deploy-env/env-sites/*.conf')) {
        $anchor = 'include sites-enabled/*.conf;'
        if (-not $raw.Contains($anchor)) { throw 'nginx.conf 未找到 sites-enabled include 锚点' }
        $raw = $raw.Replace($anchor, $anchor + "`r`n" + $incLine)
        [System.IO.File]::WriteAllText($nginxConf, $raw, [System.Text.UTF8Encoding]::new($false))
        $includeAdded = $true
        Add-Event '*' '*' 'sync' 'include-added' $incLine
    }

    # ---- 5) 负向验证钩子 ----
    if ($SimulateBadFragment) {
        [System.IO.File]::WriteAllText((Join-Path $envSites 'zz-bad.conf'), "this is not valid nginx;`r`n", [System.Text.UTF8Encoding]::new($false))
    }

    # ---- 6) nginx -t 门禁，失败自动还原 ----
    $t = & $nginxExe -p 'D:/nginx/' -t 2>&1
    if ($LASTEXITCODE -ne 0) {
        Restore-Backup
        Add-Event '*' '*' 'sync' 'nginx-t-failed-rollback' (($t | Out-String).Trim())
        Write-EventLog; Write-Output 'NGINX_T_FAILED: 已还原备份，未 reload'; exit 1
    }

    # ---- 7) 有实际变更才 reload + 退化探活（只拦「之前通、现在不通」）----
    if ($deployed -gt 0 -or $includeAdded) {
        & $nginxExe -p 'D:/nginx/' -s reload | Out-Null
        Start-Sleep -Seconds 1
    }
    if ($SimulateBadFragment) { Remove-Item (Join-Path $envSites 'zz-bad.conf') -Force }
    if ($deployed -gt 0) {
        $probe = & $py -c "import sys,json; sys.path.insert(0,r'$root'); from dashboard.api import probe_http, load_registry; rows,_=load_registry(); print(json.dumps({r['frontend_url']: probe_http(r['frontend_url'],3.0) for r in rows if r['status']=='enabled'}))" 2>$null
        $postMap = $probe | ConvertFrom-Json -AsHashtable
        $badUrls = @($postMap.Keys | Where-Object { $postMap[$_] -eq 'down' -and $preMap[$_] -and $preMap[$_] -ne 'down' })
        if ($badUrls.Count -gt 0) {
            Restore-Backup
            & $nginxExe -p 'D:/nginx/' -s reload | Out-Null
            Add-Event '*' '*' 'sync' 'probe-failed-rollback' ("reload 后退化站点: " + ($badUrls -join ','))
            Write-EventLog; Write-Output 'PROBE_FAILED: 已还原备份并二次 reload'; exit 2
        }
    }

    Add-Event '*' '*' 'sync' 'ok' ("deployed={0} archived={1} backup={2}" -f $deployed, ($events | Where-Object { $_ -match 'conflict-archived' }).Count, $bak)
    Write-EventLog
    Write-Output ("SYNC_OK deployed=" + $deployed + " backup=" + $bak)
    exit 0
}
finally {
    $mutex.ReleaseMutex()
    $mutex.Dispose()
}
