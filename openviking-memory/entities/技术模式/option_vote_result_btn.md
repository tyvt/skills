# 表决结果按钮无状态限制致未开始显示
太仓G端 optionDecision/detail.vue 表决结果按钮无状态限制，未开始表决也渲染。

## 问题根因
- 「表决结果」按钮无状态/日期限制，未开始表决也渲染
- 结果维护未限制已结束且实际结束（非提前结束）

## 修复约定
- 仅表决已开始（进行中/延期/已结束或已过开始日期）显示按钮
- 结果维护限已结束且实际结束（非提前结束）

## 验证与归属
- 验证证据：会话 6916310e 用户报表决结果按钮误显示
- 涉及文件：optionDecision/detail.vue、ownerDecision/detail.vue、sortDecison/detail.vue、optionDecision/components/MaintainResultDialog.vue、api/estate/ownerDecision.js、decisionCommon/components/MaintainResultDialogLite.vue、mixins/detailMixins.js、components/OperationContainer/index.vue
- 所属项目：太仓G；来源会话：6916310e-241a-4a0c-b811-df4a25b8ae2d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_vote_result_btn",
  "source_extraction_id": "e9a04a7ca7ea43b78112ca9bdb68496f",
  "version": 1,
  "memory_type": "entities"
}
-->