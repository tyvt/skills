# 经纪机构服务方案按比例收费标准校验
苏州市房地产监测V3 的 companyScheme/detail.vue 已补全「按比例」收费标准的输入校验与动态提示。

## 实现要点
- 新增 `isChargeTypeProportion`：通过字典标签是否含「比例」判断当前是否为按比例收费
- `rules` 改为 computed：按比例时限制 0–100、最多 2 位小数；其他类型仍为大于 0 的数字
- 监听 `form.chargeType` 切换收费类型后自动重新校验「收费标准」
- 动态 placeholder：按比例时提示「请输入0-100之间的数字，最多2位小数」

## 校验边界
- 通过：0、0.01、99.99、100
- 拦截：101、100.01、50.555、abc

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/company/companyScheme/detail.vue、src/api/company/companyScheme.js、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：6b993f54-a54c-46d4-bd1e-32b8da6cc3ba；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_scheme_proportion_validation",
  "source_extraction_id": "16a1550171f04a6c8f38bcb58d4c2d6a",
  "version": 1,
  "memory_type": "entities"
}
-->
