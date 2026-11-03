# report开盘前sync_data_cache定时预拉
report 耗时主要来自外部行情/指标接口；优化方向是磁盘缓存 + 开盘前批量预拉。

## 定时约定
- 每日 09:30（系统时区须为中国标准时间 UTC+8）运行 sync_data_cache.py
- Windows 用 run_sync_cache.bat 写 logs/sync_cache.log
- setup_sync_task.bat 注册计划任务「投资信号数据预拉取」
- 手动重拉：python sync_data_cache.py / --force

## 验证与归属
- 验证证据：会话结论已创建定时任务并说明日志与强制重拉方式
- 涉及文件：sync_data_cache.py、data_cache.py、run_sync_cache.bat、setup_sync_task.bat、logs/sync_cache.log
- 所属项目：投资推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "report开盘前sync_data_cache定时预拉",
  "source_extraction_id": "60534709fe434919bcd02b49e46f5d1a",
  "version": 1,
  "memory_type": "entities"
}
-->