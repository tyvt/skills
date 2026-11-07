# _build_portfolio_by_code死代码
投资推送项目回测 --portfolio 使用的分指数金额来自 config 静态表，config._build_portfolio_by_code() 为无调用链的死代码。

## Description
- 所属项目：投资推送
- 回测 --portfolio 的分指数金额来自 config._BACKTEST_BUY_AMOUNT_DEFAULTS 等静态表，而非动态组合分配
- config._build_portfolio_by_code() 在全仓无调用链，是死代码
- PORTFOLIO_US_NDX_SHARE / PORTFOLIO_SAT_CYB_SHARE 等常量仅被该死函数读取

## Refactor Guidance
- 做「去掉组合比例、统一基准金额」类改造时，优先删/并 portfolio 静态表与 resolve_backtest_amounts() 入口
- 勿误以为动态组合函数仍在生效

## Verification
- 会话 d6b251df 盘点表标注 _build_portfolio_by_code「未被调用」、--portfolio 固定分指数金额
- 涉及文件：config.py、buy_amount_config.py、backtest_buy_signals.py
- 来源会话ID：d6b251df-a88c-464a-83c0-3070ff54e4e1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "_build_portfolio_by_code死代码",
  "source_extraction_id": "ccabcdfa324f4fd4ad2b8249adc36cd1",
  "version": 1,
  "memory_type": "entities"
}
-->