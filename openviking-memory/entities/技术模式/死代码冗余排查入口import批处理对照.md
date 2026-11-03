# 死代码冗余排查入口import批处理对照
投资推送类纯 Python 仓库做冗余分析时，需入口加 import 链加批处理/README 三向对照，避免误删批处理依赖模块。

## 排查方法
- 先枚举顶层结构（排除 .git/__pycache__/.venv），以 report.py、push.py、sync_data_cache.py、backtest_*.py 等为入口根节点
- 全仓 grep import/引用，再与 run_*.bat、setup_task.bat、README、push.example.env 对照
- 被批处理重定向日志调用或 README 写明的模块即使无被其他 .py import，也不应标为「确定可删」，应归入「需确认依赖」并注明 bat/定时任务链路

## 验证与归属
- 验证证据：会话 48b4edb5：Goals 要求找 orphan 模块，且第 7 点明确 bat/cron/README 依赖的文件不要误标可删；方法为全量枚举 + import grep + README/批处理/配置对照
- 涉及文件：report.py、push.py、sync_data_cache.py、run_report.bat、run_push.bat、run_sync_cache.bat、run_backtest_inception.bat、README.md
- 所属项目：投资推送；来源会话ID：48b4edb5-5fc5-4059-ad4a-9ca0bf0e077e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "死代码冗余排查入口import批处理对照",
  "source_extraction_id": "7de63fb7c38a48e2b63cdd0da15fdb08",
  "version": 1,
  "memory_type": "entities"
}
-->