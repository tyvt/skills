# 选择弹窗表格125%缩放滚动修复
产品2.0 的 zs-select-dialog 在浏览器 125% 缩放下，表格最后一条数据无法滚动到，根因为 tableTrCount 写死与 pageSize 不一致及行高测量偏差。

## 根因
- `tableTrCount` 写死为 8，但 `pageSize` 默认是 10，表格按 8 行算高却要展示 10 行，需内部滚动
- 125% 缩放下固定 48px 行高与实际渲染高度有偏差，Element UI 表格内部滚动 `maxScrollTop` 偏小，最后一行滚不到
- `.dialog-right` 为 flex 布局，表格容器被压缩，进一步加剧滚动问题

## 修复方案
- `zs-select-dialog-func.vue` 与 `zs-select-dialog.vue`：`tableTrCount` 改为 `min(实际行数, pageSize)`，10 条按 10 行算高，无需内部滚动
- 数据加载后调用 `doLayout()` 重新布局；为 `.zs-table-container` 设 `flex-shrink: 0` 防 flex 压缩
- `zs-table.vue`：用 DOM 实测行高/表头高度算表格高度，兼容浏览器缩放；首次渲染后二次校准；窗口缩放时重算高度

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue、zs-select-dialog.vue、zs-table/zs-table.vue、zs-dialog/zs-dialog.vue
- 来源会话ID：319f1f67-a4c9-4880-b1fc-1857c5d03b4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_table_zoom",
  "source_extraction_id": "607720159db4425097b0ade4f7035cb6",
  "version": 1,
  "memory_type": "entities"
}
-->