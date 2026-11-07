# 维修项目决算费用明细接口对接
泰兴小程序维修项目决算费用明细页原无接口，已新增 `selectFinalFeeList` 接口对接并移除 Mock。

## 改动要点
- `maintainProject.js` 新增 `selectFinalFeeList`：`GET /maintenance/miniapp/owner/selectFinalFeeList`，参数 `{ projectNo }`。
- 新增 `mapFinalFeeVoToRow` / `mapFinalFeeList` 将 `FinalFeeVo` 映射为页面卡片字段；`fetchFinalCostDetail(projectNo)` 改为真实接口调用，移除 Mock。
- 单位类型支持 `organ_type` 字典回显；图标按「施工/鉴定/审计/其他」关键字匹配。

## 页面适配
- `final-cost-detail.vue` 参数改为 `projectNo`（兼容旧 `projectId`），按项目编号请求列表。
- `object-detail.vue` 「决算总费用」跳转改为只传 `projectNo`，与施工管理、竣工验收一致。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`maintainProject.js`、`final-cost-detail.vue`、`object-detail.vue` 等。
- 来源会话ID：0f870c8e-b6a8-4a79-9313-486d33650ad4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "final_fee_api_integration",
  "source_extraction_id": "73b155aac32a4c42aabee05de66ae54e",
  "version": 1,
  "memory_type": "entities"
}
-->