# 业主表决线下录入弹窗未展示户室号
VoteRangeDialog.vue 线下投票录入仅展示幢号与单元，缺失 houseNo 户室号字段。

## 问题根因
- 线下投票录入 VoteRangeDialog.vue 编辑表单与查看模式仅展示幢号与单元，缺失 houseNo 户室号
- 用户无法核对具体户室，录入信息不完整

## 解决方案
- 于编辑表单与查看模式增加只读户室号字段
- 弹窗打开时从 dialogForm.houseNo 赋值该只读字段

## 验证与归属
- 验证：extracted source=cursor session=f0b2e1a4-e0f1-4c1a-8ac5-15136d7182af
- 涉及文件：autonomy/general/components/DecisionRangeTable.vue、autonomy/components/VoteRangeDialog.vue、autonomy/components/DecisionRangeDialog.vue、autonomy/option/components/DecisionRangeTable.vue、property/decision/components/DecisionRangeTable.vue
- 所属项目：泰兴G/zhi2-web-admin；代码基线：none；来源会话：f0b2e1a4-e0f1-4c1a-8ac5-15136d7182af

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_houseno_missing",
  "source_extraction_id": "b6ef5637059a4f3f841af431095bf281",
  "version": 1,
  "memory_type": "entities"
}
-->