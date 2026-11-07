# 银行回单表动态列与固定操作列镜像错乱
园区公共收益项目(zhi2-web-admin)中，业务对账页银行回单表用 v-for 动态列 + 右侧固定操作列导致列顺序镜像错乱。

## 问题现象
- 切换「银行回单数据」模式时，列从左到右与「银行对账单」镜像（如手续费在最左、序号靠近操作列）
- bankReceiptColumns 数组顺序本身正确；同类问题在对账模块曾复发

## 解决方案
- 与对账单侧一致改为静态列定义（不用 v-for 拼列）
- 数据加载后调用表格 doLayout() 重算布局
- 验收列顺序：序号 → 对方账户名称 → 通知书号 → 交易日期 → 交易金额 → … → 操作

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话 31028abc 用户报银行回单字段顺序弄反；结论指 v-for 动态列与固定操作列组合导致错乱，改静态列并 doLayout
- 涉及文件：src/views/benefit/pubBankDetailDay/index.vue、src/components/zs-table/zs-table.vue
- 所属项目：园区公共收益；来源会话：31028abc-b8ae-4e20-8edb-702fd8eb1e0c；代码基线：36a9a7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_mirror",
  "source_extraction_id": "29493589c3594a7899ab33fce14ca423",
  "version": 1,
  "memory_type": "entities"
}
-->