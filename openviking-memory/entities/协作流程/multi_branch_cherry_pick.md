# 多分支逐支 cherry-pick 协作流程
苏住房G 长期并行维护多条分支，同一 bug 需在多条开发分支同时修并逐支 cherry-pick。

## 流程背景
- 并行分支：develop/v2.6.1、develop/v2.6.2、develop/v2.6.2-yulin、develop/v2.6.1-yulin
- yulin 为本地定制分支，主干修复须回灌，否则交付验收时另一分支仍是旧行为
- 共用工作区直接 merge 常被无关本地文件变更挡住

## 执行步骤
- 先在用户指定第一条分支上改并验证
- 同一提交 cherry-pick 到后续每条分支，逐条记录分支名+commit 短哈希作为交付物回报
- 某分支因本地无关变更无法自动合并（如 v2.6.1-yulin）不强推，明确告知可手动 cherry-pick 哪个 commit
- 推送动作留用户确认，只给待执行 git push 命令

## 验证与归属
- 验证证据：会话 78f54f15 用户原话「该问题从261开始排查，按照261-262-262-yulin的顺序，修复之后依次往后合并」
- 涉及文件：zhi2-web-admin
- 所属项目：苏住房G；来源会话：78f54f15-1a3a-45cd-82ca-183abc6df0fb；代码基线：96eaa55

<!-- MEMORY_FIELDS
{
  "category": "协作流程",
  "name": "multi_branch_cherry_pick",
  "source_extraction_id": "294a6804316941388d16116e511fd383",
  "version": 1,
  "memory_type": "entities"
}
-->