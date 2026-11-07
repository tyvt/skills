# 预售流程查看按钮错位及冗余审批记录
在苏州V3房地产监测系统的预售中，«流程查看»按钮错位且审批记录块冗余。

## 问题
- 在 `OperationBtnGroup/index.vue` 中的 «流程查看» 按钮位置不正确
- 详情页面底部的审批记录块冗余

## 解决方案
- 将按钮移动到 «返回» 之后，并添加了 `data-testid="flow-view-btn"`
- 五个详情页面使用 `:show-audit="showFlowViewButton"` 进行条件渲染，以替代固定块

## 文件与验证
- 涉及文件: `OperationBtnGroup/index.vue`, `OperationContainer/index.vue`, `stock/contract/detail.vue`, `OperationBtnGroup/attachmentDraw.vue`, `presale/cashsale/components/CashsaleDetail.vue`, `presale/permitExtend/detail.vue`, `presale/permitCancel/detail.vue`, `presale/permit/components/detail.vue`
- 验证证据: src=苏州市房地产监测V3/081.md
- 会话: 3042833a-7ef3-4a0c-a806-d3d5885f5ff1; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：3042833a-7ef3-4a0c-a806-d3d5885f5ff1


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_flow_btn_misalign",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 1,
  "memory_type": "entities"
}
-->
