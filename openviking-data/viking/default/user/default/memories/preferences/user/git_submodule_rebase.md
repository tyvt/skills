---
audit_status: valid
last_checked: 2026-11-27T14:12:04+08:00
verdict_note: 偏好记忆：skills/dsh/AGENTS.md 确有「git rebase 前先 git status --short 子模块、多子模块禁裸 rebase」原则，描述与现状一致。
---
- For git branches carrying many submodule pointer commits (e.g. suzhou-shiqu-suzhufang-main-v2.1-mp with 64 of 109 commits touching pointers), never run `git rebase`; keep the current clean state or use `git merge` instead.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "git_submodule_rebase",
  "source_extraction_id": "3cc773466ea64436bc5bf0e2a554a53c",
  "version": 1,
  "memory_type": "preferences"
}
-->