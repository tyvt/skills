# Summary
2026-11-12，用户在八审中指出 §3.4 bash/terminal 按 command 兜底在字段名不同时不会生效，建议改为多字段探测（command/script/cmd）并明确未覆盖边界。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...并处理 `cd` 无参数、`Set-Location -Path .sessions` 的 path 提取（当前"该段 `<path>` 参数"未说明 `-Path` 前缀）。

### 4. §3.4 bash/terminal "按 command 兜底"在字段名不同时不会生效

§3.4 标题写"bash/terminal 的命令字段名以 M3 确认后对齐，**未确认前按 command 兜底并对此类工具同样生效**"。但若 bash/terminal 实际字段是 `script`/`cmd`，guard 取 `arguments.command` 就是 `undefined`，规则**不会生效**，"兜底"无从谈起。

**建议**：改为"未确认前按多字段探测（`command`/`script`/`cmd`）兜底；若均取不到，则 bash/terminal 的 §3.4 为已知未覆盖，待 M3 确认后生效"，把边界讲清楚，避免误以为已覆盖。...

<!-- MEMORY_FIELDS
{
  "event_name": "bash字段名兜底表述指出",
  "goal": "指出兜底缺陷",
  "summary": "2026-11-12，用户在八审中指出 §3.4 bash/terminal 按 command 兜底在字段名不同时不会生效，建议改为多字段探测（command/script/cmd）并明确未覆盖边界。",
  "ranges": "18-20",
  "source_extraction_id": "bc74b3cbea604d1e98cd5377721abc5c",
  "version": 1,
  "memory_type": "events"
}
-->