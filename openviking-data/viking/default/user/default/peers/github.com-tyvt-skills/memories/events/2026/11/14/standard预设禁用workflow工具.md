# Summary
2026-11-14，在 ~/.dsh/profiles/web/cordis.patch.yml 的 preset-standard 内为 tool-workflow 添加 `disabled: true`，改动前备份为 .bak-p1b-20261114152151；语义 diff 仅此一行，行数由 1417 增至 1418，其余变化是 dsh web 写回时的空格规范化。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 发了，验证
...
**assistant [peer=github.com-tyvt-skills]**: 批 2 全部验证通过，收尾。

## 批 2 收敛报告

**结论**：批 2（方案 B：只裁 workflow）已实施并全 6 条断言验证通过——每步再省 **848 token**，session_search 等零误伤，full-tools 兜底闭环成立。

**改动**（`~/.dsh/profiles/web/cordis.patch.yml`，备份 `.bak-p1b-20261114152151`）：
- `preset-standard` 内 `tool-workflow` 加 `disabled: true`（**语义 diff 仅此一行**；dsh web 写回时对 `input:[text,image]` 做了无害空格规范化）

**验证证据**（重启后全新会话，非长会话中途）：

| 断言 | 结果 |
|---|---|
| A workflow 消失 | ✅ standard 新会话 `0f322b0c`（38 工具）无 workflow |
| B token 下降 | ✅ toolsTokens 8025→**7177（−848）**，与 workflow 848 token 精确吻合 |
| B' 无额外误伤 | ✅ 与批 1 基线逐工具对比，**唯一差异=workflow**；...

<!-- MEMORY_FIELDS
{
  "event_name": "standard预设禁用workflow工具",
  "goal": "记录标准预设裁减改动",
  "summary": "2026-11-14，在 ~/.dsh/profiles/web/cordis.patch.yml 的 preset-standard 内为 tool-workflow 添加 `disabled: true`，改动前备份为 .bak-p1b-20261114152151；语义 diff 仅此一行，行数由 1417 增至 1418，其余变化是 dsh web 写回时的空格规范化。",
  "ranges": "0,34-37",
  "source_extraction_id": "186dfdf1b42044a981f9a67468f2832a",
  "version": 1,
  "memory_type": "events"
}
-->