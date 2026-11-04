# 未翻译的 INDUSTRY 字典在详情中显示原始值

在项目 苏州市房地产监测V3 中，`companyApplyAudit/detail.vue` 和 `institutionRegister/detail.vue` 未应用 `INDUSTRY_ASSOCIATION` 字典的翻译。

## 问题根因
- `companyApplyAudit/detail.vue` 和 `institutionRegister/detail.vue` 未加载 `INDUSTRY_ASSOCIATION` 字典
- 显示原始值并进行不兼容的类型比较

## 解决方案
- 两个文件在 `created` 中加载字典
- 使用 `String()` 进行比较以兼容数字和字符串
- 通过 `industryAssociationLabel` 或 `displayValue` 显示字典名称

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/069.md; src=苏州市房地产监测V3/269.md
- 涉及文件: CompanyBasicInfoDetail.vue, companyApply/detail.vue, companyApplyAudit/detail.vue, institutionRegister/detail.vue, institution/record/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: a2724dfa-738f-4f54-bbf4-4303a1e6cf98; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "industry_dict_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 2,
  "memory_type": "entities"
}
-->