# 日频调仓daily_monitor语义
红利低波回测中 --daily-monitor 参数与用户期望的日频买卖语义存在差异，需分别跑回测对比。

## 参数语义
- --daily-monitor 表示每个交易日检查卖点，但买入仍按固定调仓周期（每日只卖、定期才买）
- 用户要的日频买卖是：卖点触发卖出后同日按排名买入新标的

## 验证流程
- 改语义前后需分别跑日频回测对比 HTML/净值
- 先汇报明显计算瓶颈再拉长窗口（如 10 年）
- 涉及文件：dividend_lowvol_rotation/backtest.py、strategy.py、config.py
- 所属项目：投资推送；来源会话ID：b0893a98-b49c-4906-badb-11b0682d3261

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "日频调仓daily_monitor语义",
  "source_extraction_id": "be1298dcc5b446338f9b296050c4d29e",
  "version": 1,
  "memory_type": "entities"
}
-->