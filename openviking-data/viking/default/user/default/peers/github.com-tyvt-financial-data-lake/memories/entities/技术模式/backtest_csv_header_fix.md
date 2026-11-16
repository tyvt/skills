# 回测读取沪市筛选 CSV 表头修复
数据湖选股回测在读取沪市临时筛选 CSV 时因表头 BOM 与列序问题失败，改为编码兼容并按列名优先、列序兜底解析。

## 问题与根因
- 两市筛选均已完成，回测停在读沪市临时 CSV，文件带 UTF-8 BOM 导致表头未被识别
- 改为 utf-8-sig 并清理列名中的 BOM 后表头仍未匹配，说明问题不止 BOM
- 实际筛选输出按固定列序提供代码与阶段二标志，表头名称不可靠

## 修复方案
- 读取使用 utf-8-sig 并清除列名中的 BOM 字符
- 回测按列名优先、列序兜底的顺序解析代码与阶段二标志
- 把列序兜底读取方式纳入读取自检项

## 进展与归属
- 修复后计划再跑全组回测
- 所属项目：数据湖选股（回测口径统一工作）；来源会话时间：2026-11-15

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "技术模式",
  "name": "backtest_csv_header_fix",
  "source_extraction_id": "f5d706ba700f4503a54cb3c2e4cce372",
  "version": 1,
  "memory_type": "entities"
}
-->