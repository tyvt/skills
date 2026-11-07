# 经纪人员类型与角色字典及详情复用
经纪机构从业人员人员类型(personnelType)与人员角色(personnelRole)统一走指定字典，且备案/申请/变更三种详情共用同一组件实现。

## 字典与字段绑定
- 数据来源：AgencyPersonnelDetail.vue 中 getDicts('agency_personnel_type')→personnelTypeOptions，getDicts('agency_personnel_role')→personnelRoleOptions
- 查看态翻译：同文件 displayValue() 用 dictLabel(value, personnelTypeOptions / personnelRoleOptions)
- 编辑态下拉：AgencyPersonnelBasicInfoFormFields.vue 中 personnelType、personnelRole 分别用上述 Options

## 业务规则
- personnelRole 仅在「专业人员(personnelType=professional)且展示角色字段」时显示且必填，经纪服务人员不需要角色
- 判据写在 agencyPersonnelBasicInfoFields.js 与 AgencyPersonnelDetail.vue

## 复用关系
- 备案详情 agencyPersonnel/detail.vue、申请详情 agencyPersonnelApply/detail.vue 直接复用 <AgencyPersonnelDetail />
- 变更详情由 AgencyPersonnelDetail.vue 内部 changeActive 切换走 personnelRecordChange 接口，UI 与字典逻辑完全共用
- 改字典或改规则只改共享组件一处，三种详情同步生效

## 验证与归属
- 验证结论：已按指定字典实现，无需改动代码（会话 session-00c761c3-9e6b-4fba-8dbe-852853f26d1d，基线 d9a1380）
- 涉及文件：AgencyPersonnelDetail.vue、AgencyPersonnelBasicInfoFormFields.vue、agencyPersonnelBasicInfoFields.js、agencyPersonnel/detail.vue、agencyPersonnelApply/detail.vue
- 注意与「隐藏人员角色并自动推导值」口径区分：本模块是专业人员才显示角色字段

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_dict",
  "source_extraction_id": "ceefa154fa254c5592af0cd4cc7071e5",
  "version": 1,
  "memory_type": "entities"
}
-->