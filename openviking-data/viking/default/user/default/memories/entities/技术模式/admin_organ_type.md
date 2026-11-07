# 因缺少 organType 导致人员字段隐藏和保存不完整
`companyAdmin/detail.vue` 依赖 `form.organType` 来显示人员字段；没有 `organType` 的界面会隐藏它们，并且 `getForm()` 忽略了 `personnelType` 等字段。

## 问题根因
- `companyAdmin/detail.vue` 中的 `isAgency` 依赖 `form.organType` 来显示人员字段
- 没有 `organType` 的界面导致隐藏；`getForm()` 未保存 `personnelType` 及其他字段

## 解决方案
- 添加 `showAgencyFields` 作为回退方案，统一表单和验证
- `getForm()` 开始填充 `personnelCode`、`personnelType`、`householdAddress`

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/118.md
- 涉及文件: companyAdmin/detail.vue, companyOrganContext.js, companyOrgan.js, operator/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 1aa60fcd-fb6c-40ed-85a3-935deaae7e9d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_organ_type",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->