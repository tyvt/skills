# 监管项目备案选择楼幢接口更换
苏州市房地产监测V3 项目中，完成监管项目备案「选择楼幢」接口更换与字段映射修复。

## 变更内容
- 接口 URL：`/building/buildinginfo/selectBuilding` → `/building/building/selectBuilding`
- 表格列字段：楼幢号列 `prop` 由 `constructionNo` 改为 `buildingNo`
- `setData` 修复：遍历用户实际选中的 `row`，不再误处理 `this.selectList` 全量数据
- 字段映射：`buildingNo` 优先新字段兼容旧字段 `constructionNo`；面积优先 `buildingArea` 回退 `floorArea`；监管相关字段映射不变

## 联调建议
- 在监管项目备案详情页（草稿状态）打开「选择楼幢」弹窗，确认列表加载、关键字搜索、分页可用
- 选中楼幢后 `/prefund/regBuild/add` 保存成功，子表数据正确
- 若新接口要求 POST 而非 GET 需相应调整

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`SupervisionTable.vue`
- 来源会话ID：1c6ebe99-e7de-4325-94b6-5e285bed7910
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "supervision_building_select_fix",
  "source_extraction_id": "64135c6de2f8446c95b85023673ec5dc",
  "version": 1,
  "memory_type": "entities"
}
-->