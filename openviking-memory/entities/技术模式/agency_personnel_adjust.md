# 经纪机构人员状态调整弹窗
苏州市房地产监测V3 中 AgencyPersonnelList 操作栏改为「人员状态调整」并新增 StatusAdjustDialog 按冻结态区分注销、冻结、解冻选项。

## 实现要点
- AgencyPersonnelList.vue 操作栏按钮改为「人员状态调整」，可见条件为企业端且 bizState='2' 及权限 company:agencyPersonnel:adjust
- 新建 StatusAdjustDialog.vue 实现调整弹窗，依 freezeStatus 控制注销、冻结、解冻选项
- 同步涉及 CancelDialog.vue、AgencyPersonnelDetail.vue 与 e2e 流程测试文件

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/010.md
- 涉及文件：zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue、StatusAdjustDialog.vue、CancelDialog.vue、AgencyPersonnelDetail.vue、e2e/institution/agency-personnel-real-api-flow.spec.js、agencyBranch/components/CancelDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：a69a7578-b9cb-4b52-8576-558dbd40c136；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_adjust",
  "source_extraction_id": "a8c29ad78aa04768882548eb829f2e94",
  "version": 1,
  "memory_type": "entities"
}
-->