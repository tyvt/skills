# 对话框使用 gap 替代重叠边距
调整对话框中的间距，其中左右边距造成了过多空白。

## 描述
- `.dialog-box` 在左侧使用了 `margin-right:24px`，在右侧使用了 `padding-left:20px`，合计约 44px 的空白。
- 改为 `gap:16px`，移除横向间距，可调整为 `12px`。

## 受影响的文件
- `zs-dialog.vue`, `chooseHouseDialog.vue`, `HouseSelectDialog.vue`, `contractMainInfo/index.vue` 等。

## 验证
- 来源: 苏州市房地产监测V3/073.md; 会话 aa2afcf7-1398-4cdf-93b4-30183eff923a.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_box_gap_margin_replace",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "entities"
}
-->