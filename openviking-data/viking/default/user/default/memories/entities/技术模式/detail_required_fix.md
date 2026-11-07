# 详情页必填星号移除修复
苏州市房地产监测V3 中详情查看态不再显示必填星号，从 3 个文件的 DetailTemplate 移除 `required: true`。

## 修改内容
- `personnelCertificate/detail.vue` 移除 9 个字段（姓名、身份证号、资格证书类型等）的 `required: true`
- `brand/detail.vue` 移除 1 个字段（品牌名称）的 `required: true`
- `auxiliaryProject/detail.vue` 移除 10 个字段（`contentInfo` 4 个 + `facilityInfo` 6 个）的 `required: true`
- 各页 `rules` 校验规则未改动，编辑/新增态的 `zs-form-item` 必填星号与校验提示保持原样

## 验证与归属
- 验证：ESLint 对 3 个修改文件检查通过；刷新专业资格证书详情页（查看态）标签旁不再出现红色 `*`
- 所属项目：苏州市房地产监测V3
- 涉及文件：`personnelCertificate/detail.vue`、`brand/detail.vue`、`auxiliaryProject/detail.vue`、`src/styles/index.scss`
- 来源会话ID：99e93fa9-bdba-48d1-9456-be2dc7b45c5f
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_required_fix",
  "source_extraction_id": "1b437f2445fb45d88bc3adbd9f0c4f74",
  "version": 1,
  "memory_type": "entities"
}
-->