# report_push统一入口与三模块推送约定
投资推送项目抽象后本地报告与微信推送统一入口，支持 -m 指定 dividend|a500|cyb 三模块，定时任务默认全推。

## Description
- 本地报告：python report.py -m dividend|a500|cyb，默认全模块
- 微信推送：python push.py 同样 -m 语义
- core.py 已库化，仅保留红利模块库函数（如 generate_report()），无 CLI 入口，不再作为命令行调用
- 定时任务 run_push.bat 默认推送全部三模块；若只要红利需显式 python push.py -m dividend

## Verification
- 统一入口表与「定时任务 run_push.bat 无需改动，默认会推送全部三个模块」
- 涉及文件：report.py、push.py、core.py、run_push.bat
- 所属项目：投资推送
- 来源会话ID：15eaf5dc-a45b-4a40-a904-8d1a5eb1e146

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "report_push统一入口与三模块推送约定",
  "source_extraction_id": "ccabcdfa324f4fd4ad2b8249adc36cd1",
  "version": 2,
  "memory_type": "entities"
}
-->