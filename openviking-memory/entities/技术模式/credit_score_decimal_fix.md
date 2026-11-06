# 物业服务企业查询信用计分小数截断修复
苏住房G 项目公共查询-物业服务企业查询中「本年度信用计分」输入小数被四舍五入，已修复。

## 问题原因
- 高级筛选 creditScore 在 getNumberDot 中被设为 dot=0(仅整数)
- amount-input 失焦时按该精度四舍五入，88.78 变成 89

## 修改内容
- 在 zs-advanced-query.vue 中将 creditScore 从整数列表移除，改为默认保留 2 位小数
- getNumberDot 逻辑：totalHouse、totalBuilding、managedComplexCount、managedEarlyComplexCount 返回 0，其余返回 2

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zs-advanced-query.vue、publicQuery/propertyCompany/index.vue、companyReferFieldConfig.js
- 来源会话ID：6a2e0220-2bcf-4259-a427-8f31e71d3acc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credit_score_decimal_fix",
  "source_extraction_id": "67bb936ad3174282b6da54bbc95568da",
  "version": 1,
  "memory_type": "entities"
}
-->