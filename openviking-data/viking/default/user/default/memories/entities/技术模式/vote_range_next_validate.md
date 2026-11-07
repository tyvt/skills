# 表决范围弹框下一步未校验必填修复
太仓G端业委会选举表决与共用决策组件的「下一步」未校验表单必填项，点击直接进入下一步。

## 问题根因
- `nextStep` 方法直接执行 `this.active = 1` 进入下一步，未先调用表单校验
- 表单已配置必填规则（policymaker、idNumber、phone、signature），但点击「下一步」未触发校验

## 修复方案
- 在 `nextStep` 中先调用 `this.$refs['form'].validate()`，校验通过后再进入第二步
- 与 `optionDecision` 模块实现保持一致
- 修复后必填未填时显示校验提示且无法进入「候选人选举」步骤

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 81005aa4 用户报没有校验必填就可以点下一步，修复后正常
- 涉及文件：ownerDecision/components/VoteRangeDialog.vue、decisionCommon/components/VoteRangeDialog.vue
- 所属项目：太仓G；来源会话：81005aa4-3a6b-4f6a-9054-7ab69341ff3f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_range_next_validate",
  "source_extraction_id": "e10f5b85e1b24318b239ba222491d390",
  "version": 1,
  "memory_type": "entities"
}
-->