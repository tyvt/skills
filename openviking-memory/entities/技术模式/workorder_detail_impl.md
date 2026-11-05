# 报事报修工单详情页实现
产品2.0 项目完成报事/报修工单详情页的完整实现，涵盖三段式布局与多项功能。

## 页面结构
- `detail.vue` 采用三段式布局：顶部栏（标题+状态标签+返回/编辑/保存）、主体区（左侧基本信息/工单内容/任务进度 + 右侧 AI 知识库，仅报事工单待处理/处理中显示）、底部操作栏（按后端权限动态展示按钮）

## 功能实现
- 基本信息可编辑字段与新增一致：物业管理区域、工单分类、报事/报修内容、报事/报修人、联系电话、附件（最多 5 个，单文件 5MB）
- `WorkOrderProgress.vue` 时间线展示操作人、角色、动作类型、可见性、时间、进度内容与附件缩略图、知识库引用标题、预警提示（`alertWarning`）及「转入 AI 知识库」按钮（`canTransferToKB`）
- `WorkOrderActionDialog.vue` 统一处理受理（`/property/workOrder/order/{id}/accept`）、回复（`/property/workOrder/order/{id}/reply`）等操作与弹窗

## 涉及文件
- `detail.vue`、`WorkOrderProgress.vue`、`WorkOrderActionDialog.vue`、`constants.js`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：3bfc9952-dccf-4c5b-a3f2-5a1ce6230d2c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_detail_impl",
  "source_extraction_id": "026f3a346695401ebf51e73dd9b49605",
  "version": 1,
  "memory_type": "entities"
}
-->