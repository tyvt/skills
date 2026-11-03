# 服务方案按比例收费须校验0-100两位小数
苏州市房地产监测V3 中服务方案收费类型为按比例时须校验 0-100 且最多两位小数。

## 变更要点
- 在 companyScheme/detail.vue 新增 isChargeTypeProportion 判定收费类型
- rules 改为 computed 实现按比例 0-100 最多2位小数、其他类型大于0的校验
- 监听 form.chargeType 切换重新校验

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/183.md
- 涉及文件：company/companyScheme/detail.vue、api/company/companyScheme.js、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：6b993f54-a54c-46d4-bd1e-32b8da6cc3ba；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_scheme_proportion_validate",
  "source_extraction_id": "d2f3bc9cdf3c4c72be8ab951414c7c0b",
  "version": 1,
  "memory_type": "entities"
}
-->