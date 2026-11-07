# 选项表决详情操作区 show-icon 绑定过窄
太仓G端选项表决详情 DecisionRangeTable 顶部操作区因 show-icon 只绑基本信息 Tab 而在投票信息 Tab 整行隐藏。

## 问题描述
- optionDecision/detail.vue 中 `:show-icon="mainCardValue == 0"`，切到「投票信息」主 Tab（mainCardValue===1）时 DecisionRangeTable 操作区被 `v-if="showIcon"` 关掉
- 「导出」「线下投票录入」等即使 show-vote 为 true 也不渲染

## 修复约定
- 操作区在两 Tab 均需展示时写 `mainCardValue == 0 || mainCardValue == 1`，或抽计算属性表达「决策明细 Tab 可见」

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 35795d81 用户报选项表决详情线下投票和导出按钮不见，根因 show-icon 与 mainCardValue 绑定过窄
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue
- 所属项目：太仓G；来源会话：35795d81-ec7d-4058-baa4-9e944062ac4e；代码基线：2ded8f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_decision_showicon_tab",
  "source_extraction_id": "9f1553d11e6748dbbd5b1e168b4a4daf",
  "version": 1,
  "memory_type": "entities"
}
-->