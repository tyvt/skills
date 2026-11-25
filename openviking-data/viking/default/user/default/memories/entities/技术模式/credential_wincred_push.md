# git push 凭据助手回退到 wincred
当 Git 配置 `credential.helper=manager` 因缺少 credential-manager 不可用时，用 `git -c credential.helper=wincred push` 在单条命令中覆盖凭据助手即可成功推送。

## 触发场景
- 执行 `git push origin dev` 时因 `credential.helper=manager` 不可用而卡住，系统缺少 credential-manager
- 需在不修改全局 Git 配置的情况下改用可用凭据存储完成推送

## 解决方案
- 用 `git -c credential.helper=wincred push origin dev` 单次覆盖凭据助手，规避缺失的 credential-manager
- 会产生无害警告，但推送可成功完成；工作区脏文件仍未 stage、未随 push 带上

## 验证与归属
- 会话 2026-11-25：H5 项目 dev 用 wincred 成功推送 `d2effe5..87d84b0 dev -> dev`，仅推 dev 上已有 2 个提交（c35a626、87d84b0），未重做 #6969 代码/验证/禅道

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credential_wincred_push",
  "source_extraction_id": "0d8cf6d01bef460ba3f32029ccc773ac",
  "version": 1,
  "memory_type": "entities"
}
-->