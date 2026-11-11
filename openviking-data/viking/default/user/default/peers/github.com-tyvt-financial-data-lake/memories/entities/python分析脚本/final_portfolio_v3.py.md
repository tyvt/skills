# final_portfolio_v3.py
数据湖项目中用于生成持仓面板配置的分析脚本。
## 功能
- 按财年合并净利/OCF/分红，计算最近两个完整财年的 payout2y、ocfd2y
- 为每个 targets[] 增加 governance 字段（由实控人核查.csv 的 owner_type 映射）
- 补齐 PANEL_CONFIG 的 rules（含 max_buys/min_ticket 等）与 margin 块（生成的 config.js 中 margin.targetYld 为 4.8%，与主仓先前约定一致）
- 2026-11-11 起按 score（波动率倒数）排序写出 `buy_list`，取前 min(3, floor(金额/3000)) 只，max_buys 改为 3；面板仅执行 buy_list，不再自行打分或判断
- 包含 panel_extra 块（依赖 configs/panel_extra_targets.json，该文件未纳入版本库，换环境重跑会丢 000429.SZ；main 未提交改动，2026-11-06 合并时通过 stash 保留恢复）
- 导出 config.js 及 CSV 新增 payout2y/ocfd2y 列
## 读取依赖
- 2026-11-11 将 line 592 从硬编码读取 `深市替补席_2026-11-04.csv` 改为读取 `深市替补席_2026-11-06.csv`（最新产出），重跑报表 19/19 通过
- 硬编码 `BASE='2026-11-06'`，读取 `打新底仓_成员权重_2026-11-06.csv` 作为权重输入；全量重跑须统一以 2026-11-06 为基准

## 关系
- 属于数据湖选股模块分析产出脚本
- 与 qa_checks.py 配合校验输出

<!-- MEMORY_FIELDS
{
  "category": "Python分析脚本",
  "name": "final_portfolio_v3.py",
  "source_extraction_id": "cba0f2217b8745baa719b9636a097c32",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 7,
  "memory_type": "entities"
}
-->