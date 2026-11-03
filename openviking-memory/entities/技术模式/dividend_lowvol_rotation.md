# dividend_lowvol_rotation 消融验证与硬约束
子模块 `dividend_lowvol_rotation` 经 ablation 验证，大量开关禁用后零影响可删，仅三项硬约束必须保留。

## 可删开关
- MV_SCORE_PENALTY、MIN_AVG_AMOUNT、SOFT_RISK_SCORING、SOFT_ENHANCED_SCORING、SUSTAINABLE_DIVIDEND、YIELD_SPREAD_PERCENTILE
- 多项基本面/除息冷却/DYNAMIC_THRESHOLD 等禁用后零影响，可删代码路径

## 必须保留
- MV_TIER_CAP、INDUSTRY_CAP、BETA_BALANCE 三项硬约束
- 清理 MV_SCORE_PENALTY 时不能拆掉 `total_mv` 拉取与 `attach_market_fields`，因 MV_TIER_CAP 仍依赖市值字段

## 验证与归属
- 验证证据：会话 aa4d8187 逐项列出 config 行号、实现函数及「删 MV_SCORE_PENALTY 后 MV_TIER_CAP 仍要 total_mv」
- 涉及文件：d:/repository/投资推送/dividend_lowvol_rotation/config.py、index_portfolio.py、market_cap.py、scoring.py
- 所属项目：投资推送；来源会话ID：aa4d8187-2a0c-474f-acf1-d64fcd8c1ab3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dividend_lowvol_rotation",
  "source_extraction_id": "87bbe90e6a1d44dd84d3d8a8e80dc81d",
  "version": 1,
  "memory_type": "entities"
}
-->