# zhi2-web-admin 剩余迁移模块改造
产品2.0 的 zhi2-web-admin 剩余迁移模块已完成改造，共改动 24 个文件，均按新版框架将 operation-container 改为底部 operation-btn-group。

## 改动范围（上）
- supervision/progress：5 个文件（gcht、change、bdcdj、xmjf、node）
- riskmanage：1 个文件（riskregister）
- supervision/unblock：12 个文件（notice、noticeChange、usemoney、usemoneyRevoke、plan、planChange、peasantAccount、guarantee、bond、InformationPush/detail + changeDetail、guarantee/changedetail）

## 改动范围（下）
- presale：3 个文件（contractView、specialcontract、exchangeContract）
- repairFunds：1 个文件（finance/rec）
- 价格备案：2 个文件（recordPriceMngSuzhou/detail + changeDetail）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：index.vue、@/components/zs-approval/ApprovalProcessDialog.vue、supervision/bank/superviseBank/detail.vue、repairFunds/verifyRecord/detail.vue
- 所属项目：产品2.0；来源会话：df7ea01a-7050-46fa-a342-71e9dc4e910d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_module_migration",
  "source_extraction_id": "ce7689f8bffb4226a4a239088e1262fc",
  "version": 1,
  "memory_type": "entities"
}
-->