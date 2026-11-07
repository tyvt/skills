# 经纪机构人员状态调整弹窗
苏州市房地产监测V3 中 AgencyPersonnelList 操作栏改为「人员状态调整」并新增 StatusAdjustDialog 按冻结态区分注销、冻结、解冻选项。

## 实现要点
- AgencyPersonnelList.vue 操作栏按钮改为「人员状态调整」，可见条件为企业端且 bizState==='2' 及权限 company:agencyPersonnel:adjust
- 新建 StatusAdjustDialog.vue 实现调整弹窗：未冻结(freezeStatus=0)可选注销/冻结，已冻结(freezeStatus=1)仅显解冻且禁用类型选择
- 弹窗标题「人员状态调整」；注销时调整说明必填（≤500 字），冻结/解冻为选填
- 备案绑定经纪人注销时展示替代人员提示、候选下拉及未选时二次确认
- 提交接口：POST /company/agencyPersonnel/adjust
- 同步涉及 CancelDialog.vue、AgencyPersonnelDetail.vue 与 e2e 流程测试文件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/210.md
- 涉及文件：zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue、StatusAdjustDialog.vue、CancelDialog.vue、AgencyPersonnelDetail.vue、e2e/institution/agency-personnel-real-api-flow.spec.js、agencyBranch/components/CancelDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：a69a7578-b9cb-4b52-8576-558dbd40c136；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_adjust",
  "source_extraction_id": "425f461fe83a492381b48de12e92b436",
  "version": 3,
  "memory_type": "entities"
}
-->