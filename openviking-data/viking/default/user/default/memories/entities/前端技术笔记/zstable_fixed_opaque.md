# zs-table 固定列横向滚动内容穿透修复
固定列横向滚动时非固定列内容透到固定列下，需给固定列 cell 显式不透明背景，且在公共表格组件层统一改。

## 现象
- 带固定列表格横向滚动时，非固定列内容「透」到固定列下面，看似叠字/穿透。
- 固定列自身无默认背景色，表头/单元格背景透明时下方行内容露出。

## 根因
- 固定列（fixed: left/right）实现为粘性层盖在滚动容器上，无默认背景色。
- 透明背景导致下方横向滚过的行内容从固定列下露出。

## 解决方案
- 给固定列单元格加显式不透明底色（如白色），禁用 background: transparent 或半透明色。
- 改动位置在公共表格组件层（zs-table.vue、zs-table-column.vue、global-table-config.vue），一次改动全站生效，不在每个列表页各写覆盖样式。
- 覆盖样式注意固定列与表头、小计行、悬浮层 z-index 关系（线条压固定列下，悬浮层压其上）。
- 改完必须横向滚动实测：背景不透明、内容不穿透、列宽与省略号不塌；并回归宽表+固定右列典型页面再提 MR。

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、zs-table-column.vue、global-table-config.vue。
- 来源会话：b356b076-63a7-49b4-85f3-8cd11573a39e；代码基线：c96d24c；分支：develop/v2.6.2-huishan。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zstable_fixed_opaque",
  "source_extraction_id": "43a4f8da3c1141c1853fc9a9a3194298",
  "version": 1,
  "memory_type": "entities"
}
-->