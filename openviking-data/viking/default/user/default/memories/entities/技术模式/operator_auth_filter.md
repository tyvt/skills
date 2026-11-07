# 人员授权列表缺失所属企业筛选条件
园区物管2.0 人员授权列表页因 `queryParams` 与 `formItems` 未含所属企业字段，缺少按企业筛选能力。

## 问题根因
- 人员授权列表页 `queryParams` 未含所属企业字段
- `formItems` 未含所属企业输入项

## 解决方案
- `queryParams` 增加 `companyName: undefined`
- `formItems` 添加标签「所属企业」及 `companyName` 输入框
- 实现方式参照 `staffManagement/components/index.vue`

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/082.md
- 涉及文件：company/userManagement/operatorAuth/index.vue、company/staffManagement/components/index.vue、company/userManagement/operator/index.vue
- 来源会话：0819ec89-ecfa-4859-8949-e31b74cfb8f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operator_auth_filter",
  "source_extraction_id": "36adc3f9f252485a8b7cdd7530b6990f",
  "version": 1,
  "memory_type": "entities"
}
-->