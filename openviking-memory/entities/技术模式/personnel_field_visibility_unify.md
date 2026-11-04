# 人员查看/编辑字段不一致导致计数差异
在项目苏州市房地产监测V3中，人员查看和编辑模式下的字段显示逻辑相互分离，导致经纪人/专业人员视图多显示或缺失«人员角色»字段（人员职能）。

## 问题根因
- 查看和编辑模式下的字段显示逻辑相互分离，缺乏统一的顺序与可见性
- 经纪人/专业人员视图多显示或缺失«人员角色»字段

## 解决方案
- 在agencyPersonnelBasicInfoFields.js中提取`resolveAgencyPersonnelBasicInfoFields`，以统一`basicInfoView`和`AgencyPersonnelBasicInfoFormFields`的顺序与可见性
- 在G视图中，将`showPersonnelRoleField`定义为true

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/277.md
- 涉及文件: AgencyPersonnelDetail.vue, agencyBasicInfoContent.js, agencyPersonnelBasicInfoFields.js, detailLayout.js, AgencyPersonnelBasicInfoFormFields.vue
- 所属项目: 苏州市房地产监测V3; 会话: 78eb4f58-a263-44aa-9a8e-3ccff66ca115; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_field_visibility_unify",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 1,
  "memory_type": "entities"
}
-->