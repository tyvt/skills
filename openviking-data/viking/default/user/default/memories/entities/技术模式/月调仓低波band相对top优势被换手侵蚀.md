# 月调仓低波Band相对Top优势被换手侵蚀
红利低波策略月调仓并计入交易成本后，Band 的毛利优势被换手大幅侵蚀，常不如 Top + 缓冲。

## 诊断与实盘差异
- 固定 20 日诊断口径下 Band 筛选往往优于 Top（例 Band 13.85% vs Top 9.92%）
- 月调仓并计入交易成本后，Band 毛利优势大幅缩窄（约 1.5%→0.1% 量级）
- Top 换手率可仅为 Band 的约 40%（月调仓毛回测 9.69% vs 8.20%，含成本 7.26% vs 7.14%，换手 51.92% vs 22.61%）

## 结论与决策依据
- 不能只用短窗诊断选筛选模式；月频实盘/回测应以含成本换手为决策依据
- Band 在月调仓下常不如 Top + 缓冲；回滚 Top+Buffer 后年化 16.71%、夏普 0.70、年均单边换手 23.37%

## 验证与归属
- 验证证据：会话对比表与回测数据
- 涉及文件：config/vectorbt/strategy_params.yaml、vbt/strategies/signal_generators.py、vbt/strategies/dividend_lowvol.py、vbt/strategies/ablation.py
- 所属项目：投资推送；来源会话ID：rollout-2026-08-27T08-48-51-01a040b0-e9b4-7a90-8b73-d9b8e9142ea5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "月调仓低波Band相对Top优势被换手侵蚀",
  "source_extraction_id": "1d75fb91935145c1b20b74a9fc5a671c",
  "version": 1,
  "memory_type": "entities"
}
-->