- 变更备案详情页统一使用 label-position="left" 布局（toB/companyRecord/detail.vue、toB/agencyRecord/detail.vue 等四个页面均由 right 改为 left）
- zs-form.vue 在 detail-from-container 场景下仅当显式传入 label-position="left" 才透传 left 并保留 labelWidth（默认 auto），其余详情页强制 top 并去掉 labelWidth
- 详情页 label-left 表单项标签左对齐；非 top/left 的表单仍右对齐标签文字（detail-form.scss 仅对 .el-form--label-top 应用纵向叠放）

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "变更备案详情页 label-position 样式",
  "source_extraction_id": "be7672727b634a8682ba3089a6a14c21",
  "version": 1,
  "memory_type": "preferences"
}
-->