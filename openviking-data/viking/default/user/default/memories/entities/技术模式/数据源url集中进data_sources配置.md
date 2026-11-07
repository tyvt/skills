# 数据源url集中进data_sources配置
投资推送项目要求将分散在各脚本的抓取地址汇总到单一配置文件 data_sources.py / config 并附说明。

## Purpose
- 避免 compare_broad_indices 与 market_data 各写一套数据源
- 将本次用到的获取数据地址与项目内其它脚本数据源汇总到单一配置

## Solution
- 汇总到 data_sources.py / config 并附文字说明
- 宽基回测、行情脚本曾分散引用不同抓取地址，需统一

## Involved Files
- 涉及文件：data_sources.py、config.py、compare_broad_indices.py、market_data.py
- 所属项目：投资推送
- 来源会话ID：60bb7ce4-2e38-4d46-af4c-7a6f738d7055

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "数据源url集中进data_sources配置",
  "source_extraction_id": "6fcf19e7f06e4af3ad225cbe9704a787",
  "version": 1,
  "memory_type": "entities"
}
-->