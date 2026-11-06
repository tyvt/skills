# 报事报修工单详情页实现
产品2.0 项目完成报事/报修工单详情页的完整实现，涵盖三段式布局与多项功能。

## 页面结构
- `detail.vue` 采用三段式布局：顶部栏（标题+状态标签+返回/编辑/保存）、主体区（左侧基本信息/工单内容/任务进度 + 右侧 AI 知识库，仅报事工单待处理/处理中显示）、底部操作栏按工单状态（ORDER_STATUS 常量）动态展示按钮：待受理(1)受理/退单；待处理(2)回复/转办/催办/退单；处理中(3)回复/转办/催办/完成/退单；已关闭(4)/已退回(5)无。报修工单待处理/处理中将回复替换为「+添加进度」且不显示转办。按钮样式：回复橙(warning)/转办浅蓝/催办粉红/退单浅灰/完成绿。

## 功能实现
- 基本信息可编辑字段与新增一致：物业管理区域、工单分类、报事/报修内容、报事/报修人、联系电话、附件（最多 5 个，单文件 5MB）
- `WorkOrderProgress.vue` 时间线展示操作人、角色、动作类型、可见性、时间、进度内容与附件缩略图、知识库引用标题、预警提示（`alertWarning`）及「转入 AI 知识库」按钮（`canTransferToKB`）
- `WorkOrderActionDialog.vue` 统一处理受理（`/property/workOrder/order/{id}/accept`）、回复（`/property/workOrder/order/{id}/reply`）等操作与弹窗

## 涉及文件
- `detail.vue`、`WorkOrderProgress.vue`、`WorkOrderActionDialog.vue`、`constants.js`、`src/views/property/workOrder/order/components/enums.js`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：3bfc9952-dccf-4c5b-a3f2-5a1ce6230d2c；新增按钮状态逻辑来源会话：346ed707-323c-469b-a3f4-390b4107d074；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_detail_impl",
  "source_extraction_id": "adcae344ee4b4720a5c42b11e5cf062c",
  "version": 2,
  "memory_type": "entities"
}
-->