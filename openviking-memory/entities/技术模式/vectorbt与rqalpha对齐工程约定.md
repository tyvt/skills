# VectorBT与RQAlpha对齐工程约定
接入 VectorBT 时须与既有 RQAlpha 结果隔离并完整对齐其规则。

## 环境隔离
- 使用独立虚拟环境 `.venv-vectorbt`，不改动 `rqalpha_env`
- 十年基准与报告写入 `output/vectorbt/baselines/` 与 `output/vectorbt/reports/`，不覆盖既有 RQAlpha 结果

## 数据口径
- close/total_mv/is_st 从 `stock_daily` 加载，行业从现有行业缓存加载
- 因子矩阵保留源数据单位，YAML 策略阈值按需做单位转换

## 验收目标
- 与 RQAlpha 完整规则对齐（共同交易日净值、回撤、期末持仓等）

## 验证与归属
- 验证证据：会话 rollout-2026-08-25 用户四项确认「完整对齐 RQAlpha」「close/total_mv/is_st 从 stock_daily」「新基准单独 baselines/」「独立 .venv-vectorbt」；验收逐日净值差 0.0000、Top10 重合 100%
- 涉及文件：scripts/run_vectorbt_pipeline.py、output/vectorbt/reports/validation_report.md、README.md
- 所属项目：投资推送；来源会话ID：rollout-2026-08-25T11-24-34-01a036f2-c18a-7a10-adea-524c1f695b32

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "VectorBT与RQAlpha对齐工程约定",
  "source_extraction_id": "cb15ba5cdfbb4d20879b95d5b70b8e32",
  "version": 1,
  "memory_type": "entities"
}
-->