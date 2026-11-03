# Add Btn Draft Only
决策范围新增按钮原仅依赖 showAdd 控制，未校验业务状态，致备案态（bizState=='2'）残留显示。

## 约束逻辑
- 在 decisionCommon/DecisionRangeTable.vue 与 optionDecision/DecisionRangeTable.vue 追加 v-if="bizState == '0'"。
- 于 generalDecision/detail.vue、ownerDecision/detail.vue 的 :show-add 绑定追加 form.bizState == '0' 限制。

## 验证与归属
- 验证证据：extracted source=cursor session=89bb77f4-3a29-4d39-a60c-9a379a96022d
- 涉及文件：estate/decisionCommon/components/VoteViewLite.vue、昆山/src/views/estate/optionDecision/components/VoteView.vue、optionDecision/detail.vue、optionDecision/components/VoteView.vue、昆山/src/views/estate/optionDecision/detail.vue、api/estate/ownerDecision.js、昆山/src/api/estate/ownerDecision.js、昆山/src/views/estate/optionDecision/components/DecisionRangeTable.vue
- 所属项目：太仓G/昆山；来源会话：89bb77f4-3a29-4d39-a60c-9a379a96022d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "add_btn_draft",
  "source_extraction_id": "753a048e5c3947b4b939168968e98562",
  "version": 1,
  "memory_type": "entities"
}
-->