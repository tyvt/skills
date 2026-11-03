# 缴款网点弹窗调用 bankBranch 分页接口
在苏州市房地产监测V3中，缴款网点弹窗须改用 bankBranch 的 page 分页接口并做字段映射。

## 变更要点
- `yhwdgl.js` 新增 `pageBankBranch` 调用 `POST /prefund/bankBranch/page`
- `PaymentOutletDialog.vue` 的 `getList()` 改调该接口
- 字段映射：`unionBankName`→`bankBranchName`、`address`→`bankBranchAddress`、`row-key`→`bankBranchManageId`
- 移除 `listYhwdgl` 等无用导入与残留逻辑

## 涉及文件
- `src/api/jgyh/yhwdgl.js`、`src/api/system/unionBank.js`
- `supervision/deposit/notice/detail.vue`、`supervision/deposit/other_record/detail.vue`
- `supervision/deposit/other_record/components/PaymentOutletDialog.vue`
- `supervision/bank/superviseBank/detail.vue`、`supervision/bank/superviseBank/components/WdmcDialog.vue`
- `maintenance/bank/components/YhwdTable.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/154.md
- 来源会话：eab9bc90-2387-4c8e-a6b6-383aca8454a6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_outlet_page",
  "source_extraction_id": "66fbda70d2034d4ea98cc557510b2ef8",
  "version": 1,
  "memory_type": "entities"
}
-->