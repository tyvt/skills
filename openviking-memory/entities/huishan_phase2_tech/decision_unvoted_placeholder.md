# 非必填议题未投票显示「暂未选择」
惠山二期H5 多议题表决模块按 UI 要求，非必填且未投票时在查看选择处统一显示「暂未选择」。

## 修改说明
- ViewOptionsList.vue（mode=view / DecisionResult 列表）单选多选无已选且 decisionRequired != '1' 时展示「暂未选择」，必填仍用「暂无」
- DescribePopup.vue 新增 readOnly 属性，由 ViewOptionsList 在 isVotedOrResult 时传入
- 只读且当前议题无已选选项时，「投票选项」下展示「暂未选择」（非必填）或「暂无」（必填）

## 验证建议
- 打开多议题表决→我的决策，找无红色 * 且未投议题确认「我的选择」为「暂未选择」
- 点查看说明确认「投票选项」为「暂未选择」
- 已投票或必填未投展示应与原逻辑一致

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：ViewOptionsList.vue、DescribePopup.vue、multipleForm.vue
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）
- 来源会话ID：ea6407fc-4a97-464f-86b5-f338dfb9dbb6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "decision_unvoted_placeholder",
  "source_extraction_id": "079561c593f04c1e850fa705e0d082e1",
  "version": 1,
  "memory_type": "entities"
}
-->