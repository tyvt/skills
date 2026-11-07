# 详情页批量迁新框架
存量迁移模块的 detail.vue 停留在旧框架，需用脚本批量落地五条统一改造标准，再人工处理例外文件。

## 问题背景
- 旧详情页写法高度同构，差异仅在 moduleName/businessName/permsPrefix 与个别自定义按钮
- 人工逐个改一二十个文件既慢又易漏项、各页口径漂移
- 涉及 supervision/progress、riskmanage、unblock、presale、repairFunds、价格备案等多个业务域

## 五条改造标准
- operation-container → operation-btn-group，并补 moduleName/businessName/primaryKey（须与该目录 index.vue 一致）
- 查看态改用 DetailTemplate + contentInfo
- v-hasPermi → zs-button :permission（permission 为数组，见 #1115）
- 删除独立 zs-attachment（附件与流程由 operation-btn-group 内置）
- 审批由私有 showApproval/showApprovalProcessDialog 改为内置 zs-approval + @/components/zs-approval/ApprovalProcessDialog，保留区县受理等自定义审批按钮

## 交付与脚本
- 写 scripts/migrate-detail-framework.mjs 固化规则供后续同类批量迁移复用
- 交付输出：改动文件数 + 按业务域分组清单 + 未改文件及原因（如用户排除的 superviseBank、verifyRecord 无 detail.vue）
- 先跑脚本再人工复核例外，避免正则误伤 props/watch（见 #204/#815）

## 验证与归属
- 来源会话 df7ea01a：改造 6 组 detail.vue，最终改动 24 个文件，新增 scripts/migrate-detail-framework.mjs
- 涉及文件：supervision/progress/gcht/detail.vue、supervision/unblock/plan/detail.vue、commercialHousingSales/presale/specialcontract/detail.vue、repairFunds/finance/rec/detail.vue、zs-approval/ApprovalProcessDialog.vue、scripts/migrate-detail-framework.mjs
- 所属项目：产品2.0；代码基线：39e3114

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "batch_detail_framework",
  "source_extraction_id": "770fdb55ea6d4c7ebbe5d0d9060bf199",
  "version": 1,
  "memory_type": "entities"
}
-->