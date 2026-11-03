# 单元列表项目与楼幢号跳转详情
苏州市房地产监测V3 中单元列表的项目名称与楼幢号改为链接跳转各自详情页，动态解析路由。

## 实现要点
- 修改 `projectManagement/unitinfo/index.vue` 使项目名称与楼幢号改为链接
- 通过 `getRouterPathByFilePath` 动态解析路由避免硬编码
- 缺失 ID 时调用 `msgWarning` 提示

## 涉及文件
- `zhi2-web-admin/src/views/projectManagement/unitinfo/index.vue`
- `zhi2-web-admin/src/views/projectManagement/houseinfo/index.vue`
- `zhi2-web-admin/src/views/projectManagement/unitinfo/detail.vue`
- `zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/126.md
- 来源会话ID：146ee20b-f6d8-4780-be83-1077344f1c17
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_link_detail",
  "source_extraction_id": "d5003cc58ed741acbc25c5ea5b23b3df",
  "version": 1,
  "memory_type": "entities"
}
-->