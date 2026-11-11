# 深市红利低波选股标准
数据湖选股模块（final_portfolio_v3.py 等）使用的深市专用筛选标准，从基础池经多道关卡筛选红利低波标的。

## 筛选关卡
- 基础池：深市候选股票
- 财务四关：股息率>2.5%、波动<25%、OCF/分红>1、支付率<100%
- 治理关：通过 / 待确认 / 否决（否决直接剔除）

## 银行专项门
- 仅对银行股生效，券商暂无专项门
- 核心一级资本充足率 ≥9.5%
- 不良贷款率 ≤1.5%
- 拨备覆盖率 ≥180%
- 三项全达标方可通过专项门

## 关联文件
- `_治理预览.csv`：治理结论 + 财务指标合并表
- `_低波财务支付_预览.csv`：财务指标源表
- `bank_screen.py`：含 bank_gate(symbols, is_bank, metrics=None) 接口，返回 dict: symbol→(ok, reason)
- `深市专用标准_筛选结果.csv`：正式结果 CSV


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "选股标准",
  "name": "shenzhen_dividend_screen",
  "source_extraction_id": "f2d5dd859d1c40d298fb1fb7e3326107",
  "version": 1,
  "memory_type": "entities"
}
-->