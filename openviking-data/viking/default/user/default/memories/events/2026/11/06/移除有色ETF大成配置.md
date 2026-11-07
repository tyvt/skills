# Summary
用户在 index.html 仅移除有色ETF大成(159980)的配置（savedTargetAllocation、allEtfCodes、etfNameMap、DEVIATION_THRESHOLD_MAP），保留 savedTransactions 中所有 159980 交易记录。文件无 linter 报错。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】preference
【标题】新增一笔交易流水
【内容】已完成：仅移除了“有色ETF大成（`159980`）”的配置，交易流水完全保留。 本次改动在 `index.html`： - 从 `savedTargetAllocation` 删除了 `159980` - 从 `allEtfCodes` 删除了 `159980` - 从 `etfNameMap` 删除了 `159980: 有色ETF大成` - 从 `DEVIATION_THRESHOLD_MAP` 删除了 `159980` 我也检查了，`savedTransactions` 里所有 `159980` 交易记录（含你新增的卖出 4800）都还在。 并且当前文件无 linter 报错。
【验证证据】extracted source=cursor project=repository
【涉及文件】`index.html
【所属项目】repository
【来源会话ID】651e7d06-ffe4-4db5-aa88-cd6aae30725e
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "移除有色ETF大成配置",
  "goal": "移除ETF配置",
  "summary": "用户在 index.html 仅移除有色ETF大成(159980)的配置（savedTargetAllocation、allEtfCodes、etfNameMap、DEVIATION_THRESHOLD_MAP），保留 savedTransactions 中所有 159980 交易记录。文件无 linter 报错。",
  "ranges": "11-12",
  "source_extraction_id": "73838604502147988ff44f2acbabf196",
  "version": 1,
  "memory_type": "events"
}
-->