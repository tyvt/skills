# 小计行分隔线层级修复
园区物管2.0 中 zs-table 小计行底部分隔线被固定操作列白色背景遮挡。

## 原因
- 固定操作列白色背景盖住表格底部分隔线，单元格 `border-bottom` 因 `overflow: hidden` 显示不出，固定列区域看不到底边。

## 修改
- 将小计行底部分隔线 `.zs-table-subtotal-divider` 的 `z-index` 提至 `14`（高于固定列 `12`），线叠在固定列上方，左右同一条线统一绘制底边。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：benefit/statisticsMap/operatingAssets.vue 等。
- 所属项目：园区物管2.0；来源会话：0e1620c2-4c35-4648-9da8-0d943e149a68；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_subtotal_divider",
  "source_extraction_id": "5b28c23ba34f4fcf8f92896fe45914b5",
  "version": 1,
  "memory_type": "entities"
}
-->