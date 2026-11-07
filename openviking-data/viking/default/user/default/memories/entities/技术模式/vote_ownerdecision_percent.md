# 业委会选举与维修资金结论弹窗占比小数位修复
太仓G 业委会选举表决与维修资金表决的维护结论弹窗中，参与户数占比、参与面积占比因浮点除法直接赋值而显示过长小数位，已修复为保留两位小数。

## 问题根因
- decisionCommon/components/MaintainResultDialog.vue 的 getChartResult 方法中，占比字段直接做除法赋值，未格式化为两位小数
- 原显示示例：参与户数占比 1.1764705882352942 %、参与面积占比 2.102845991765255 %

## 修复方案
- 业委会选举表决（vote 路由）维护结论弹窗中，参与户数占比、参与面积占比等字段统一用 .toFixed(2) 保留两位小数
- 与同目录下 MaintainResultDialogLite.vue 的写法保持一致
- 顺带修复维修资金表决分支及 ownerDecision/components/MaintainResultDialog.vue 中的同类问题

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 修复后显示示例：参与户数占比 1.18 %、参与面积占比 2.10 %
- 涉及文件：decisionCommon/components/MaintainResultDialog.vue、MaintainResultDialogLite.vue、ownerDecision/components/MaintainResultDialog.vue
- 所属项目：太仓G；来源会话：c417adbb-668c-4e2f-84da-b9c333bc22dc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_ownerdecision_percent",
  "source_extraction_id": "742ed8116127406da6d8f6fc1bd10278",
  "version": 1,
  "memory_type": "entities"
}
-->