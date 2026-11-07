# 经纪机构从业人员详情编辑按钮可见性
已备案(bizState=2)经纪机构从业人员详情页不应显示编辑按钮，canEditInHeader 收敛为仅企业端(B)且 bizState === '0' 显示编辑。

## 问题根因
- AgencyPersonnelDetail.vue 中 `:allow-edit-when-recorded="isGTerminal"` 使已备案(bizState=2)可点编辑
- 原逻辑包含维护专用逻辑，导致备案态错误开放编辑

## 关键修复
- canEditInHeader 收敛为仅企业端(B)且 bizState === '0' 显示编辑
- 移除维护专用逻辑，备案态提示语对 G 端显示

## 涉及文件
- institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- institution/agencyPersonnel/components/AgencyPersonnelBasicInfoFormFields.vue
- institution/agencyPersonnel/components/AgencyPersonnelList.vue
- e2e/institution/agency-personnel-real-api-flow.spec.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/096.md
- 来源会话ID：01a1631d-9a15-70c5-a400-7668d0d29bb4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_edit_mode",
  "source_extraction_id": "9e8e2d3533054e708a85237f24078d9d",
  "version": 1,
  "memory_type": "entities"
}
-->