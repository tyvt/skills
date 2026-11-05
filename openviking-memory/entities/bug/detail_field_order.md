# 查看页字段顺序与展示项调整
产品2.0 的两个详情页 `DetailTemplate`（contentInfo）已按图片顺序统一调整字段顺序并补齐全字段。

## 修改内容
- 调整文件：`zhi2-web-admin/src/views/building/project/detail.vue`、`zhi2-web-admin/src/views/building/projectChange/detail.vue`
- 按"查看页"顺序重排 `contentInfo` 字段
- 补上原未展示字段：`地块名称`(landPlotName)、`土地使用权人`(landUseRightsHolder)
- `备注` 放到末尾整行展示，与截图一致

## 范围说明
- 仅调整查看态 `DetailTemplate` 字段顺序与展示项
- 未改接口字段、提交流程和编辑态逻辑
- 原有 `ts-plugin never` 类报错未新增，改动未引入新语法问题

## 验证与归属
- 验证：cursor 会话 ff097cf6 提取
- 涉及文件：zhi2-web-admin/src/views/building/project/detail.vue、zhi2-web-admin/src/views/building/projectChange/detail.vue
- 所属项目：产品2.0；来源会话：ff097cf6-67f8-45c1-8b04-753136cfda5d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "detail_field_order",
  "source_extraction_id": "f665265909c84349965a107959cf0fa9",
  "version": 1,
  "memory_type": "entities"
}
-->