# GitHub 推送凭据
本机向 github.com 推送 git 仓库所用的凭据配置。

## 凭据来源
- Windows Credential Manager 已有条目 `git:https://github.com`，用户名 `tyvt`。
- 本机 git 安装的默认 `credential-manager` helper 缺失，直接 push 会静默挂起。

## 推送方式
- 2026-11-25 起改用 `wincred` helper 读取已存凭据可成功推送，例如 `git -c credential.helper=wincred push`。
- `credential-manager` 相关警告无害，可忽略。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "开发环境",
  "name": "github_push_credential",
  "source_extraction_id": "84afdbe8120d477eb21af304ed94520e",
  "version": 1,
  "memory_type": "entities"
}
-->