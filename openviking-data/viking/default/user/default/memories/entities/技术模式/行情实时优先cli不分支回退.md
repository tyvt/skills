# 行情实时优先CLI不分支回退
report 买卖点位与金额判断优先用可免费/已接入的指数实时快照；命令行不增加「实时/历史」开关。

## 取数链路
- report 买卖点位与金额判断优先用指数实时快照
- 命令行不增加「实时/历史」开关，同一套命令在不同时段都能跑通
- 取数顺序：先实时，实时缺失或无效时再走原有历史/缓存逻辑

## 验证与归属
- 验证证据：用户要求「就用实时的，命令上不要区分，如果实时的没有数据，再用原来的做回退即可」
- 涉及文件：report.py、market_data.py、data_sources.py、cn_broad_data.py
- 所属项目：投资推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "行情实时优先CLI不分支回退",
  "source_extraction_id": "60534709fe434919bcd02b49e46f5d1a",
  "version": 1,
  "memory_type": "entities"
}
-->