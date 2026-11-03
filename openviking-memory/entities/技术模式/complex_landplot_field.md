# 楼幢范围展示字段改宗地号
园区公共收益域内楼幢范围相关表格列展示从「项目名称 projectName」改为宗地号 landPlotCode、地块名称 landPlotName，与新增楼幢授权弹窗一致。

## 涉及改动
- complex 详情/变更、综合查询 buildingTable 等列展示改为 landPlotCode、landPlotName
- rangeTable、rangeTableInfo、房屋清单与变更记录弹窗列配置同源同步改
- 列顺序与新增楼幢授权弹窗一致

## 后端配合
- 若列表仍空列，需后端在 /property/complexRange/page（或等价分页接口）补充返回 landPlotCode、landPlotName

## 涉及文件
- zhi2-web-admin/src/views/property/complex/components/rangeTable.vue
- zhi2-web-admin/src/views/property/complexChange/components/rangeTable.vue
- zhi2-web-admin/src/views/property/complex/components/rangeTableInfo.vue
- zhi2-web-admin/src/views/building/complexSearch/components/buildingTable.vue

## 验证与归属
- 所属项目：园区公共收益
- 来源会话：794bbcb3-914e-4103-a620-307568d14ce0
- 代码基线：94b839a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_landplot_field",
  "source_extraction_id": "ae33c8b97175451f9aa74d76c19405ac",
  "version": 1,
  "memory_type": "entities"
}
-->