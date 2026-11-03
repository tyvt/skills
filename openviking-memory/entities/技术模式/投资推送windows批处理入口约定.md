# 投资推送Windows批处理入口约定
投资推送项目通过 Windows 批处理文件作为日常操作的统一入口，串联对应 Python 脚本完成报告、推送、缓存与回测。

## 批处理入口
- run_report.bat 调用 report.py 生成本地报告
- run_push.bat 调用 push.py 并写入 logs/push.log
- run_sync_cache.bat 调用 sync_data_cache.py 同步数据缓存
- run_backtest_inception.bat 串联 backtest_buy_signals.py 与 backtest_trade_signals.py 做自基日全历史回测

## 排查约定
- 排查「脚本是否在用」时优先查对应 bat，而非仅查 Python 互引
- 验证证据：会话 48b4edb5 批处理表与会话 194c1fa9 用户诉求「增加 windows 脚本」
- 涉及文件：run_report.bat、run_push.bat、run_sync_cache.bat、run_backtest_inception.bat
- 所属项目：投资推送；来源会话ID：48b4edb5-5fc5-4059-ad4a-9ca0bf0e077e, 194c1fa9-e4a4-4b24-a1b6-32a7114a60a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "投资推送Windows批处理入口约定",
  "source_extraction_id": "689d404357eb4c9b968517a38c9f59f4",
  "version": 1,
  "memory_type": "entities"
}
-->