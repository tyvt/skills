# PowerShell 将 git stderr 误报为 exit code 1
在 PowerShell/CI 中，git 写入 stderr 的进度/redirect 提示会被包装层计成非零退出码，导致成功推送被误报为失败。

## 现象与根因
- 两次 `git push` 均显示 `exit code: 1`，但推送实际成功
- PowerShell/CI 中外部命令只要往 stderr 写任何内容（进度条、提示、警告），包装层就可能计为非零退出码
- git 的正常输出（如 `Receiving objects`、`remote: redirecting to …`）恰好走 stderr，于是「成功」被误报为「失败」
- 真失败（如认证失败）也写 stderr，故不能只信退出码，也不能只信 stderr 有无内容

## 判定规则
- 判定 push 是否成功用仓库状态而非退出码：`git status -sb` 看 `ahead=0 behind=0`，或 `git log origin/<branch>..HEAD` 为空
- 辅助证据：远端 ref 更新记录（如 `f6de19ef5..6a5960bab` 表示远端已前进）
- 看到 exit code 1 先看 stderr 内容是否为「进度/redirect 提示」，是则按成功处理
- 真失败仍表现为 ref 未更新，需两者结合判断

## 验证与归属
- 来源会话 session-a80585ad-f4f6-47a5-982d-91ec43234a02（基线 5d68a74）最终结论「两点说明」第 2 条
- 同段记录父仓库 → `5ea5402..4826471` → `zhi2-web-admin-h5-g-unlimited`（远端做了 redirect，git 已自动跟随）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "git_stderr_exit1",
  "source_extraction_id": "e4f7a4332a82405ead33f2c2960fbe01",
  "version": 1,
  "memory_type": "entities"
}
-->