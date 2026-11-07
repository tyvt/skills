# 原生backtest与RQAlphaNAV不一致根因
原生 backtest 与 RQAlpha 成交一致但 NAV 不符时，根因在现金与公司行为顺序。

## 问题机制
- DLV_BACKTEST_PRICE_SOURCE=rqalpha 且 DLV_EXECUTION_AT_CLOSE=true 时，调仓成交与 RQAlpha 完全一致但期末 NAV 仍差约 0.7%（例 ~6881 元），市值可对齐、现金不对齐
- 首日/调仓成交价：原生用约两位小数价，RQ 用 bar 全精度，首日总成本可差 ~1000 元量级
- 除权日处理顺序：应先送股再派息，顺序反了会在送股标的（如 600188）上累积现金差
- 佣金差异可忽略

## 修复方案
- 以 RQAlpha/实盘为真值，改 dividend_lowvol_rotation/backtest.py 的公司行为顺序与调仓成交价来源
- 用 compare_baseline 收敛到 0.05% 以内

## 验证与归属
- 验证证据：2025-08-01 原生现金 408656 vs RQ 401774，市值均为 790056；首日成本 993678 vs 994672；全期佣金 370.90 vs 370.96
- 涉及文件：dividend_lowvol_rotation/backtest.py、dividend_lowvol_rotation/rqalpha/dividend_lowvol_strategy.py、dividend_lowvol_rotation/rqalpha/native_cash_ledger.py、dividend_lowvol_rotation/rqalpha/dividend_tax_sync.py、dividend_lowvol_rotation/rqalpha/compare_baseline.py
- 所属项目：投资推送；来源会话ID：cc5e8c6c-5c51-4f79-b39b-f7ed3b7df657

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "原生backtest与RQAlphaNAV不一致根因",
  "source_extraction_id": "1d75fb91935145c1b20b74a9fc5a671c",
  "version": 1,
  "memory_type": "entities"
}
-->