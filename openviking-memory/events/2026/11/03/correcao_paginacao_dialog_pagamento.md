# Summary
O PaymentOutletDialog.vue teve getList() alterada para chamar a nova API pageBankBranch (POST /prefund/bankBranch/page) em yhwdgl.js, passando workBankId e isStart; campos mapeados para bankBranchName/bankBranchAddress/bankBranchManageId. Importações inúteis (listYhwdgl) e lógica residual submitForm foram removidas.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】pattern
【标题】缴款网点弹窗缺失bankBranch分页接口
【内容】`yhwdgl.js` 新增 `pageBankBranch` 调用 `POST /prefund/bankBranch/page`。`PaymentOutletDialog.vue` 的 `getList()` 改调该接口并传 `workBankId`、`isStart`，表格字段映射为 `bankBranchName`/`bankBranchAddress`/`bankBranchManageId`，移除 `listYhwdgl` 等无用导入与 `submitForm` 残留逻辑。
【验证证据】src=苏州市房地产监测V3-rest/110.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/deposit/notice/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/deposit/other_record/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/deposit/other_record/components/PaymentOutletDialog.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/bank/superviseBank/components/WdmcDialog.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/jgyh/yhwdgl.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/system/unionBank.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/bank/superviseBank/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/maintenance/bank/components/YhwdTable.vue
【来源会话ID】eab9bc90-2387-4c8e-a6b6-383aca8454a6
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "correcao_paginacao_dialog_pagamento",
  "goal": "Corrigir API paginação",
  "summary": "O PaymentOutletDialog.vue teve getList() alterada para chamar a nova API pageBankBranch (POST /prefund/bankBranch/page) em yhwdgl.js, passando workBankId e isStart; campos mapeados para bankBranchName/bankBranchAddress/bankBranchManageId. Importações inúteis (listYhwdgl) e lógica residual submitForm foram removidas.",
  "ranges": "7-14",
  "source_extraction_id": "7d93cb8ae368422f9c4b1c74a757c166",
  "version": 1,
  "memory_type": "events"
}
-->