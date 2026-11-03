# zs-table-column link缺function报错
zs-table-column 在 type="link" 时若未绑定 :function，点击会抛 TypeError: attrs.function is not a function。

## 问题根因
- zs-table-column 在 type="link" 时单元格点击执行 attrs.function(scope.row)
- 列只写 type="link" 未绑 :function="handleXxx" 时点击即报 _vm.attrs.function is not a function（如 assetPositionSubTable 的「部位名称」列）

## 修复要点
- 为该链接列补上与跳转/打开详情一致的处理函数
- 同页其他 type="link" 列（如 contractSubTable 合同编号）应一并排查

## 验证与归属
- 验证证据：会话 adc2aa19 Vue warn 栈指向 zs-table-column 与 assetPositionSubTable；根因列为 link 无 function，已补 :function="handleView"
- 涉及文件：zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/views/benefit/pubHouse/components/assetPositionSubTable.vue、zhi2-web-admin/src/views/benefit/pubHouse/components/contractSubTable.vue
- 所属项目：园区公共收益；来源会话：adc2aa19-54f7-4bcc-83c5-ec89dea6bc7a；代码基线：b6bf87d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_link_function",
  "source_extraction_id": "819e5a7101104283bab49fe88e924f5a",
  "version": 1,
  "memory_type": "entities"
}
-->