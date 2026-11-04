# Presale Flow Btn
在苏州市房地产监测V3项目中，调整流程查看按钮并统一预售详情页面中的审批记录展示。

## 实现要点
- 在 `zhi2-web-admin/src/components/OperationBtnGroup/index.vue` 中，将 "流程查看" 移动到 "返回" 之后，并添加 `data-testid="flow-view-btn"`。
- 五个详情页面（`presale/permit/components/detail.vue`, `presale/cashsale/components/CashsaleDetail.vue`, `permitExtend/detail.vue`, `permitCancel/detail.vue`, `surveyChange/detail.vue`）移除底部的 "审批记录" 块，并使用 `:show-audit="showFlowViewButton"`（查看状态 + 已保存 + `bizState!=='0'`）。
- 预售许可申请另根据指示移除。

## 涉及文件
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationContainer/index.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/stock/contract/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationBtnGroup/attachmentDraw.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitExtend/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitCancel/detail.vue

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/025.md
- 会话: 3042833a-7ef3-4a0c-a806-d3d5885f5ff1
- 所属项目: 苏州市房地产监测V3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_flow_btn",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 1,
  "memory_type": "entities"
}
-->