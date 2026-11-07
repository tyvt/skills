# 线下投票弹框误显决策范围remark为表决意见
太仓G端一般表决详情点「线下投票录入」时，弹框把整行决策范围数据复制进表单，范围记录的 `remark` 字段被误当作「表决意见」显示。

## 问题根因
- 弹框打开时 `this.form = Object.assign({}, this.dialogForm)` 复制整行决策范围数据
- 决策范围记录含 `remark` 字段（范围备注），与弹框「表决意见」字段同名
- 范围行 `remark` 值为 `20240329`，被误显示为表决意见

## 修复方案
- 调整 `VoteRangeDialog` 打开逻辑：线下录入只带入房屋信息（小区、幢号、单元、面积等）
- 表决意见、决策人、证件号、手机号、签字等字段保持为空

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 7f01db0d 用户反馈线下表决弹框「表决意见」未输入却显示内容
- 涉及文件：`decisionCommon/components/VoteRangeDialog.vue`、`ownerDecision/components/VoteRangeDialog.vue`、`optionDecision/components/VoteRangeDialog.vue`
- 所属项目：太仓G；来源会话：7f01db0d-5c85-4ac0-a81f-2cca268fc30d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "offline_vote_remark_field",
  "source_extraction_id": "d4d8cd2912bd44b5966e096f7fc2c02d",
  "version": 1,
  "memory_type": "entities"
}
-->