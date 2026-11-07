# 买入金额参考链_alloc_ranking_base
投资推送项目实盘买入金额由 get_buy_amount_reference() 按 alloc → ranking → BASE 顺序决策，回测侧走 resolve_backtest_amounts()。

## Description
- 所属项目：投资推送
- get_buy_amount_reference() 决策顺序：启用 BUY_AMOUNT_POSITION_ALLOC_ENABLED 时用 alloc 基准；否则若启用收益率排名分配则用 ranking；再回退 BUY_AMOUNT_BASE_BY_CODE
- 回测侧入口为 resolve_backtest_amounts()，与 BUY_AMOUNT_RETURN_MAX、年度预算缩放 ANNUAL_INVESTMENT_BUDGET_ENABLED、分档 buy_amount_tiers 联动
- 单指数覆盖环境变量：{CODE}_BUY_AMOUNT 或 BACKTEST_{CODE}_BUY_AMOUNT

## Verification
- 会话 d6b251df 对 config/buy_amount_* 全量枚举与函数职责说明
- 涉及文件：config.py、buy_amount_config.py、buy_amount_allocation.py、buy_amount_ranking.py、buy_amount_tiers.py
- 来源会话ID：d6b251df-a88c-464a-83c0-3070ff54e4e1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "买入金额参考链_alloc_ranking_base",
  "source_extraction_id": "ccabcdfa324f4fd4ad2b8249adc36cd1",
  "version": 1,
  "memory_type": "entities"
}
-->