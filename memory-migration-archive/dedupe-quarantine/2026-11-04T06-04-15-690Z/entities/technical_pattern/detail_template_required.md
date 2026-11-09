# DetailTemplate必填星号误显
`DetailTemplate` 数据含 `required: true` 使查看态渲染必填星号。

## 问题根因
- `personnelCertificate/detail.vue`、`brand/detail.vue`、`auxiliaryProject/detail.vue` 的 `DetailTemplate` 含 `required: true`
- 查看态错误显示必填星号

## 修复方案
- 移除三文件 `DetailTemplate` 中 `required: true`
- 保留 `rules` 校验，编辑/新增态行为不变

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/044.md
- 涉及文件：zhi2-web-admin/src/views/company/personnelCertificate/detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：99e93fa9-bdba-48d1-9456-be2dc7b45c5f；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "detail_template_required",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 1,
  "memory_type": "entities"
}
-->