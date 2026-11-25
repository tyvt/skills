# deploy-env 看板开机静默自启安装脚本
# 幂等：任务已存在则先删除再重建；用 pythonw.exe 无窗口后台运行，工作目录显式指向 deploy-env。
# 用法（管理员权限）：powershell -ExecutionPolicy Bypass -File D:\repository\skills\deploy-env\install-autostart.ps1

$ErrorActionPreference = 'Stop'

$root      = $PSScriptRoot
$pyw       = 'C:\Program Files\Python310\pythonw.exe'
$entry     = Join-Path $root 'dashboard\api.py'
$taskName  = 'deploy-env-dashboard'

if (-not (Test-Path $pyw))    { throw "pythonw.exe 不存在: $pyw" }
if (-not (Test-Path $entry))  { throw "看板入口不存在: $entry" }

$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "已移除旧任务 $taskName"
}

$action  = New-ScheduledTaskAction -Execute $pyw `
    -Argument "`"$entry`"" -WorkingDirectory $root
$trigger = New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME"
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType S4U -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -ExecutionTimeLimit 0

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger `
    -Principal $principal -Settings $settings -Description '本地部署看板后台静默服务 (127.0.0.1:18098)' | Out-Null

Write-Host "已创建开机自启任务 $taskName (S4U/Highest, pythonw, 工作目录 $root)"

# 注册后立即启动，避免安装完仍停留在 Ready 状态（静默后台，无黑窗）
Start-ScheduledTask -TaskName $taskName
Write-Host "已启动任务 $taskName（State=$((Get-ScheduledTask -TaskName $taskName).State)）"
