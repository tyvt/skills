# screen_sh.py
沪市筛选脚本，重新生成沪市筛选结果 CSV。

## 关键逻辑
- 与 `screen_sz.py` 同为筛选脚本，重新生成沪深筛选结果 CSV
- 2026-11-11 本轮改为上市不满3年硬剔除（不分市场），永兴股份(601033)因2024-01上市不满3年被剔除
- 沪市漏斗：2236→1360→225→63→54→35→35→34→33→29→25→分红>10亿→19 只（见国资特例白名单记忆）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "量化系统",
  "name": "screen_sh_py",
  "source_extraction_id": "0930b07e715c452a87b9125bb4a5dba6",
  "version": 1,
  "memory_type": "entities"
}
-->