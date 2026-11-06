# V3 子表工具栏标题栏全局改造
苏州市房地产监测V3 完成子表工具栏标题栏全局改造，所有 todo 标记完成。

## 基础设施
- `SubTableToolbar`：Tab 内通过 `inject('zsTabsToolbar')` 将按钮注册到 `zs-tabs` 标题栏；弹窗内（`ZsDialog`/`ElDialog` 祖先）自动 fallback 为内容区 inline 渲染
- `zs-tabs.vue`：`tabs-bar` 拆为 `tabs-bar-main` + `tabs-header-action`，提供 `register`/`unregister` API
- `index.scss`：补充 `.tabs-header-action` 全局样式；Tab 标题栏内工具栏取消内容区 margin/padding

## 批量改造
- Tab 子表组件（`ParcelTable`、`UnitTable`、`houseTable`、`RecordCodeTable`）统一为 `<SubTableToolbar :visible="bizState == '0'" :buttons="operationButtons" />`
- Headline 子表（`bankTable`、`venueTable`）保持 `#right` 槽 + `operation-b` 方式

## 涉及文件与归属
- 文件：`zs-tabs.vue`、`index.scss`、`RuleTable.vue`、`EntrustBuildingTable.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：339a9982-4656-4f14-a440-fc13873927d9；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_subtable_toolbar",
  "source_extraction_id": "b92f718b8a55409ca3d47ef5e5f4ce65",
  "version": 1,
  "memory_type": "entities"
}
-->