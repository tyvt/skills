# 选项表决结论维护占比小数位修复
太仓G 选项表决「表决结论维护」弹窗中参与户数占比、参与面积占比因浮点除法直接赋值而显示过长小数位，已修复为保留两位小数。

## 问题根因
- MaintainResultDialogLite.vue 的 getChartResult 中，参与户数占比和参与面积占比由浮点除法直接赋值（如 5/17*100 得 29.411764705882353）
- v-money:2 指令仅在输入框初始化时格式化，异步赋值后不会再次处理，导致长小数位显示

## 修复方案
- 与 VoteViewLite.vue 保持一致，在赋值时用 .toFixed(2) 保留两位小数
- partRoomPercent = totalHouseNum ? (voteHouseNum/totalHouseNum*100).toFixed(2) : '0.00'
- participatePercent = totalWeight ? (voteWeight/totalWeight*100).toFixed(2) : '0.00'

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/MaintainResultDialogLite.vue、optionDecision/detail.vue
- 所属项目：太仓G；来源会话：49431e85-bfc6-4d6e-af77-ea4dad165a1a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintainresultlite_decimal",
  "source_extraction_id": "8b0f5f72e9164350b1b5bfb2da20cbfe",
  "version": 1,
  "memory_type": "entities"
}
-->