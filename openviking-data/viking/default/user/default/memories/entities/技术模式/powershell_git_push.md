# PowerShell 下 git push 末尾 [exit code: 1] 假失败
Windows PowerShell 5.1 把子进程 stderr 的 warning 包装成 NativeCommandError 并标记命令失败，但 git 本身返回 0 且远程引用已更新，退出码是噪声而非判据。

## 问题现象
- `git push` 后 PowerShell 报 `[exit code: 1]`，但远程分支实际已更新，易误判为推送失败并重复操作
- PowerShell 5.1 对 NativeCommandError 处理：子进程往 stderr 写任何内容（如 git 的 `warning: redirecting to ...`、GitLab 的 http 提示）就被包装成 NativeCommandError 并把整条命令标记为失败
- git 本身对这些 warning 仍返回 0，远程引用已更新

## 解决方案
- 判定推送成功不要只看退出码，看三件事：`git push` 输出里的 `xxxx..yyyy  branch -> branch` 行、随后 `git status -sb` 的 ahead/behind 是否为 0/0、以及 `git ls-remote origin <branch>` 里远端 SHA 是否等于本地 HEAD
- 子模块 + 父仓库结构下还要核对父仓记录的 gitlink 是否指向子模块实际提交
- git 的 `warning:` 走 stderr 是正常行为，不是错误

## 验证与归属
- 验证证据：会话 77578f4a（基线 69cd251，禅道 bug 5947 收尾）最终结论明确两个 `git push` 末尾 `[exit code: 1]` 是 PowerShell 把 git 的 `warning: redirecting to ...`（stderr）当成 NativeCommandError，并非推送失败，实际都成功更新了远程引用，并给出子模块 afa0162c / 父仓库 639fe7a 的 ahead/behind 0/0 与 gitlink 校验结果
- 涉及文件：zhi2-mobile-shimin/src/pages_owner/repair/add.vue
- 代码基线：69cd251；来源会话ID：session-77578f4a-4105-4049-a3a2-7fbff7957671

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "powershell_git_push",
  "source_extraction_id": "68d873110b79474388682d4caa3d040f",
  "version": 1,
  "memory_type": "entities"
}
-->