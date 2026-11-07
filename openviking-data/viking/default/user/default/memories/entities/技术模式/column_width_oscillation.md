# zs-table 列宽抖动修复
苏州市房地产监测V3 修复 zs-table / zs-table-column 在大分辨率/高 DPI/系统缩放下列宽「一直跳」的问题。

## 问题根因
- 列表用封装的 `zs-table` / `zs-table-column`（智能列宽 + 剩余宽度均分）
- `zs-table-column` 每次 Vue `updated()` 重新用 DOM 量列宽，量完 `doLayout()`，父表再 `distributeRemainingWidth()` 拉伸，布局变化又触发子列 `updated()`，形成闭环
- 大分辨率/高 DPI/系统缩放下 `getBoundingClientRect()` 常在亚像素边界来回变 1px，列宽肉眼可见地抖动

## 修改内容
- `zs-table-column.vue`：去掉 `updated()` 全量 DOM 量测（打断反馈环），仅在挂载、表格数据引用变化、字典/选项变化时量测
- 列宽对齐到偶数像素 + 2px 容差，避免 1px 振荡；合并 `requestAnimationFrame` 避免同帧多次量测
- 字典异步加载完成后补一次量测（避免状态列偏窄）
- `zs-table.vue`：用稳定的 `floor(getBoundingClientRect().width)` 计算可分配宽度

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zs-table-column.vue`、`zs-table.vue`
- 所属项目：苏州市房地产监测V3
- 来源会话ID：f256b057-029c-4ddc-84b5-b6e65fa514cf

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "column_width_oscillation",
  "source_extraction_id": "f16b3953e23c43639f5b40170e496d0f",
  "version": 1,
  "memory_type": "entities"
}
-->