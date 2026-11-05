# 添加巡检记录三步向导且数据不丢
`add.vue` 实现选程序、管步骤、填信息三步向导，动态切换字段且步骤间数据不丢。
## 实现逻辑
- `add.vue` 实现三步向导（选程序、管步骤、填信息），经 `type` 动态切换字段。
- 步骤间数据不丢。
- Step 1 选程序→「下一步」（未选程序时按钮禁用）；Step 2 管步骤列表→「下一步」；Step 3 填频次/日期/结果→「提交」，各步支持「上一步」。
- `editStep.vue` 底部三按钮：删除 / 确认 / 取消。
## 数据传递
- `editStep.vue` 借 `uni.setStorageSync` 传参。
- 借 `uni.$emit('recordStepSaved')` 回传数据。
- `pages.json` 注册 `record/editStep` 路由。
## 验证与归属
- 验证证据：src=泰兴小程序/018.md
- 涉及文件：src/staff/pages_facility/record/add.vue、src/staff/pages_facility/record/detail.vue、src/staff/pages_facility/repair/add.vue、src/staff/components/PageButton/PageButton.vue、src/pages.json、src/staff/api/maintenance.js、src/staff/pages_facility/repair/submit.vue、src/staff/pages_facility/record/editStep.vue
- 来源会话ID：81f4c5db-d6ab-4997-8c61-67a131a447db
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_wizard_persist",
  "source_extraction_id": "2762fdd53c074d90b150c24c3dcb49e4",
  "version": 2,
  "memory_type": "entities"
}
-->