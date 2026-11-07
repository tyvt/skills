# 红利低波轮动live报告资金与按手建仓
子包 dividend_lowvol_rotation 的 live 建仓报告资金解析与按手建仓规则。

## 资金解析顺序
- report.py 输出 Markdown 建仓报告时，初始资金解析顺序为 CLI `--capital` → 环境变量 `DLV_PORTFOLIO_CAPITAL_CNY` → 默认 10 万（与回测一致）

## 按手建仓与报告字段
- `plan_portfolio_allocation` 按目标权重分配资金，买入股数向下取整到 100 股/手并计入单边佣金
- 报告需写明初始资金、预估总投入/佣金/剩余现金及每标的「买入股数」「预估金额」

## 验证与归属
- 验证证据：会话 c8260224 用户要求 md 写明买入股数与初始资金，实现 costs.py 资金解析与 plan_portfolio_allocation 取整手数，示例 80 万资金跑通 live_report
- 涉及文件：dividend_lowvol_rotation/report.py、costs.py、index_portfolio.py
- 所属项目：投资推送；来源会话ID：c8260224-aa62-4b8a-89e4-08e1ed7a6dc3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "红利低波轮动live报告资金与按手建仓",
  "source_extraction_id": "60841822c49f4807b9640edac955d078",
  "version": 1,
  "memory_type": "entities"
}
-->