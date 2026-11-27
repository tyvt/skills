---
audit_status: valid
last_checked: 2026-11-27T16:27:00+08:00
verdict_note: 用户 git push 结果判定偏好，为操作约定，非代码事实，无违规。
---

- 在 Windows PowerShell 5.1 中判定 `git push` 结果时，不把末尾 `[exit code: 1]` 单独当作失败。
- 认识到 git 与 gitlab 的 `warning:` 走 stderr 可能触发 NativeCommandError，但 git 对这些 warning 仍返回 0，远程引用可能已更新。
- 确认推送成功时同时核对 push 输出中的 `xxxx..yyyy branch -> branch`、`git status -sb` 的 ahead/behind 为 `0/0`、以及 `git ls-remote origin <branch>` 的远端 SHA 等于本地 HEAD。
- 子模块与父仓库结构下，还要核对父仓记录的 gitlink 是否指向子模块实际提交。
- 将 git 的 `warning:` 走 stderr 视为正常行为，避免因 stderr 噪声重复推送或误判回滚。


<!-- MEMORY_FIELDS
{
  "version": 1
}
-->