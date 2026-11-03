# dividend_lowvol_rotation消融约束
投资推送子策略 dividend_lowvol_rotation 有 17 项可消融开关，消融后须保留三项结构约束与核心硬筛。

## Description
- 所属项目：投资推送
- 17 类可消融开关 DLV_*_ENABLED（含 MV_SCORE_PENALTY、MIN_AVG_AMOUNT、SOFT_RISK/ENHANCED_SCORING、各类基本面/估值软过滤、DYNAMIC_THRESHOLD、INDEX_RETENTION_LIQUIDITY 等），删除后统一为硬剔除逻辑
- market_cap.py 中部分过滤已空壳恒 True，config/统计/脚本仍可能引用需一并清理
- 须保留结构约束：MV_TIER_CAP、INDUSTRY_CAP、BETA_BALANCE（均在 scoring.select_with_industry_cap）
- 须保留核心硬筛：股息率、低波含 DYNAMIC_VOL、risk_screening 排雷、绝对质量底线
- attach_enhanced_factors 仅保留 Beta

## Notes
- SOFT_RISK_SCORING / SOFT_ENHANCED_SCORING 在 config.py 默认 true，消融基线脚本里常显式 false

## Verification
- 会话 b3c3f8fe「17 项可消融约束」检索结论与必须保留表
- 涉及文件：dividend_lowvol_rotation/config.py、scoring.py、market_cap.py、dynamic_params.py
- 来源会话ID：b3c3f8fe-8b79-4d45-b23b-e5174cc57f95

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dividend_lowvol_rotation消融约束",
  "source_extraction_id": "ccabcdfa324f4fd4ad2b8249adc36cd1",
  "version": 1,
  "memory_type": "entities"
}
-->