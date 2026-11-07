# Summary
用户从 index.html 的 savedTargetAllocation、allEtfCodes、etfNameMap、DEVIATION_THRESHOLD_MAP 中彻底移除豆粕ETF(159985)，使页面不再拉取行情及显示持仓再平衡。检查无 linter 报错。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】bug
【标题】按照这个配比调整
【内容】已移除 `豆粕ETF(159985)`，并且是“彻底移除”： - 从 `savedTargetAllocation` 删除 `159985` - 从 `allEtfCodes` 删除 `159985` - 从 `etfNameMap` 删除 `159985: 豆粕ETF` - 从 `DEVIATION_THRESHOLD_MAP` 删除 `159985` 阈值配置 这样页面后续不会再拉取它的行情、也不会在持仓/再平衡里显示。 已检查 `index.html`，无 linter 报错。
【验证证据】extracted source=cursor project=repository
【涉及文件】`index.html
【所属项目】repository
【来源会话ID】7df4151d-0bd9-481e-9050-c6497d096212
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "移除豆粕ETF配置",
  "goal": "移除ETF配置",
  "summary": "用户从 index.html 的 savedTargetAllocation、allEtfCodes、etfNameMap、DEVIATION_THRESHOLD_MAP 中彻底移除豆粕ETF(159985)，使页面不再拉取行情及显示持仓再平衡。检查无 linter 报错。",
  "ranges": "7-8",
  "source_extraction_id": "73838604502147988ff44f2acbabf196",
  "version": 1,
  "memory_type": "events"
}
-->