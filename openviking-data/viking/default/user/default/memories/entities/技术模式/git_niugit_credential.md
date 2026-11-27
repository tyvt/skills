---
audit_status: valid
last_checked: 2026-11-27T21:13:50+08:00
verdict_note: 实机在 niubash-prepared/.../winuxcmd/usr/bin/ 找到 git-credential-manager.exe，与记忆所述复制落点一致；维护脚本按记忆自述未落盘，非矛盾。
---
# niugit 会话推送失败与 git-credential-manager
当前会话的 git 是 niugit，PATH 缺少标准 Git 的 bin，导致 credential.helper=manager 找不到 git-credential-manager.exe，推送报「credential-manager is not a git command」并常表现为超时 exit 124；这是“之前一直能推送、现在不行”的根因。

## 环境事实
- git-credential-manager.exe 存在于 C:/Program Files/Git/mingw64/bin/；全局/系统配置 credential.helper=manager，但 niugit PATH 未含该目录。
- 无 .git-credentials 文件；补 PATH 后 git credential fill 能返回已存的 gitlab.zhi.com 凭据，凭据一直在，无需用户提供。
- SSH key id_ed25519 存在但对 GitLab Permission denied；HTTP 匿名推送被拒（302 到登录）。

## 解决与诊断
- 临时补 PATH：`export PATH="/c/Program Files/Git/mingw64/bin:$PATH"` 后推送成功，不改全局配置。
- 报 helper 缺失时不要直接索要凭据，先用带标准 Git bin 的 PATH 验证 git credential fill；fetch/push 卡住先查 git 来源（niugit vs 标准 Git）和 helper 可执行文件位置，再决定是否问用户。

## DSH Web 持久修复（2026-11-25）
- 触发仅发生于 DSH Web/niubash（ops_bash），UGit/完整 Git 终端正常；属内网 GitLab helper 路径问题，与 GitHub 443 超时不同。用户要求 DSH Web 内可用且不影响全局配置。
- 把 niugit 自带 git-credential-wincred.exe 复制为 niubash prepared 目录的 winuxcmd/usr/bin/git-credential-manager.exe，使全局 credential.helper=manager 可解析；仅改 .dsh，不动全局 git config。具体路径：C:\Users\Administrator\.dsh\dsh-ops\shells\niubash-prepared\<hash>\winuxcmd\usr\bin\git-credential-manager.exe。
- 已验证 git ls-remote 与 git push origin dev 正常（含 87d84b0..5fb2f05 一次推送，当前 Everything up-to-date）；目标仓苏住房防汛C端 D:\repository\苏住房防汛C端，origin http://gitlab.zhi.com/zhi2-mobile-query-h5-c-unlimited.git，dev 与 origin/dev 同步。
- 标准 Git 自带 GCM .exe 复制到 niubash 会本地 .NET 异常/挂死；wincred 别名稳定且能读到 gitlab.zhi.com 凭据。无效项：~/.niubashrc（ops_bash 不读）、仅设 GIT_CONFIG_GLOBAL=wincred（仍走全局 helper 链卡住）、credential.helper=wincred 单条 -c（须先 credential.helper= 清空 helper 链再加 wincred）。
- 新开会话无需重启 DSH Web（改的是 prepared shell）；niubash 被 dsh-ops 重装/重建后需重跑复制或维护脚本 C:\Users\Administrator\.dsh\scripts\ensure-niubash-git-credential.sh（因 plan-gate 未落盘，待用户确认）；防汛C端工作区未提交改动与异常未跟踪文件与推送无关。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "git_niugit_credential",
  "source_extraction_id": "2ace51aa73754eb0a1b2de76afc76609",
  "version": 3,
  "memory_type": "entities"
}
-->