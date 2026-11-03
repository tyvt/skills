# 因子集市复用CSV全量生成Parquet无误差
因子集市基于现有CSV全量生成Parquet，统一物理Schema且误差极小，作为因子数据构建的可靠基线。

## 构建结果
- 6因子共 112,436,766 行，物理 Schema 统一
- 股息率抽检零误差，其余误差低于 1e-15
- 全量构建耗时约 4 分 4 秒，全历史加载单因子 1.97 秒

## 核心交付
- factor_builder.py、factor_loader.py 及 manifest.json
- 验证证据：会话 rollout-2026-08-25T08-40-12-01a0365c-491b-7070-b2b8-ce2a8e119887
- 涉及文件：factor_builder.py、factor_loader.py、manifest.json
- 所属项目：投资推送；来源会话ID：rollout-2026-08-25T08-40-12-01a0365c-491b-7070-b2b8-ce2a8e119887

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "因子集市复用CSV全量生成Parquet无误差",
  "source_extraction_id": "33cd42efac844be68ceaaba7e4e2d348",
  "version": 1,
  "memory_type": "entities"
}
-->