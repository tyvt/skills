# 建仓死权重转移机制（已废弃）
持仓面板 buildPlan 原含价格淘汰与死权重转移机制，由 github.com-tyvt-financial-data-lake 提出并落地；2026-11-11 架构重构后面板退化为无脑执行者，仅平分 Python 下发的 buy_list，面板侧死权重转移逻辑已不再生效。

## 原机制（仅供追溯）
- rules.max_gap_pct 默认 15：现价比目标买价高出 15% 以上的标的，本轮直接淘汰，跳过原因「权重已释放」
- 进不了候选的标的（太贵/基本面越线/无行情）其目标权重按比例加到能买候选股，仍受单票 25% 与行业 35% 上限约束
- 示例：永兴股份 w=11.2% 因唐山港(13.3%,差21.9%)、平安银行(13.5%,差6.7%)被踢出，回收 26.8% 权重后升至 25%（被单票上限截断）
- 阈值存 config.js 的 rules.max_gap_pct，面板未读到时用默认 15；改 config.js 后需点「从 config.js 同步」；自测通过：被踢出后原只能买约 1.1 万的标的实际买到 2.4 万

<!-- MEMORY_FIELDS
{
  "category": "量化系统",
  "name": "holding_panel_deadweight",
  "source_extraction_id": "489cd2ba9ab341da86bceacfa3b2c76c",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 2,
  "memory_type": "entities"
}
-->