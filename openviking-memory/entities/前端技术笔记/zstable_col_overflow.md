# zs-table 自适应列溢出遮挡相邻列
园区物管2.0 的 zs-table 自适应列在内容超长时会溢出遮挡右侧相邻列，仅需两处收口即可修复。

## 现象
- zs-table「自适应列宽」列内容超长时溢出渲染，遮挡右侧相邻列（如压住「启用标识」列）。

## 根因
- 自适应列的 .cell 沿用 element-ui 的 overflow: visible，内容超过分配宽度后直接溢出。
- 此前加的 contentExceedsMax 状态、双套省略样式类、均分二次封顶等逻辑全属冗余。

## 修复方案
- element-ui.scss 里自适应列 .cell 改 overflow: hidden + text-overflow: ellipsis。
- zs-table-column.vue 的自适应列开启 showOverflowTooltip: true，悬停看全文。
- 列宽算法已有 MAX_COLUMN_WIDTH = 500 上限，封顶后 CSS 省略号自动生效，可删除所有 JS 层「是否超长」状态与样式类。

## 关联信息
- 正常宽度表格走 ellipsis + tooltip，窄屏才走横向滚动，二者处理不同。
- 涉及文件：zs-table-column.vue、zs-table.vue；代码基线 fb0e2899f。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zstable_col_overflow",
  "source_extraction_id": "37c782270dad448bb86143b13a756fbb",
  "version": 1,
  "memory_type": "entities"
}
-->