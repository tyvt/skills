# 现售备案申请详情页 UI 修复
苏州市房地产监测V3 现售备案申请详情页 UI 修复已完成，并顺带修复页签栏工具栏不刷新问题。

## 基本信息标题
- `zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue`：去掉 `cashsale-info-panel` 的 `hide-headline`，左栏显示「基本信息」（与预售许可申请未备案态一致）

## 要件区选择顶栏
- `zhi2-web-admin/src/components/AnnexUpload/index.vue`：`showTopBar` 在 `hideViewToggle` 时为 `false`（仓库已有该逻辑），要件右栏不再出现批量「选择」顶栏

## 楼幢操作按钮
- `zhi2-web-admin/src/views/presale/permit/components/PresaleBuildingTable.vue`：用 `SubTableToolbar` + `operationButtons` 替代原 `operation-button-container`，按钮不再压住表格

## 页签栏工具栏
- `zhi2-web-admin/src/components/zs-tabs/zs-tabs.vue`：修复页签栏工具栏不刷新问题

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：5e0c904b-1c3d-4125-8278-247966f6a4e8
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_detail_ui_fix",
  "source_extraction_id": "7503ced734cb48b59a6ed3ddd3ef916d",
  "version": 1,
  "memory_type": "entities"
}
-->