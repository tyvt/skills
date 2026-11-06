# 经纪机构人员G端维护编辑逻辑
苏州市房地产监测V3 中 AgencyPersonnelDetail 在 G 端维护场景下通过一组 computed 控制字段可编辑性与保存校验。

## 逻辑关系
- G + edit + bizState===2 + 未注销时，isGTerminalPersonnelMaintainEdit=true、isFormDisabled=false、maintainOtherFieldsDisabled=true（其余字段禁用）
- 已备案但非上述场景时，isGTerminalPersonnelMaintainEdit=false、isFormDisabled=true、maintainOtherFieldsDisabled=false
- 人员角色未绑 :disabled，在维护模式下仍可编辑

## 保存逻辑
- handleSave 在维护模式下跳过要件校验（!isGTerminalPersonnelMaintainEdit），与「只改角色」一致
- 列表「维护」与详情 canEditInHeader 的 G 端分支对齐：isGTerminal、bizState==='2'、!isPersonnelCancelled、company:agencyP

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、companyAdmin/detail.vue、toB/personnelRecord/.../detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c622c348-e873-4a4f-9936-9bbb4eab54d2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_maintain_edit",
  "source_extraction_id": "532c5184418545dea132530ce12ccb1a",
  "version": 1,
  "memory_type": "entities"
}
-->