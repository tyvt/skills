- 在 `buildingTable/index.vue` 中，避免具有绝对定位且固定 `padding-top: 40px` 的 `.status` 在图例换行时遮挡表头；调整布局
- 将全局选择器 `.detail-container:has(> .building-detail)` 限制为 `.building-container`，以免影响其他详情页面
- 对单个文件执行 lint（`npx eslint src/views/projectManagement/buildingTable/index.vue`），以避免整体扫描被中断

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 建筑物表格布局",
  "source_extraction_id": "804f3591fe264d2e93c18d6c856df3ec",
  "version": 1,
  "memory_type": "preferences"
}
-->
