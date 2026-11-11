# Summary
2026-11-11，PowerShell 7.6.9 安装至 C:\Program Files\PowerShell\7\pwsh.exe，从镜像下载官方 zip 解压（非 MSI 注册）并写入系统 PATH；winget 的 MSIX 安装卡在暂存阶段、GitHub 直连下不动。5.1 保留于 C:\Windows\System32\WindowsPowerShell\v1.0 未动。DSH 解析顺序为 pwshPath（未设）→ 7 路径 → PATH pwsh → 5.1，新会话自动用 7.6.9，当前会话仍走 5.1。升级消除 694 次 NativeCommandError 与 GBK 写文件问题。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 给出修改方案，需要升级你可以直接帮我升级好
...
**assistant [peer=github.com-tyvt-skills]**: winget 卡在 MSIX 安装阶段，改用 MSI 安装。
...
**assistant [peer=github.com-tyvt-skills]**: PowerShell 7.6.9 已装好，验证通过。当前这个会话里的 pwsh 工具进程是在安装前启动的，仍然走 5.1；**新开的会话会自动用 7.6.9**，不用改 DSH 配置。

## 已完成

- 安装位置：`C:\Program Files\PowerShell\7\pwsh.exe`，版本 `7.6.9`。
- 已写入系统 PATH。
- winget 的 MSIX 安装卡在暂存阶段，GitHub 直连又下不动，最后是从镜像下的官方 zip 解压安装的，不是 MSI 注册。功能上 DSH 只认这个路径，够用。以后 `winget upgrade` 可能认不出这次安装，要升级时再覆盖这个目录即可。
- 5.1 保留在 `C:\Windows\System32\WindowsPowerShell\v1.0`，系统组件没动。

DSH 的解析顺序是：配置里的 `pwshPath`（当前没设）→ `C:\Program Files\PowerShell\7\pwsh.exe` → PATH 上的 `pwsh.exe` → 5.1。所以新会话会命中第一项。

## 这次升级实际消掉什么

7 默认不把原生命令的 stderr 包成 `NativeCommandError`，最近 8 天 694 次这类「git 明明成功、工具报 exit 1」会消失。7 写文件默认 UTF-8，`Set-Content` / `Out-File` 整文件重写不再按 GBK 破坏中文。输出乱码本来就被每次命令前的 UTF-8 前缀压住了，这块不变。

## 升级消不掉、也不该改工具的

- 约 925 次没有 PowerShell 错误记录的 exit 1：子进程自己失败，换 shell 没用。
- 引号和变量写法：`-m` 用单引号；`git rev-parse '@{u}'`；`$env:GIT_EDITOR='true'`，不要写 `GIT_EDITOR=true`。
- 15 次空参数 `INVALID_ARGS`：长会话退化，连续两次就收尾换会话，不是 shell 问题。

调用约定已经写在 `tool-call-hygiene` 自愈表里，没有再改规则文件。

<!-- MEMORY_FIELDS
{
  "event_name": "PowerShell升级完成",
  "goal": "记录PowerShell升级",
  "summary": "2026-11-11，PowerShell 7.6.9 安装至 C:\\Program Files\\PowerShell\\7\\pwsh.exe，从镜像下载官方 zip 解压（非 MSI 注册）并写入系统 PATH；winget 的 MSIX 安装卡在暂存阶段、GitHub 直连下不动。5.1 保留于 C:\\Windows\\System32\\WindowsPowerShell\\v1.0 未动。DSH 解析顺序为 pwshPath（未设）→ 7 路径 → PATH pwsh → 5.1，新会话自动用 7.6.9，当前会话仍走 5.1。升级消除 694 次 NativeCommandError 与 GBK 写文件问题。",
  "ranges": "0,15,34-41",
  "source_extraction_id": "1e4d3b3fd7fd408d815f5ca52f65e3ac",
  "version": 1,
  "memory_type": "events"
}
-->