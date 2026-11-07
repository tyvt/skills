# 本地stockdb成份股加权估算指数股息率
投资推送项目中用本地 stockdb 成份股加权合成指数股息率，以替代易整段零触发的免费官方历史序列，目标误差约 0.2% 内。

## Purpose
- 解决免费且可信的官方历史股息率序列难直接用于股债利差类信号（易整段日期零触发）的问题
- 目标：将合成指数股息率与真实值误差压在约 0.2% 以内，再接入 dividend/a500 等信号模块

## Method
- 利用已有 D:\repository\stockdb\data 的成份与行情数据
- 采用成份股加权合成指数股息率
- 追问数据源后确认需真实股息率

## Involved Files
- 涉及文件：config.py、core.py、market_data.py、dividend_data.py
- 所属项目：投资推送
- 来源会话ID：15eaf5dc-a45b-4a40-a904-8d1a5eb1e146

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "本地stockdb成份股加权估算指数股息率",
  "source_extraction_id": "6fcf19e7f06e4af3ad225cbe9704a787",
  "version": 1,
  "memory_type": "entities"
}
-->