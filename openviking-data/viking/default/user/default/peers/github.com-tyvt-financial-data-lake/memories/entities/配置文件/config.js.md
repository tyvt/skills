# config.js
持仓面板的配置文件，由 final_portfolio_v3.py 导出生成。

## 内容
- 包含 port 数组，每只标的含 payout2y、ocfd2y 字段
- targets[] 含 governance、rules、margin 等配置
- 2026-11-11 更新：目标名单从 9 只扩容至 31 只（沪市8只全过低波/流动性/股息异常三项 + 深市23只治理核查通过）
- 原9只中对得上的治理与行业风控字段保留，权重改为均分，每只约 3.23%
- margin.targetYld 固定为 4.8%
- 2026-11-15 配置核对通过：目标 7 个（5 个组合标的 + 2 个手工持仓，人工目标 held=true 且权重 0）、无重复、权重合计 100%；候选清单 10 个，JS 语法有效

## 关系
- 由 final_portfolio_v3.py 写入
- 被持仓面板前端 HTML 使用
- 与 holding.sqlite 的 setting.cfg 完全一致（面板运行时以库内配置为准）
- 面板读库内配置，改 config.js 后需在页面点「从 config.js 同步」才生效
- 同步时在单个 SQLite 事务中只更新 cfg、cfgSyncedAt、cfgSource，提交前与备份逐表比对其他数据
- 下次重跑 final_portfolio_v3.py 会把本文件整份覆盖回脚本自算组合

<!-- MEMORY_FIELDS
{
  "category": "配置文件",
  "name": "config.js",
  "source_extraction_id": "e2e3b8fb28c54872a9a553b30677199e",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 4,
  "memory_type": "entities"
}
-->