# Tab内子表去内框与工具栏同行样式修复
苏州市房地产监测V3 中优化详情页 Tab 内子表样式，去除内层边框并将工具栏与标题同行。

## 全局样式改动
- 文件：`zhi2-web-admin/src/styles/index.scss` 约 1303–1345 行加强 Tab 内子表 Headline 全局样式，与 `zs-tabs.vue` 的 DOM（`.tabs-content` + 插槽内 `v-if` 包裹）对齐；对详情页 card/line 型 `zs-tabs` 的 `.tabs-content` 内 Headline（`.collapse-container`）统一处理
- 去内层外框：对 `.tabs-content .collapse-container` 及 Tab 下任意 `.collapse-container`（排除 `border-only`、`appendix-section`）使用 `border: none !important`，压过 Headline 的 scoped 边框（只保留 Tab 卡片一圈外框）
- `.collapse-header` 去底边、固定高度，改为 `min-height: 40px`、`padding: 0`；Tab 内设置 `flex` + `nowrap`，标题区与 `#right` 工具栏分列
- `.collapse-content` 顶部 `padding-top: 0` 避免与 Tab 内容区叠间距；用 `:not(.collapse-container--border-only)` 保留「仅边框」模式
- `.collapse-header--right .operation-button-container` 清零 `margin/padding`

## 工具栏排查
- 已执行 `node scripts/move-subtable-toolbar-to-headline-right.mjs`，Would update 0 files
- Tab 子表（含 `BuildingChangeTable.vue`）工具栏无需移动

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/styles/index.scss`、`zs-tabs.vue`、`BuildingChangeTable.vue`、`Headline/index.vue`、`progress/change/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：fae19a03-f81a-4ccb-b45c-d5f02b9804a5、347d795c-a17e-454d-9b6d-e10334fa6635；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_subtable_style_fix",
  "source_extraction_id": "0c9fcbb812df4bc98444adb2fa3c05fb",
  "version": 2,
  "memory_type": "entities"
}
-->