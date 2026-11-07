# 业务对账已对账数据误显核销按钮修复
园区公共收益项目中，业务对账已对账查询数据仍显示“核销”按钮，因未根据对账状态判断。

## 问题根因
- pubBankDetailDay/index.vue 中 bankReceiptOperateButtons 始终显示“核销”
- 未根据对账状态做判断

## 修复方案
- 新增 isBankReceiptReconciled(row) 方法判断已对账（状态为2或存在 receiptVerificationId）
- 操作按钮按状态显示：未对账显核销，已对账有记录显查看，已对账无记录不显示
- handleReceiptWriteOff 增加防护，已对账不再执行核销

## 涉及文件与归属
- 涉及文件：src/views/benefit/pubBankDetailDay/index.vue、src/views/benefit/components/BankReconciliation.vue、src/views/maintenance/maintenanceRec/index.vue
- 所属项目：园区公共收益
- 来源会话：6a315793-11fc-4e4d-9c27-2ea581a2e486
- 代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reconcile_button_fix",
  "source_extraction_id": "79cc694f12bc4bf391a9c1460e65a168",
  "version": 1,
  "memory_type": "entities"
}
-->
