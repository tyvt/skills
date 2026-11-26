# agent-browser 后台任务勿杀进程树
在 zhi2-web-admin 实机验证使用 agent-browser CLI 时，job_kill 会连带杀掉其启动的 Chrome，导致会话页反复回到 about:blank。

## 根因
- agent-browser 后台 job 的进程树包含它启动的 Chrome，job_kill 会杀掉整棵树
- 每次 job_kill 后页面丢失回到 about:blank，易误判为会话异常、深灰空白页或登录态失效
- 交接文档「不要 kill open 的后台 job」正是指此

## 正确做法
- 不再 kill 任何 agent-browser job，让 Chrome 持续存活；命令输出后句柄不退出转后台时只读输出
- open 慢于 timeout（25s）会被掐断未生效，改用后台 job 方式并在同一 shell 内 open+等待+快照
- 登录按钮文字为「登 录」（带空格），wait --text "登录" 命不中
- 验证码为 .login-code-img（data URI），落盘后识别比截屏裁切更准

## 时间要点
- bash 的 TZ 未生效（date 给 UTC、实际本地 +8），现算本地时间须用 PowerShell Get-Date

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "browser_job_kill",
  "source_extraction_id": "be4ca474cf8647be942f5b6e7bb449d2",
  "version": 1,
  "memory_type": "entities"
}
-->