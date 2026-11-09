# 持仓面板目标股息率策略
持仓面板（分析产出/持仓面板/）的目标股息率选股模块，按个股近3年股息率历史动态定价。

## 策略参数
- targetYldMode=dynamic：按个股近3年股息率历史动态定价，非 fixed 一刀切
- targetYldFloor=3.0：低均值标的兜底底线
- yldPadPct=0.5：要求当前股息率比历史均值高 0.5 个百分点
- targetYld=4.8：仅作参考值，dynamic 模式下不参与计算
- 买入硬门槛：当前股息率 ≥ max(3.0, 近3年均值+0.5)
- margin_by_ind 按申万一级行业覆盖全局参数（如银行 fixed 5.5%、公用事业下限3.0%），覆盖时以行业参数为准，详见「分行业择时矩阵」实体

## 判定逻辑
- floor 只决定低均值标的兜底，调 floor 无法让「当前股息率低于自身历史均值」的标的可买
- 卡住兴蓉环境（3.23%）、唐山港（4.15%）的是正 yldPadPct 与「必须比历史平均更便宜」的判定本身
- 用户于 2026-11-09 早间确认保持现状、不再改全局判定逻辑；同日后续提出「分行业择时矩阵」新增 margin_by_ind 按行业覆盖全局参数（详见「分行业择时矩阵」实体），全局动态逻辑本身未变

## 归属与改动
- 改动文件：config.js、final_portfolio_v3.py、README.md、_selftest.js、holding.sqlite（库内 cfg 同步，面板以库为准）
- 本地提交 5e721c3c、89eaa08c，按用户选择未推送远端

<!-- MEMORY_FIELDS
{
  "category": "投资组合工具",
  "name": "holding_panel_yield",
  "source_extraction_id": "55955a178e9b4d8594c4786c62e6f612",
  "version": 2,
  "memory_type": "entities"
}
-->