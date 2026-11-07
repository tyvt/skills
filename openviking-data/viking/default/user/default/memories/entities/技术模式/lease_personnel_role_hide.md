# 住房租赁从业人员详情隐藏人员角色字段
苏州市房地产监测V3 中 `LeasePersonnelDetail.vue` 移除「人员角色」展示与必填校验，保存时按是否合同操作员自动推导。

## 改动要点
- 查看详情：基本信息移除「人员角色」行
- 编辑/新增表单：删除「人员角色」下拉框，移除 `personnelRole` 必填校验
- 保存逻辑：新增 `resolvePersonnelRole()`，是合同操作员取字典 `lease_personnel_role` 中 label 含「合同操作员」的值，否则取含「一般」的值，字典未命中兜底用原值
- 字典值在后端 DB，前端按 dictLabel 关键字匹配（label 需含「合同操作员」/「一般」）
- 列表页（LeasePersonnelList.vue）搜索项与列本次未动；老数据保存时按推导值覆盖 `personnelRole`

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/institution/leasePersonnel/components/LeasePersonnelDetail.vue、LeasePersonnelList.vue、agencyPersonnel/components/AgencyPersonnelDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：aa497f4e-994d-44ea-a108-5e599dac5293；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_personnel_role_hide",
  "source_extraction_id": "eb974d84ed2446a982b5539521f0ce63",
  "version": 1,
  "memory_type": "entities"
}
-->