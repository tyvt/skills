# 低波Top加调仓缓冲保留池与卖上限
vectorbt 红利低波实现约定：波动率 strict Top10、缓冲保留池、每期卖上限与买卖互斥。

## 实现约定
- 波动率按截面 strict Top10（与股息 Top10 对齐），配置入口 volatility_filter.mode=top、top_n=10
- 缓冲保留要求持仓仍在「波动率 Top30 且股息率 Top30」池内，仍合格则尽量不卖
- 每期最多卖出 3 只，其余不合格顺延
- 满仓扩展遵守单股 ≤8%，平均持仓约 13–14 只

## 验收要求
- 验收需保证调仓期买卖集合无重叠（同月卖出又买回为 0）
- 消融与三阶段对比脚本用于验收

## 验证与归属
- 验证证据：119 次调仓均满足每期最多卖 3 只；买卖重叠 0；缓冲池 Top30+Top30；42/42 测试通过
- 涉及文件：config/vectorbt/strategy_params.yaml、config/vectorbt/ablation_config.yaml、vbt/strategies/signal_generators.py、vbt/strategies/dividend_lowvol.py、scripts/run_ablation.py、scripts/compare_ablation_results.py
- 所属项目：投资推送；来源会话ID：rollout-2026-08-27T08-48-51-01a040b0-e9b4-7a90-8b73-d9b8e9142ea5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "低波Top加调仓缓冲保留池与卖上限",
  "source_extraction_id": "1d75fb91935145c1b20b74a9fc5a671c",
  "version": 1,
  "memory_type": "entities"
}
-->