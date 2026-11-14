# dsh-token-models
DSH 面板中用于统计各模型 token 用量与耗时的插件。

## 描述
- 基础功能：聚合展示各模型的 prompt、completion、total、calls、roles 用量指标。
- 新增特性：后端聚合 elapsedSec（模型累计耗时），前端增加“累计耗时”列与 fmtDur 格式化函数。

## 部署位置
- 仓库源码：D:\repository\skills\dsh\token-models\lib（提交 7a75b23f 含耗时功能）。
- 已安装副本：C:\Users\Administrator\.dsh\profiles\web\node_modules\dsh-token-models\lib（旧版，无耗时代码）。
- 部署方式：普通目录拷贝，非符号链接，仓库提交不会自动同步。

## 关系
- 数据源：.costs.jsonl 含 elapsed 字段（秒级）。
- 运行端点：GET /api/token-models/orchestrator-usage 当前仅返回 model,prompt,completion,total,calls,roles，无 elapsedSec。


<!-- MEMORY_FIELDS
{
  "category": "DSH面板插件",
  "name": "dsh_token_models",
  "source_extraction_id": "1aeaf8ff404d4c37936b5faa34a6f949",
  "version": 1,
  "memory_type": "entities"
}
-->