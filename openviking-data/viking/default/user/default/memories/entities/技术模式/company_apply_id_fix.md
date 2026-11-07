# companyApplyId请求体格式修复
苏州市房地产监测V3 中改回使用 `companyApplyId` 并修正 API 请求体格式为对象形式。

## 核心修复
- API `getCompanyApplyCertificateInfo` 请求体由直接传 ID 改为 `{ companyApplyId }` 对象
- 页面侧仍传 `companyApplyId`（机构端列表/详情、主管部门详情页），逻辑与改前一致

## 涉及文件
- `src/api/jgyh/cbyh.js`
- `src/views/supervision/bank/cbyh/detail.vue`
- `src/components/OperationBtnGroup/index.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：b13e0131-0391-4d9f-9e4c-9a23fc4f3322
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_apply_id_fix",
  "source_extraction_id": "2ba2686ff52a4d9c9c970639d6f824f6",
  "version": 1,
  "memory_type": "entities"
}
-->