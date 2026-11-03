# 楼幢详情单元子表误用buildingVId作主键
building/detail.vue内嵌unitTable做单元增删改与房屋选择时，操作列/删除接口误用楼幢主键buildingVId，与单元实体unitId不一致。

## 问题根因
- 单元子表操作列/删除接口仍用楼幢侧主键buildingVId
- 与单元实体unitId不一致，表现为删除命中错误行或房屋范围弹窗带错单元

## 解决方案
- 单元子表主键统一unitId
- 从楼幢详情向子表传入projectId、projectCode、buildingNo、地上/地下层数等上下文
- 复用unit模块的HouseScopeTable / 拆分弹窗时补齐unitId传参

## 验证与归属
- 验证：会话d800e10d确认「主键改为unitId（原先误用buildingVId）」并同步HouseScopeTable、BuildingTableDialog、UnitSplitDialog增加unitId
- 涉及文件：src/views/building/building/components/unitTable.vue、src/views/building/building/detail.vue、src/views/building/unit/components/HouseScopeTable.vue
- 所属项目：园区公共收益；来源会话：d800e10d-b867-4f9c-9ec6-cb08d9304eef；代码基线：f783ca2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_table_primary_key",
  "source_extraction_id": "2c504ba9bfd644fe8073772a4088d137",
  "version": 1,
  "memory_type": "entities"
}
-->