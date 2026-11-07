# 美股PEG估值回退链接入
美股买入估值使用 Forward PE 缓存与增速多级回退链，并要求 PEG 实际接入 is_buy 判定。

## 估值与增速规则
- Forward PE 来自 historyofmarket.com 并本地缓存；买入估值有 Forward 用 Forward PE 分位，否则 TTM
- PEG 增速链：显式配置 → 隐含增速 → 5 年历史 CAGR → 兜底（NDX 19%、SPX 10%）
- 有 Forward 时用 Forward PEG，否则 TTM + 历史/兜底增速
- 文档章节「美股估值数据与 PEG 回退逻辑」为权威说明

## 接入要求
- `us_index_signal.py` 需让 PEG 实际参与判定，避免仅有配置未接入 `is_buy`
- 代码已接入 PEG 买入条件（此前仅有配置、未参与判定）

## 验证与归属
- 验证证据：cf508db9 README 补充与「代码：us_index_signal.py 已接入 PEG 买入条件」
- 涉及文件：us_index_signal.py、README.md
- 所属项目：投资推送；来源会话ID：cf508db9-302c-47aa-92bc-7a486f51d464

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "美股PEG估值回退链接入",
  "source_extraction_id": "4b365bbbc85e45e4befb03a8d2bb8701",
  "version": 1,
  "memory_type": "entities"
}
-->