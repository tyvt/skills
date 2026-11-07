# 宗地变更信息详情弹窗底部关闭按钮裁切修复
苏州市房地产监测V3 宗地变更信息详情弹窗底部「关闭」被裁切的问题已在 `ParcelDialog.vue` 修复。

## 问题根因
- 弹窗内详情 + 宗地地图（约 500px 高）总高度超过视口
- `zs-dialog` 在 `overflow: hidden` 下仍按内容算高度，footer 被挤出可视区域

## 修复方案
- 固定弹窗高度 `height="92vh"`，去掉原 `top="0"` 并加 `top="4vh"`
- 增加 `parcel-land-dialog` 样式：body 内滚动，footer 始终完整显示
- 地图 iframe 高度改为 `min(500px, 42vh)`，减轻小屏撑满

## 验证与归属
- 刷新后重新打开宗地变更详情，确认底部「关闭」完整可点；内容过长时在中间区域滚动
- 涉及文件：`ParcelDialog.vue`、`changeDetail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：d9ab42f3-48a5-4cf9-9d77-e54010a4511c；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parcel_dialog_footer_fix",
  "source_extraction_id": "8b8445b83fa44410a50f1a1c49887871",
  "version": 1,
  "memory_type": "entities"
}
-->