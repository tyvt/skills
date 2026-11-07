# Company List Date Span Limit 2 Days
In SuzhouHousingG `companyListQuery.js`, date span restricted to 2 days with overdue dates greyed out.
## Change
- Constant `TWO_YEARS_MS` changed to `TWO_DAYS_MS`; anchor on first selected day.
- Dates diff >2 days greyed out; search validation prompts "更新时间跨度最多可选择2天".
- 6 Vue pages sharing util auto-affected; trust/index.vue without `enableAdvancedQuery` has no filter, but limited after enabling.
## Involved Files
- `src/utils/companyListQuery.js`
- `src/views/company/companyManagement/property/index.vue`, `components/index.vue`, `change/index.vue`, `trust/index.vue`
- `src/views/company/companyRegister/index.vue`, `src/views/company/staffManagement/components/index.vue`
## Verification
- Source: 苏住房G/063.md; session 84fe40ac-f546-41bc-9d7e-76bd876f4594.

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：84fe40ac-f546-41bc-9d7e-76bd876f4594


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "company_list_date_span_2days",
  "source_extraction_id": "fcb70580f7074a5e8c518d8c5fbf82b4",
  "version": 1,
  "memory_type": "entities"
}
-->
