# 提交前排除他人未提交改动
共享工作区提交前需识别并排除别人进行中的未提交改动，只在交付里逐条列出被排除文件。

## 背景与问题
- 共享工作区「我的改动」与「别人的改动」混在一起，git add . 一把梭会把别人半成品误提交进主干
- 不说明则提交者自己下次也困惑「为什么这几个文件变了我没改」

## 做法
- 提交前 git status --short 逐条判断归属，只 stage 明确是自己的文件
- 提交后 git show --stat 核对文件清单与行数是否一致
- 交付里明确列出被排除文件及原因（他人进行中 / 本地环境配置），提醒对方知悉
- 本地环境类文件（如 env/.env）默认不入库，需要时单独提交
- PowerShell 下 git commit/push 退出码 1 是 stderr 被当错误流，实际以 log 与同步状态为准

## 验证证据
- 会话 session-06bff897-c6b6-4484-ae0c-434e66e78369（基线 5d68a74）提交 RepairPanel 修复时排除他人未提交改动（home.js、index-v2.vue、EvaluationPanel.vue、evaluationNav.js 等）
- 父仓 env/.env 为本地环境修改未提交；退出码 1 实际成功

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "git_exclude_others",
  "source_extraction_id": "155efbc385c642a1986bf21689227a2b",
  "version": 1,
  "memory_type": "entities"
}
-->