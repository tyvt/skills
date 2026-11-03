# roe_volatility 与 roe_volatility_ratio 回看窗口不同
投资推送项目中 `roe_volatility` 因子与 `roe_volatility_ratio` 风控指标使用不同年限的 ROE 回看窗口，询问「用了几年 ROE」时须先分清路径。

## 因子定义（factor_builder）
- `scripts/factor_builder.py` 的 `roe_volatility`：取最近 8 个年度 ROE
- 计算样本标准差，且必须刚好有 8 条年度观测，不足则为 NULL

## 风控逻辑（risk_screening）
- `dividend_lowvol_rotation/risk_screening.py` 的 `roe_volatility_ratio`：默认最近 5 年 ROE 波动
- 可用环境变量 `DLV_RISK_LOOKBACK_YEARS` 覆盖回看年限

## 验证与归属
- 验证证据：会话 rollout-2026-08-26T11-20-14 用户问 roe_volatility 几年标准差；助手查代码给出 8 年因子 vs 5 年风控 ratio 及 DLV_RISK_LOOKBACK_YEARS
- 涉及文件：scripts/factor_builder.py、dividend_lowvol_rotation/risk_screening.py
- 所属项目：投资推送；来源会话ID：rollout-2026-08-26T11-20-14-01a03c15-2861-78e3-a5c0-1d8a29f75765

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "roe_volatility与roe_volatility_ratio回看窗口不同",
  "source_extraction_id": "6be6954386be412d8f023f0533336de3",
  "version": 1,
  "memory_type": "entities"
}
-->