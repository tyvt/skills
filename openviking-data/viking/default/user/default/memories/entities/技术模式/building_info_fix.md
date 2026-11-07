# 楼幢信息查看房屋类型与坐落修复
修复楼幢信息查看弹窗中房屋类型和房屋坐落不显示的问题。

## 问题原因
- 房屋坐落：接口返回字段为 position，列配置误用 address（同模块 houseTable.vue、bindDialog.vue 均用 position）
- 房屋类型：SelectDialog 渲染表格时 type:'dict' 列依赖 zs-table-column 识别列类型，原用 scope.column.type 与 $attrs.type 不一致

## 修改内容
- buildingTable.vue：房屋坐落 prop 由 address 改为 position；房屋类型/建筑类型补充 dictUrl 明确字典来源
- zs-table-column.vue：列类型判断改用 $attrs.type（columnType），保证动态表格中 dict、tag、link 等自定义列正确渲染

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0
- 来源会话：dbc7cb9d-a0a8-4e87-8a32-7d0db2961532
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_info_fix",
  "source_extraction_id": "34b4c24c5f494281ba1ca2287f22b231",
  "version": 1,
  "memory_type": "entities"
}
-->