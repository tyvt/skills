# 服务方案详情三列布局调整
苏州市房地产监测V3 在 `companyScheme/detail.vue` 完成服务方案基本信息三列布局实现。

## 编辑态
- 使用全局 `section-form` / `section-field` / `section-field--full` 三列栅格
- 字段顺序：服务方案名称 → 对应机构 → 收费类型 → 收费标准 → 服务内容（整行）
- 去掉页面内重复 2 列栅格样式，`label-position` 改为 `left`

## 查看态
- `detailItems` 使用 `FORM_COL_THREE` / `FORM_COL_FULL`，宽屏前三项一行三列
- 「服务内容」由 `richtext` 改为 `textarea`，避免 `v-html` 风险

## 涉及文件
- `src/views/company/companyScheme/detail.vue`
- `src/styles/detail-form.scss`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：3186cfc4-7158-4eb1-b135-f23262301582
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_scheme_layout",
  "source_extraction_id": "2ba2686ff52a4d9c9c970639d6f824f6",
  "version": 1,
  "memory_type": "entities"
}
-->