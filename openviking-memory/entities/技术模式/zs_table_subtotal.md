# zs-table 小计与合计分离
园区物管2.0 的 zs-table 组件需区分当前页小计与接口全量合计。

## 问题根因
- 表格底部行（小计）由 summary-method 控制，表格下方文字条（合计）默认复用小计行数值
- 此前把小计改成按当前页累加后，底部合计也跟着变，两者看起来一样

## 解决方案
- 小计：仍由 showMethod 对当前页 data 累加
- 合计：通过 :bottom-summary-items 单独传入接口返回的 summary（totalUnit、totalHouse）
- 翻页时小计会变，底部合计始终显示接口返回的全量统计

## 验证与归属
- 来源会话：4d6c0599-62a1-4620-bba9-35eec0a0c116
- 涉及文件：property/complex/components/rangeTable.vue、maintenance/budget/index.vue、property/complexChange/components/rangeTable.vue
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_subtotal",
  "source_extraction_id": "849acc699eee47b7ace3de814a0b95e9",
  "version": 1,
  "memory_type": "entities"
}
-->