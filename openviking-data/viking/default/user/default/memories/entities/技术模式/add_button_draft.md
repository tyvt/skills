# 新增按钮仅草稿态显示
太仓G 一般表决、选项表决、业委会选举的「新增」按钮原与昆山逻辑不一致，已改为仅在业务状态为草稿（`bizState == '0'`）时显示，备案后隐藏。

## 问题根因
- 「新增」按钮条件缺少 `bizState` 判断，备案后（bizState == '2'）仍显示灰色禁用按钮，与昆山行为不一致

## 修复内容
- `decisionCommon/DecisionRangeTable.vue`：条件由 `v-if="showAdd"` 改为 `v-if="showAdd && bizState == '0'"`，备案后直接隐藏
- `optionDecision/DecisionRangeTable.vue`：「新增」增加 `v-if="bizState == '0'"`，备案后隐藏
- `generalDecision/detail.vue`：`:show-add="mainCardValue == 0 && form.bizState == '0'"`
- `ownerDecision/detail.vue`：`:show-add="mainCardValue == 0 && isMaintainVote && form.bizState == '0'"`

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：`decisionCommon/DecisionRangeTable.vue`、`optionDecision/DecisionRangeTable.vue`、`generalDecision/detail.vue`、`ownerDecision/detail.vue`
- 所属项目：太仓G；来源会话：89bb77f4-3a29-4d39-a60c-9a379a96022d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "add_button_draft",
  "source_extraction_id": "9ee9055e33c847f9aa90f22112539d10",
  "version": 1,
  "memory_type": "entities"
}
-->