# 选项表决详情权限前缀错致按钮不显示
太仓G端 optionDecision/detail.vue 按钮权限前缀写死 ownerDecision 致部分按钮缺失，需兼容 optionDecision 前缀。

## 问题根因
- 按钮权限前缀写死 `estate:ownerDecision:*`，缺失「表决状态更新」「表决结果」且提前结束条件过严
- `optionDecision/detail.vue` 未适配自身模块权限串

## 修复约定
- 新增 `hasPerm()` 兼容 `estate:optionDecision:*` 前缀
- 补充缺失按钮（表决状态更新调用 `updateActivation`、表决结果跳转投票信息页签），提前结束支持 `decisionState=='5'`
- 按用户要求未添加「生成表决二维码」按钮（对照昆山参考页）

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 50577729 用户报选项表决详情按钮不显示
- 涉及文件：optionDecision/detail.vue、ownerDecision/detail.vue、decisionCommon/components/VoteViewLite.vue、sortDecison/detail.vue、api/estate/ownerDecision.js、decisionCommon/components/MaintainResultDialogLite.vue、optionDecision/components/DecisionRangeTable.vue、optionDecision/components/VoteResult.vue
- 所属项目：太仓G；来源会话：50577729-472e-46b8-9882-400332133ecd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_decision_permi",
  "source_extraction_id": "d3b28c99a0db46578f9102cf955f5f7e",
  "version": 2,
  "memory_type": "entities"
}
-->