# 从业人员详情页隐藏人员角色并自动推导值
苏州市房地产监测V3 中从业人员详情页隐藏人员角色行与编辑下拉，保存时按是否合同操作员从字典自动推导角色值。

## 变更要点
- 在 `LeasePersonnelDetail.vue` 移除查看详情的人员角色行与编辑表单下拉框及必填校验
- 保存新增 `resolvePersonnelRole()` 按是否合同操作员从字典 `lease_personnel_role` 匹配 label 含"合同操作员"或"一般"的值自动推导
- 未命中兜底原值

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/309.md
- 涉及文件：AgencyPersonnelDetail.vue、LeasePersonnelDetail.vue、LeasePersonnelList.vue
- 所属项目：苏州市房地产监测V3；来源会话：aa497f4e-994d-44ea-a108-5e599dac5293；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_role_auto_derive",
  "source_extraction_id": "38445eb31c6a47e2ac30471981805d26",
  "version": 1,
  "memory_type": "entities"
}
-->