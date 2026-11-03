# el-table reserve-selection 行快照滞后致忽略预警误报
苏住房G 经营用房租赁合同备案页用 el-table 的 reserve-selection 跨页保留勾选，导致选中项字段不随 tableData 刷新而误报「请选择合同」。

## 问题根因
- reserve-selection 按 row-key 缓存勾选时刻的行对象快照，行数据被重新查询/替换后选中项对象不随 tableData 同步
- 直接读 selection 里的行取 whetherWarning / 主键，会读到旧值或空值，导致已备案预警合同勾选后点「忽略预警」提示「请选择合同」
- V3 的 zs-table/el-table 布尔与数字混用，whetherWarning 可能是 1 / '1' / true 三种形态

## 解决方案
- 统一抽判定函数 isWarningContract(row) 归一 whetherWarning 的 1/'1'/true，禁止多处各写 row.whetherWarning == 1
- 取数以 tableData 为准：按 primaryKey 在 tableData 里 find 最新行，在最新行上过滤与提交，不用 selection 里的旧对象
- 选中项无预警合同时把「忽略预警」按钮置 disabled，减少误点
- isSelectable 与 setRowStyle（橙色预警底）必须共用同一判定函数，否则出现「能勾但不高亮」

## 关键约束
- 已备案行若因「已备案不可编辑」整行禁用勾选，需区分「可勾选但操作受限」与「不可勾选」两类
- 用户明确要求预警合同即使已备案也必须能勾选

## 验证与归属
- 验证证据：会话 7960611d，用户报「经营用房租赁合同：已备案的合同，不能选，选忽略预警时提示请选择合同」
- 涉及文件：zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/index.vue
- 所属项目：苏住房G；代码基线：320507d；来源会话：7960611d-0d3b-4ae8-a217-98664ba2c7a2

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "reserve_selection_stale",
  "source_extraction_id": "1b549fb6f5f74e96a56ee33f14963762",
  "version": 2,
  "memory_type": "entities"
}
-->