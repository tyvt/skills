# Git标签冲突强制同步
本地标签与远程提交不一致导致 git pull --tags 报 would clobber existing tag 时，强制同步本地标签后再拉取。

## 问题背景
- git pull --tags 因本地标签与远程提交不一致报 would clobber existing tag。
- 直接 pull 会失败，分支推送前需确保标签一致。

## 解决方案
- 用 git tag -f <tag> <remote_commit> 强制把本地标签同步到远程版本。
- 之后 pull --tags 不再冲突。
- 拉取分支用 git pull --ff-only（或确保分支与远程一致）后再推送。

## 验证与归属
- 验证：标签冲突 20260331 83a9738->04a6908，develop/v2.6.1 推送 91c4073。
- 涉及文件：(git)。
- 来源会话：67863756-8819-4e5e-b02e-2bb1ffa5d68d；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "git_tag_sync",
  "source_extraction_id": "ec03f1a8ff9a4f548b9232380e7504fa",
  "version": 1,
  "memory_type": "entities"
}
-->