# 因子诊断默认 IC 口径为 Spearman Rank IC
AlphaPurify 接入后默认 IC 从 Pearson 改为 Spearman Rank IC，配置与代码兜底默认值需一致。

## 配置维护
- 门槛与 primary_horizon（如 20 日）、IC/IR 阈值、单因子 frequency 覆盖等在 diagnosis_config.yaml / factor_registry.yaml 维护
- CLI 支持 --horizon

## 默认口径
- 后续 20 日口径 primary_horizon=20、阈值 IC 0.010、IR 0.15

## 验证与归属
- 验证证据：用户「将默认 IC 口径从 Pearson 切换为 Spearman Rank IC」
- 涉及文件：config/alphapurify/diagnosis_config.yaml、factor_registry.yaml、scripts/run_factor_diagnosis.py
- 所属项目：投资推送；来源会话ID：rollout-2026-08-26T08-11-21-01a03b68-3af7-76f0-a623-687ee14362d7, rollout-2026-08-26T11-27-41-01a03c1b-fa83-7e81-9a3f-b8e94fdefaeb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "因子诊断默认IC口径为Spearman Rank IC",
  "source_extraction_id": "e07fdff587e743c5a851f45f35658558",
  "version": 1,
  "memory_type": "entities"
}
-->