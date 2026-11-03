# 楼幢授权双列表弹窗字段与套数来源兼容
BuildingDialogAuth 类左右待选/已选列表弹窗需统一列配置并兼容房屋套数双字段来源。

## 实现要点
- 搜索区与列表列配置用统一 columns，勿维护独立的 rightColumns。
- 房屋套数接口字段可能是 totalHouse 或 houseNumber，列 formatter/映射需双字段兜底。
- 查询参数与已移除的搜索项（如楼幢坐落 position）同步删掉，避免无效筛参。

## 验证与归属
- 验证证据：楼幢关联弹窗改双列表四列与移入移出，实现中统一 columns 并兼容 totalHouse/houseNumber。
- 涉及文件：zhi2-web-admin/src/views/components/BuildingDialogAuth.vue
- 所属项目：园区公共收益；来源会话：61675c7d-cc31-40dd-b7a9-a334676d6bb6；代码基线：1edaefb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_dialog_auth",
  "source_extraction_id": "181b587a4f3b429fa55c316b8577fde9",
  "version": 1,
  "memory_type": "entities"
}
-->