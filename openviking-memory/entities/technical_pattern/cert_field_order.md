
# 不动产权证三视图字段顺序按标注重排
苏州市房地产监测V3 中依图片标注编号调整不动产权证三视图查看态与编辑表单字段顺序。

## 变更内容
- 调整 `ProjectStateLandLicPanel.vue`、`stateLandLic/detail.vue` 与 `stateLandLic/changeDetail.vue` 的查看态 `contentInfo` 及编辑表单字段顺序
- 统一为项目名称至发证日期等序
- `changeDetail.vue` 附图及变更原因仍置末

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/301.md
- 涉及文件：ProjectStateLandLicPanel.vue、stateLandLic/detail.vue、stateLandLic/changeDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：7128e0f4-00dc-4df9-8734-952fe4c706d3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "cert_field_order",
  "source_extraction_id": "1b549fb6f5f74e96a56ee33f14963762",
  "version": 1,
  "memory_type": "entities"
}
-->