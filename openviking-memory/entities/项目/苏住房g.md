# 苏住房G
苏住房G（苏州住房G端/管理端H5）前端项目，使用 zhi2-web-admin 子模块，本机工作区位于 D:/repository/苏住房G。

## 项目描述
- 涵盖房地产合同、企业登记、月度报告、评估、资产/资金全景监管等模块。
- 用户积累了多个调试、重构与 bug 修复工作流，用于偏好和技术模式记忆的项目上下文。

## 仓库结构与工作流
- 主工作区分支为 develop/v2.6.2-suzhufang，位于苏住房G目录；子模块 zhi2-web-admin 同分支。
- worktree 嵌套在苏住房G/worktrees/内部，属子模块而非父仓库直接管理；父仓库 git worktree list 不显示子模块 worktree。
- 嵌套 worktree：bug5897（注册名 bug5874，分支 develop/v2.6.2-suzhufang-li，HEAD cfe7f9930）；task2192（分支 develop/v2.6.2-suzhufang-evaluation，HEAD 4e2cf39b3）；均基于基分支，截至2026-11-04未合并但已推origin。
- 子模块关联：父仓库特性分支建同名父分支，固定 gitlink 指向子模块提交，.gitmodules 设 branch 后提交推送；截至2026-11-04父分支 li（44274f8）已推，evaluation（3940898）推送被拒需整合。
- 主线直接开发：2026-11-04 禅道2295直接在 develop/v2.6.2-suzhufang 改 detail.vue 推送，子模块提交8992db265，父提交8fb06ce更新gitlink。
- 本地 nginx 站点'苏住房G'端口8101，root 指向 D:/repository/苏住房G/dist，已 reload。
- 2026-11-05 完成 develop/v2.6.2 到 develop/v2.6.2-suzhufang 合并：子模块提交 cc496589e 自动合并无冲突，父仓库更新指针 0fb43ab，工作区干净本地超前远程1提交。
- 2026-11-05 将 pubBankReceiptApply 详情页获取回单明细按钮修复 cherry-pick 到 develop/v2.6.2（子模块提交 1b3c7f6c5），原分支 develop/v2.6.2-suzhufang 提交 1df2da437，两分支各领先远程 1 提交未推送（来源会话 765750a0-13d8-4789-8d78-9bb82bdf1e1f）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房G",
  "source_extraction_id": "0fa9adadc9e847248fa4eb9235709be9",
  "version": 19,
  "memory_type": "entities"
}
-->