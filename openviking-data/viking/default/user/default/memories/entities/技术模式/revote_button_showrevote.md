# 重新发起表决按钮状态限制
太仓G 业委会选举表决详情在未开始状态下误显示「重新发起表决」按钮，已修复为仅在表决结束后才显示。

## 问题根因
- 「重新发起表决」按钮缺少状态判断，未开始或正在进行时也会显示

## 修复内容
- 为「重新发起表决」增加 `showRevote` 判断：仅在表决已结束（`decisionState === '3'`）且有表决结果时才显示
- 修改涉及 4 个详情页：`ownerDecision/detail.vue`（保留 `isMaintainVote` 限制）、`maintainDecision/detail.vue`、`sortDecison/detail.vue`、`generalDecision/detail.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：`ownerDecision/detail.vue`、`maintainDecision/detail.vue`、`sortDecison/detail.vue`、`generalDecision/detail.vue`
- 所属项目：太仓G；来源会话：01a8eeed-a239-440f-a22a-c0d4d152ab18；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "revote_button_showrevote",
  "source_extraction_id": "9ee9055e33c847f9aa90f22112539d10",
  "version": 1,
  "memory_type": "entities"
}
-->