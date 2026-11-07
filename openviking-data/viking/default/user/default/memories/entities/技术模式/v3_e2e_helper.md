# 开户银行选择弹窗 E2E Helper 修复
苏州市房地产监测V3 修复 E2E helper 以对齐开户银行选择弹窗 UI。

## 改动说明
- 文件：e2e/fixtures/supervision-bank-helpers.js
- clickSubTableAdd：「新增」在 Headline 标题行内（不在 sub-container），改由「网点列表」折叠区块定位 getByRole('button', { name: '新增' })
- pickUnionBankInDialog 增加 clickAndMaybeWaitUnionBankList：未触发 /system/unionBank/page 时最多等 10s，避免重复选银行每次卡满 30s
- 左侧银行点 .el-radio__label 并 force: true
- 表格已有数据时不再盲目点「搜索」，仅空表时再搜；等 loading 遮罩消失后再操作；选完断言「银行网点」弹窗关闭

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：e2e/fixtures/supervision-bank-helpers.js、BranchOneDialog.vue
- 来源会话ID：0a326684-ca2c-4bf1-8ca1-c6b881d8f927

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_e2e_helper",
  "source_extraction_id": "9ec3c07b17f34b9c98be7b3373038dfb",
  "version": 1,
  "memory_type": "entities"
}
-->