# 入网审核服务方案收费标准单位修复
苏州市房地产监测V3 机构入网审核与备案详情的服务方案「收费标准」单位显示已修复。

## 问题原因
- 机构入网审核详情（`institutionRegister/detail.vue`）服务方案「收费标准」仅在收费类型含「比例」时追加 `%`
- 固定金额、按平方米等类型未像注册录入页那样显示 `元` 或 `元/平方米`

## 修改内容
- 在 `schemeDetailTemplate.js` 中抽取与录入表单一致的 `chargeUnitFromFeeTypeLabel` / `formatSchemeChargeStandard`
- 入网审核详情与机构备案详情（`companyRecordAgency/detail.vue`）的表格和「服务方案详情」弹窗均改用上述格式化
- 单位规则：比例 → 数值 + `%`；含「平方米」→ 数值 + `元/平方米`；其他 → 数值 + `元`

## 涉及文件
- `zhi2-web-admin/src/views/company/institutionRegister/detail.vue`
- `zhi2-web-admin/src/views/company/companyRecordAgency/detail.vue`
- `zhi2-web-admin/src/views/company/companyScheme/schemeDetailTemplate.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：0266b42a-44e7-41ce-aa1d-9fcb05c9ee0a
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scheme_charge_unit_fix",
  "source_extraction_id": "b73fb50eba434aa79e3d0fcfb2358295",
  "version": 1,
  "memory_type": "entities"
}
-->