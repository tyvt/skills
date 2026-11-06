# 园区公共收益 表格链接列点击报错修复
园区公共收益项目 zs-table-column 在 type="link" 时点击调用 attrs.function，assetPositionSubTable.vue 未传 :function 导致报错，已补 handleView。

## 问题原因
- zs-table-column type="link" 时点击调用 `attrs.function(scope.row)`
- assetPositionSubTable.vue「部位名称」列设 type="link" 但未传 :function
- 点击触发 `_vm.attrs.function is not a function`

## 修复方案
- 为「部位名称」列补上 `:function="handleView"`，对应组件已有跳转部位详情页的 handleView 方法
- 刷新后点击「部位名称」可正常跳转

## 涉及文件
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/views/benefit/pubHouse/components/assetPositionSubTable.vue
- contractSubTable.vue

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：adc2aa19-54f7-4bcc-83c5-ec89dea6bc7a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_link_fix",
  "source_extraction_id": "d0846b77e3174058abe8f842a0c0bb59",
  "version": 1,
  "memory_type": "entities"
}
-->