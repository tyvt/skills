# 租赁人员详情移除角色字段自动推导
苏州市房地产监测V3 中 `LeasePersonnelDetail.vue` 移除角色字段并改为按合同操作员自动推导角色值。

## 变更内容
- `LeasePersonnelDetail.vue` 移除人员角色展示行、表单下拉及必填校验
- 新增 `resolvePersonnelRole()` 按是否合同操作员匹配字典 `lease_personnel_role` 的 label 推导角色值并兜底原值
- 列表页 `LeasePersonnelList.vue` 保持原状

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/109.md
- 涉及文件：AgencyPersonnelDetail.vue、LeasePersonnelDetail.vue、LeasePersonnelList.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：aa497f4e-994d-44ea-a108-5e599dac5293；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_personnel_role",
  "source_extraction_id": "db8ea7dbd9be4e8bab0f903cf2e33840",
  "version": 1,
  "memory_type": "entities"
}
-->