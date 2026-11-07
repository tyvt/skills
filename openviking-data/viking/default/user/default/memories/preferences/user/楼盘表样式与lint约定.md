- 楼盘表去除 `.building-container` 局部滚动并改用 `.detail-container:has(> .building-detail)` 时，全局 `> .building-detail` 须收窄为 `.building-container` 避免误伤其他详情页。
- 图例 `.status` 绝对定位与固定 `padding-top: 40px` 换行会压住表头或阻挡点击，需警惕。
- ESLint 须用 `npx eslint src/views/projectManagement/buildingTable/index.vue` 单文件校验。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "楼盘表样式与lint约定",
  "source_extraction_id": "a1bb09cd0fd245b4b98b96ea8c318b1a",
  "version": 1,
  "memory_type": "preferences"
}
-->