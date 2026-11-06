# 房屋选择弹窗 buildNo 展示与表格渲染修复
苏州市房地产监测V3 项目中修复 HouseSelectDialog.vue 的表格渲染报错与 buildNo 展示问题。

## 修改文件
- zhi2-web-admin/src/views/building/houseLimit/components/HouseSelectDialog.vue

## 表格渲染修复
- 楼幢号、建筑面积、房屋当前状态三列改为 #default="{ scope }"，使用 scope.row（与 zs-table-column 插槽约定一致）
- 避免 row 为 undefined 时读 buildingNo 报错

## buildNo 与房屋列表规范化
- 列表文案与展示名优先 buildNo
- normalizeBuilding：buildCode 查询链 buildCode → buildingCode → buildingNo → buildNo
- selectBuilding 同步 currentBuildNo，供房屋行回写
- 新增 normalizeHouse：houseId、buildingNo/buildNo 与当前楼幢对齐；loadHouseList 成功后对列表 map 处理

## 验证与归属
- 该文件无新的 lint 问题
- 所属项目：苏州市房地产监测V3；来源会话：09f6b31e-b744-41e8-aa52-b2310e44a3a9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_select_dialog_buildno_fix",
  "source_extraction_id": "6ae9df91bcf942f9a3361c899633d9bd",
  "version": 1,
  "memory_type": "entities"
}
-->