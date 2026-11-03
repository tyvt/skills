# 选项表决结论弹窗浮点直赋未格式化致占比长小数
MaintainResultDialogLite.vue 的 getChartResult 中浮点除法直接赋值，且 v-money:2 仅初始化时格式化、异步赋值后不处理，导致选项表决占比出现长小数。

## 问题根因
- MaintainResultDialogLite.vue 的 getChartResult 浮点除法结果直接赋值，未保留小数位
- 指令 v-money:2 仅在初始化时格式化，异步赋值后不重新处理

## 解决方案
- 赋值时用 .toFixed(2) 保留两位小数，写法同 VoteViewLite.vue

## 验证与归属
- 验证证据：extracted source=cursor session=49431e85-bfc6-4d6e-af77-ea4dad165a1a
- 涉及文件：optionDecision/detail.vue、decisionCommon/components/MaintainResultDialogLite.vue、optionDecision/components/MaintainResultDialog.vue、ownerDecision/components/MaintainResultDialog.vue、optionDecision/components/VoteView.vue、directives/formatter/money.js、decisionCommon/components/VoteViewLite.vue、decisionCommon/components/MaintainResultDialog.vue
- 所属项目：太仓G；来源会话：49431e85-bfc6-4d6e-af77-ea4dad165a1a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintainresultdialog_lite_float",
  "source_extraction_id": "dee365f6667649d6b5647eae46defd78",
  "version": 1,
  "memory_type": "entities"
}
-->