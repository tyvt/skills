# zs-table 小计合计双来源
zs-table 的小计与合计是两条独立通道：小计由 summary-method/showMethod 控当前页累加，合计由 bottom-summary-items 传接口全量统计。

## 现象
- 列表页小计改为分页累加后，表格下方 ZsSummaryText 文字条也同步变成当前页值，小计合计显示完全一致。

## 根因
- zs-table 底部行为「小计」，由 summary-method/showMethod 控制。
- ZsSummaryText 文字条默认直接复用小计行数值，无独立数据源，导致一动小计合计就同步变。

## 解决方案
- 合计不依赖小计，通过 :bottom-summary-items 单独传入接口返回的全量统计（如 totalUnit、totalHouse）。
- 小计继续由 showMethod 对当前页 data 累加。
- 约定：小计=当前页前端求和、合计=接口返回全量 summary，两条通道分开传参；翻页时小计变、合计恒定。

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/views/property/complex/components/rangeTable.vue、zhi2-web-admin/src/components/ZsSummaryText/index.vue 等。
- 所属项目：园区物管2.0；来源会话：4d6c0599-62a1-4620-bba9-35eec0a0c116；代码基线：177bc3ce4。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_table_summary",
  "source_extraction_id": "5219c7a7105248f8b4405359a4b162dd",
  "version": 1,
  "memory_type": "entities"
}
-->