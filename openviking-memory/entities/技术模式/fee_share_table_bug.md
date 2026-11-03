# 费用分摊表小计错位到操作列
决算/预算 feeShareTable 动态列出现后，Element 合计行 colgroup 未随列重建，小计数值显示在固定操作列下。

## 问题根因
- 不是 z-index 穿透，而是列结构在首渲之后才变化，表格 footer 未随列注册重建
- 动态列通过 v-if 出现且右侧有固定操作列时，小计 colgroup 仍按旧列对齐

## 解决方案
- 公共 zs-table.vue 的 updated() 调 refreshColumnOrderKey()，仅列结构变化时 bump key 重建 el-table
- 业务页 getList().finally() 再调 this.$refs.table?.doLayout?.() 做二次布局同步
- columnOrderKey 不应每次 render 都变，否则全表频繁重建

## 验证与归属
- 验证：会话 7f7497f6 用户报小计值显示在操作列；修复 zs-table updated 中 refreshColumnOrderKey，决算/预算 feeShareTable finally 中 doLayout；期望审价费 7.11 落审价费列
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、maintenance/final/components/feeShareTable.vue、maintenance/budget/components/feeShareTable.vue
- 所属项目：园区公共收益；来源会话：7f7497f6-606f-4b8e-8f81-8aeefa11369c；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_share_table_bug",
  "source_extraction_id": "d709eae86a0446e2bbf553bea5add833",
  "version": 1,
  "memory_type": "entities"
}
-->