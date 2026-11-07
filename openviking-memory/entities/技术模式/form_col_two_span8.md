# FORM_COL_TWO 转换为 span8 占据 1/3 宽度
在项目 苏州市房地产监测V3 中，`FORM_COL_TWO` (span=12) 在 `DetailTemplate` 内被 `normalizeDetailSpan` 转换为 span=8，仅占据 1/3 的宽度。

## 问题根因
- `normalizeDetailSpan` 在 `DetailTemplate` 中将 `FORM_COL_TWO` (span=12) 转换为 span=8
- 这导致布局仅占据 1/3 宽度，而非一半

## 解决方案
- 在 `developerBasicInfoContent.js` 的 `buildOfficeContentInfo` 中，办公地址布局改为使用 `FORM_COL_WIDE` (span=16) 以占据两列

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：9ec6ae3b-87cf-4803-bc6c-838d26b02903
- 验证证据: src=苏州市房地产监测V3/293.md
- 涉及文件: developerBasicInfoContent.js, detailLayout.js, DeveloperBasicInfoForm.vue, detail-template.vue, agencyBasicInfoContent.js, detail-form.scss
- 所属项目: 苏州市房地产监测V3; Session: 9ec6ae3b-87cf-4803-bc6c-838d26b02903; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_col_two_span8",
  "source_extraction_id": "ea52cb840c62465ab3fb0dba5f6a6e78",
  "version": 2,
  "memory_type": "entities"
}
-->