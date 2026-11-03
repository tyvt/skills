- 在抽屉/Tab 场景下，el-table 弃用固定 `height`，改用 `:max-height="tableHeight"`（例如 498px）配合 `min-height` 控制滚动与视觉高度
- 固定 `height` 模式在抽屉/Tab 场景偶发失效，会使 `el-table__body-wrapper` 算为 60px 仅显示 1 行
- 涉及文件：src/components/zsTable/index.vue
- 验证证据：extracted source=cursor session=3c990bfb-c5a1-4b06-bb39-987a92e330d0；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "el-table高度控制偏好",
  "source_extraction_id": "70429609d7f44112b948f3d4f2290246",
  "version": 1,
  "memory_type": "preferences"
}
-->