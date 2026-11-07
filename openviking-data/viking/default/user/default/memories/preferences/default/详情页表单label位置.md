- 变更备案类详情页（toB/companyRecord/detail.vue、toB/agencyRecord/detail.vue 等四个页面）表单 label-position 由 right 改为 left，标签左对齐。
- zs-form.vue 在 detail-from-container 场景下仅当显式传入 label-position="left" 时透传 left 并保留 labelWidth（默认 auto），其余详情页仍强制 top 并去掉 labelWidth。
- 全局样式：详情里 label-left 表单项标签左对齐；非 top/left 的表单仍右对齐标签文字；「标签在上」叠放样式仅作用于 .el-form--label-top，避免把 label-left 打成纵向布局。

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "详情页表单label位置",
  "source_extraction_id": "ef4db781436145ec93f7842d9de5a47f",
  "version": 1,
  "memory_type": "preferences"
}
-->