# config_INDICES仅红利宽基走CN_BROAD
投资推送中 config.INDICES 仅服务红利模块，A 股宽基须在 CN_BROAD_INDEX_BY_CODE 登记。

## INDICES 范围
- `config.INDICES` 只供红利策略（`select_indices()`、`backtest_dividend`、`report -m dividend`）
- 不是全项目指数注册表

## 宽基登记方式
- A 股宽基（沪深300/中证1000/A500/拟接入的 000905、000688 等）应在 `cn_broad_data.CN_BROAD_INDEX_BY_CODE` 登记 code
- 共用 `cn_broad_data`/`cn_broad_signal` 与 `get_cn_broad_signal_config(index_code)`
- 分指数默认阈值在 `_CN_BROAD_PER_INDEX_DEFAULTS`（键为指数 code）
- 新增宽基时勿只改 INDICES

## 验证与归属
- 验证证据：会话 66471137 梳理 config：INDICES 表仅 930955/H30269；宽基为独立常量 dict；cn_broad 白名单在 cn_broad_data
- 涉及文件：config.py、cn_broad_data.py、cn_broad_signal.py、report.py、backtest_buy_signals.py
- 所属项目：投资推送；来源会话ID：66471137-806e-41aa-b92c-c3ddc7dbd584

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "config_INDICES仅红利宽基走CN_BROAD",
  "source_extraction_id": "60841822c49f4807b9640edac955d078",
  "version": 1,
  "memory_type": "entities"
}
-->