# zs-table 固定列遮挡小计行分隔线
园区物管2.0 的 zs-table 带固定列且有自定义小计行时，固定列白色背景遮挡小计行底部分隔线，需将分隔线 z-index 提到固定列之上。

## 现象
- 固定操作列（fixed 列 z-index=12）时，小计行内容透过固定列显示。
- 单独抬高固定列背景后，小计行底部分隔线被盖住或因单元格 overflow:hidden 画不出，固定列区域缺失底边。

## 根因
- 固定列靠 z-index 叠在普通单元格之上，任何 z-index 低于它的内容（含分隔线细条）被白色固定列背景遮挡。
- 固定列单元格内部补边框受 overflow 与边框归属影响难以对齐。

## 修复方案
- 不改固定列自身层级或逐格补边框，将小计行底部分隔线（.zs-table-subtotal-divider）的 z-index 提到 14（>12），让线叠在固定列上方。
- 左右两侧由同一条线统一绘制底边，保证固定列下方底边与左侧小计行对齐。
- 复用套路：凡「固定列盖住某条线/元素」类问题，优先检查双方 z-index（基准 12），线条类装饰元素提到 14 层。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue、zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/styles/element-ui.scss。
- 所属项目：园区物管2.0；来源会话：0e1620c2-4c35-4648-9da8-0d943e149a68；代码基线：55cd8653c。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zstable_subtotal_divider",
  "source_extraction_id": "9147c18620be4462a8dc49a228e2758c",
  "version": 1,
  "memory_type": "entities"
}
-->
