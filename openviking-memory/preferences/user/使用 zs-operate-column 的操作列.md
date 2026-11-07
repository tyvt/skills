- 将待办任务表格中的操作列替换为 `zs-operate-column` 并与列表页面对齐；添加计算属性 `todoOperateButtons`（`permission: false`, `attrs: { type: 'primary', plain: true }`）。
- 将行点击事件绑定到 `handleTodoRowClick` 以避免“处理”按钮和行点击之间对 `handleProcess` 的重复触发；移除未使用的 `.action-btn` 样式。
- 涉及文件: zhi2-web-admin/src/views/home/index-new.vue, syncLog/index.vue, integrationConfig/index.vue, components/zs-operate-column/zs-operate-column.vue, components/zs-button/zs-button.vue, main.js
- 源会话：20fa127f-80b8-45d0-9e77-f3b6b55a7902

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：20fa127f-80b8-45d0-9e77-f3b6b55a7902


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 使用 zs-operate-column 的操作列",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "preferences"
}
-->
