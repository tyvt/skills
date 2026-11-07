# 经纪机构人员状态多标签展示
苏州市房地产监测V3 中新增 personnelStatus.js 优先取 businessStatus 并按 freezeStatus 加冻结标签，列表与详情改为多标签展示。

## 问题根因
- 原列表与详情仅绑 bizState，致已注销（businessStatus=9）或冻结（freezeStatus=1）人员状态显示不全
- 字段含义：bizState 仅流程态（待提交/审核中/已备案）；businessStatus 业务态（已注销=9，否则同 bizState）；freezeStatus（1=冻结，0=正常）
- 已备案但已注销（bizState=2, businessStatus=9）或已冻结（freezeStatus=1）的人员，界面上仍只显示「已备案」

## 解决方案
- 新增 zhi2-web-admin/src/utils/personnelStatus.js，展示规则：主状态优先取 businessStatus（正确显示「已注销」），freezeStatus=1 时额外显示「冻结」标签
- AgencyPersonnelList.vue 与 AgencyPersonnelDetail.vue 改为多标签展示
- 同步调整 InfoCardDialog.vue、StatusAdjustDialog.vue、zs-table-column.vue、listMixins.js、dict-tag.vue 及 property/workOrder/order/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/210.md
- 所属项目：苏州市房地产监测V3；来源会话：7dd6eb02-0c67-4ffd-81c7-628d978d0085；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_status_display",
  "source_extraction_id": "425f461fe83a492381b48de12e92b436",
  "version": 3,
  "memory_type": "entities"
}
-->