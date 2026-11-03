# 线下投票录入Object.assign致remark污染表决意见
太仓G端一般/业主/选项表决的VoteRangeDialog打开线下录入时若整行Object.assign会带入remark到表决意见。

## 问题根因
- 打开弹框执行this.form=Object.assign({},this.dialogForm)会把决策范围行remark（如账户号或20240329）拷进「表决意见」
- 用户未输入却显示奇怪默认值，根因为范围行remark与表单字段同名

## 修复约定
- 打开时只带入房屋维度字段（小区、幢号、单元、面积等）
- 表决意见、决策人、证件号、手机号、签字等保持空
- decisionCommon、ownerDecision、optionDecision三处VoteRangeDialog.vue同步修改

## 验证与归属
- 验证：会话7f01db0d一般表决详情线下弹框表决意见默认20240329
- 涉及文件：decisionCommon/components/VoteRangeDialog.vue、ownerDecision/components/VoteRangeDialog.vue、optionDecision/components/VoteRangeDialog.vue
- 所属项目：太仓G；来源会话：7f01db0d-5c85-4ac0-a81f-2cca268fc30d；代码基线：2ded8f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "offline_remark_pollution",
  "source_extraction_id": "e6df2aa1bd8d4f0c96d35ad0e13bd80a",
  "version": 1,
  "memory_type": "entities"
}
-->