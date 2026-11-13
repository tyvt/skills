<#
.SYNOPSIS
    把本地 DSH 插件从源码目录以 junction 形式挂入 profile 的 node_modules，
    让「源码目录」成为唯一副本；改完源码重启 dsh web 即生效。

.DESCRIPTION
    背景：profile 的 package.json 用 `file:` 依赖本地插件，且 nodeLinker=hoisted，
    因此 pnpm 会把插件硬复制进 node_modules。源码改动不会同步，必须
    `pnpm install --force` 才会重新拷贝。本脚本在安装之后把副本换成 junction，
    恢复「只有一份代码」。

    用法：每次 `pnpm install` 之后跑一次，把可能被 pnpm 换回实体目录的 junction 重建。

.PARAMETER PluginRoot
    插件源码根目录。默认为本脚本所在仓库的 dsh 目录（<repo>/dsh）。
    也可用环境变量 DSH_PLUGIN_ROOT 指定。

.PARAMETER NodeModules
    目标 profile 的 node_modules。默认为 ~/.dsh/profiles/web/node_modules。
    也可用环境变量 DSH_PROFILE_NODE_MODULES 指定。

.PARAMETER Plugins
    要链接的插件子目录名（相对于 PluginRoot）。默认只链接已确认安全的本地插件。

.PARAMETER DryRun
    只打印将要执行的动作，不做任何修改。

.EXAMPLE
    .\link-plugins.ps1 -DryRun

.EXAMPLE
    .\link-plugins.ps1 -NodeModules 'D:\other\.dsh\profiles\web\node_modules'

.NOTES
    回退：删掉 junction，再跑一次 `pnpm install --force` 即可恢复实体目录。
#>
[CmdletBinding()]
param(
    [string]$PluginRoot,

    [string]$NodeModules,

    [string[]]$Plugins = @(
        'orchestrator',
        'agent-guard',
        'cost-meter',
        'mcp-gateway',
        'orchestrator-gate',
        'token-guard',
        'token-models',
        'dcwhc'
    ),

    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# ---- 解析路径：参数 > 环境变量 > 默认值（默认值从脚本实际位置推导，不硬编码用户路径）----
if (-not $PluginRoot) {
    $PluginRoot = if ($env:DSH_PLUGIN_ROOT) { $env:DSH_PLUGIN_ROOT }
                  else { Join-Path (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) 'dsh' }
}
if (-not $NodeModules) {
    $NodeModules = if ($env:DSH_PROFILE_NODE_MODULES) { $env:DSH_PROFILE_NODE_MODULES }
                   else { Join-Path $HOME '.dsh\profiles\web\node_modules' }
}

# 插件目录名 -> node_modules 里的包名（默认同名，个别不一致的在此映射）
$PackageNameMap = @{
    'dcwhc' = 'dsh-channel-wechat-companion'
}

function Resolve-PackageName([string]$Plugin) {
    if ($PackageNameMap.ContainsKey($Plugin)) { return $PackageNameMap[$Plugin] }
    if ($Plugin -like 'dsh-*') { return $Plugin }
    return "dsh-$Plugin"
}

Write-Host "PluginRoot  : $PluginRoot"
Write-Host "NodeModules : $NodeModules"
Write-Host "Plugins     : $($Plugins -join ', ')"
if ($DryRun) { Write-Host '*** DRY RUN - 不做任何修改 ***' -ForegroundColor Yellow }

if (-not (Test-Path $PluginRoot))  { throw "PluginRoot 不存在: $PluginRoot" }
if (-not (Test-Path $NodeModules)) { throw "NodeModules 不存在: $NodeModules" }

$ok = 0; $skipped = 0; $failed = 0

foreach ($plugin in $Plugins) {
    $source = Join-Path $PluginRoot $plugin
    $pkg    = Resolve-PackageName $plugin
    $dest   = Join-Path $NodeModules $pkg

    if (-not (Test-Path $source)) {
        Write-Warning "跳过 $plugin`: 源码目录不存在 ($source)"
        $skipped++; continue
    }
    $pkgJson = Join-Path $source 'package.json'
    if (-not (Test-Path $pkgJson)) {
        Write-Warning "跳过 $plugin`: 缺少 package.json，不像一个插件包"
        $skipped++; continue
    }

    # 已是正确的 junction 则不动，避免每次 install 后无意义重建
    if (Test-Path $dest) {
        $item = Get-Item $dest -Force
        if ($item.LinkType -and $item.Target) {
            try {
                if ((Resolve-Path $item.Target).Path -eq (Resolve-Path $source).Path) {
                    Write-Host "  已正确链接，跳过: $pkg" -ForegroundColor DarkGray
                    $ok++; continue
                }
            } catch { }
        }
        Write-Host "  替换现有实体目录: $pkg" -ForegroundColor Cyan
        if (-not $DryRun) { Remove-Item $dest -Recurse -Force }
    }

    if ($DryRun) {
        Write-Host "  [dry] junction $dest -> $source"
        $ok++; continue
    }
    try {
        New-Item -ItemType Junction -Path $dest -Target $source -ErrorAction Stop | Out-Null
        Write-Host "  linked $pkg -> $source" -ForegroundColor Green
        $ok++
    } catch {
        Write-Warning "  链接失败 $pkg`: $($_.Exception.Message)"
        $failed++
    }
}

Write-Host ''
Write-Host "完成: 成功 $ok, 跳过 $skipped, 失败 $failed"
Write-Host '提示：改完插件源码后需重启 dsh web 才生效。'
if ($failed -gt 0) { exit 1 }
