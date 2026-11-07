- 删除 API 封装文件（如 `src/api/company/agencyBranch.js`、`src/api/company/agencyPersonnel.js`、`src/api/company/brand.js`），各组件改为直接使用 `this.$post` 调用接口
- 调用方式需与项目中其他页面（如 `chargeItem/index.vue`）保持一致

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "前端API调用偏好",
  "source_extraction_id": "e2fc3a0a8baf4ebcbf2187730ca68c17",
  "version": 1,
  "memory_type": "preferences"
}
-->