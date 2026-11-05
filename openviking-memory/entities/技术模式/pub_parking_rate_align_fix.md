# 停车费率金额右对齐修复
苏住房G项目pubParkingRate列表及详情页修复了金额列应右对齐却左对齐的问题。

## 问题根因
- pubParkingRate/index.vue中三列金额（车位租金、车位管理费、总租金）被显式设置为align:'left'，覆盖了zs-table-column对金额列的默认右对齐逻辑

## 修复要点
- 列表页pubParkingRate/index.vue：三列金额由align:'left'改为align:'right'，表头与单元格（含底部小计行）均右对齐
- 详情页pubParkingRate/detail.vue：查看模式下三个金额字段同步改为右对齐，与列表页保持一致

## 涉及文件
- zhi2-web-admin/src/views/benefit/pubParkingRate/index.vue
- zhi2-web-admin/src/views/benefit/pubParkingRate/detail.vue
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：538cce4e-a5a9-4a66-b674-be4ca2721869；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_parking_rate_align_fix",
  "source_extraction_id": "fe0d6d2b918c4a599f472aedc212ae79",
  "version": 1,
  "memory_type": "entities"
}
-->