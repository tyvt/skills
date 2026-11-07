# 详情页留白白名单遗漏表格与zs-form缺16px
苏州市房地产监测V3 中将水平留白从 `.collapse-content` 移至直接子元素白名单后，`sub-container` 与 `zs-form` 未纳入致左右 16px 缺失。

## 问题影响
- 水平留白从 `.collapse-content` 移至直接子元素白名单后，`sub-container` 与 `zs-form` 未纳入致左右 16px 缺失
- `brand/detail` 查看态 `FORM_COL_THREE` 与 `HALF_LAYOUT` 不一致待确认

## 修复建议
- 应于 `index.scss` 白名单补充上述选择器
- 核对 `companyScheme` 编辑态留白

## 涉及文件
- `src/styles/detail-form.scss`
- `src/components/Headline/index.vue`
- `src/styles/index.scss`
- `src/views/company/companyScheme/detail.vue`
- `src/views/company/companyManagement/components/AgencyBasicInfoForm.vue`
- `src/views/company/brand/detail.vue`
- `src/views/repairFunds/finance/rec/detail.vue`
- `src/components/detail-template/detail-template.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/172.md
- 来源会话ID：e0841e83-95db-4936-a337-ee597853b74f
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_whitespace_whitelist",
  "source_extraction_id": "295ffa7531404838aa299598fc454f39",
  "version": 1,
  "memory_type": "entities"
}
-->