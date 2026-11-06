
# 经纪/专业人员查看与编辑字段顺序统一
苏州市房地产监测V3 统一机构人员基本信息在查看与编辑模式下的字段顺序与显隐。

## 问题现象
- 查看多出了「人员角色」：查看按 `showPersonnelRoleField` 展示，但编辑里该字段只在专业人员块内出现，经纪人员查看会多 1 项
- G 端查看少「人员角色」：`showPersonnelRoleField` 在查看模式下为 `false`，专业人员查看会少 1 项

## 修改内容
- 抽出共用配置 `agencyPersonnelBasicInfoFields.js` 的 `resolveAgencyPersonnelBasicInfoFields`，查看（`basicInfoView`）和编辑（`AgencyPersonnelBasicInfoFormFields`）都走同一套顺序与显隐
- 调整 G 端：`showPersonnelRoleField` 在 view 下也为 true（与编辑时专业人员展示一致）
- 字段显隐规则：非专业人员无「人员角色」「证书管理号」；专业人员 +证书管理号，若 `showPersonnelRoleField` 则 +人员角色；任意类型始终含「资格证书类型」
- 字段数量（不含证件照）：经纪人员 17 项，专业人员 18 项

## 涉及文件
- zhi2-web-admin/src/views/institution/agencyPersonnel/components/agencyPersonnelBasicInfoFields.js
- zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/agencyBasicInfoContent.js

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：78eb4f58-a263-44aa-9a8e-3ccff66ca115；验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_field_unify",
  "source_extraction_id": "23307535f6ae434f939ec78293727547",
  "version": 1,
  "memory_type": "entities"
}
-->