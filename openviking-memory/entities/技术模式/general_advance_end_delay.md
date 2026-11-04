# 一般表决延期后提前结束按钮缺失修复
太仓G端一般表决详情页在表决延期后「提前结束」按钮消失，需将延期状态纳入显示条件。

## 问题根因
- 一般表决详情页「提前结束」按钮原仅在 decisionState == '2'（选举中）时显示
- 延期后状态变为 decisionState == '5'（延期），条件不再满足，按钮被隐藏

## 修复方案
- 与业主决策、选项决策、维修决策页面保持一致，延期状态也允许提前结束
- 按钮条件改为 `isSubmittedBiz && (form.decisionState == '2' || form.decisionState == '5') && checkPermission(['estate:generalDecision:advanceEnd'])`
- 需具备 `estate:generalDecision:advanceEnd` 权限，刷新后延期状态可见按钮

## 验证与归属
- 验证证据：会话 5498a264 用户报延期后无提前结束按钮，修复后正常
- 涉及文件：zhi1-web-admin/src/views/estate/generalDecision/detail.vue、ownerDecision/detail.vue
- 所属项目：太仓G；来源会话：5498a264-de28-46af-8525-e64606a2220e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_advance_end_delay",
  "source_extraction_id": "e10f5b85e1b24318b239ba222491d390",
  "version": 1,
  "memory_type": "entities"
}
-->