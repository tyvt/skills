- 工单的 detail.vue 页面采用三部分布局：顶部栏、主区域和底部栏
- 底部操作栏根据后端返回的权限字段动态显示按钮
- 任务进度通过 WorkOrderProgress.vue 以时间线形式展示
- 工单操作由 WorkOrderActionDialog.vue 组件统一处理，该组件调用如 /property/workOrder/order/{id}/accept 的 API
- 在 cursor 会话中验证：3bfc9952-dccf-4c5b-a3f2-5a1ce6230d2c

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "服务单详情页面布局",
  "source_extraction_id": "738f08956f814c1794657ebf13c3e648",
  "version": 1,
  "memory_type": "preferences"
}
-->
