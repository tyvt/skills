# Git 推送成功校验模式
`git push` 返回 `Everything up-to-date` 不代表未推送，须用 `git ls-remote` 比对远程 ref 与本地 HEAD 确认。

## 现象
- 两仓库 `git push` 均返回 `Everything up-to-date`，易误判推送失败而重复操作
- 实际远程已含本次提交，因钩子/同步通道在推送前已送达

## 校验步骤
- `git ls-remote` 取子模块与主仓远程 ref，与本地 HEAD 一致才算成功
- 父仓 gitlink 核对：`git ls-tree HEAD zhi2-web-admin` 须等于子模块当前 HEAD
- `git status -sb` 看 ahead/behind 为 `0 0` 确认无遗漏
- 交付结论写具体命令与哈希，不写「已推送」

## 涉及与验证
- 会话 session-1f0a75c8-f454-4cb8-93f2-485ebf92d3b5（基线 a86bf95）企业资质附件改造推送
- 远程校验：子模块 3343efea3、主仓 b44a496d8 与本地 HEAD 一致，gitlink 匹配
- 涉及文件：CompanyRegisterSingleForm.vue、registerAppendixAdminType.js、vite.config.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "git_push_verify",
  "source_extraction_id": "12244aba6c2143ed925def5f8c54b8d0",
  "version": 1,
  "memory_type": "entities"
}
-->