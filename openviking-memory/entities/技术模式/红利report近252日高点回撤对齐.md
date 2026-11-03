# 红利report近252日高点回撤对齐
分红指数报告 build_dividend_signal_eval 须与 is_buy_signal() 一致的「近252日高点回撤」条件，避免达标项计数与回测硬门槛不一致。

## 问题背景
- 若缺少「近252日高点回撤」条件，达标项计数与回测硬门槛不一致（例如少 1 项）

## 修复方案
- 使用 effective_drawdown_threshold + make_drawdown_from_high_criterion
- 未达标须进入「未达标项」摘要

## 验证与归属
- 验证证据：对齐回测后 H30269 示例新增「✗ 近252日高点」行，达标从 3/6 变为 3/7
- 涉及文件：core.py、report.py、backtest_buy_signals.py、cn_broad_signal.py
- 所属项目：投资推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "红利report近252日高点回撤对齐",
  "source_extraction_id": "60534709fe434919bcd02b49e46f5d1a",
  "version": 1,
  "memory_type": "entities"
}
-->