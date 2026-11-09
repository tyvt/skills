# config.js
持仓面板的配置文件，由 final_portfolio_v3.py 导出生成。
## 内容
- 包含 port 数组，每只标的含 payout2y、ocfd2y 字段
- targets[] 含 governance、rules、margin 等配置
- 2026-11-06 20:54 生成，含 9 只标的：8 只来自「打新底仓_最终8只组合_v2.csv」(w>0) + `000429.SZ 粤高速A`(w=0、held=true 手工持仓)
- margin.targetYld 固定为 4.8%
## 关系
- 由 final_portfolio_v3.py 写入
- 被持仓面板前端 HTML 使用
- 与 holding.sqlite 的 setting.cfg 完全一致（面板运行时以库内配置为准）


<!-- MEMORY_FIELDS
{
  "category": "配置文件",
  "name": "config.js",
  "source_extraction_id": "b26862bbbb3248ed8dd7f70dfda2437e",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 2,
  "memory_type": "entities"
}
-->