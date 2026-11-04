# 选项表决确认页内容空白
太仓一网通办H5 的选项表决在选择决策项后点击下一步，确认页仅显示「我的决策」标题而内容区域为空。

## 问题根因
- StepConfirm.vue 仅实现了一般表决（MAINTAIN）展示逻辑，选项表决（OPTION）无对应模板

## 修复内容
- 新增 selectedOptionItems 计算属性，从 optionGroupList 读取已勾选选项（checked: true）
- 当 decisionType === 'OPTION' 时展示已选决策项名称
- 样式与选择页一致（蓝色边框 + 浅蓝背景）

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/views/owner-decision/components/StepConfirm.vue、src/views/owner-decision/ParticipateIn.vue、src/views/owner-decision/components/OptionStepChoose.vue、src/views/decision/components/StepConfirm.vue
- 所属项目：太仓一网通办H5；来源会话：6eb5120c-c134-4e15-a744-163291e6d855；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_confirm_option_blank",
  "source_extraction_id": "924a0db299a54a6195a4b0d68cc0e945",
  "version": 1,
  "memory_type": "entities"
}
-->