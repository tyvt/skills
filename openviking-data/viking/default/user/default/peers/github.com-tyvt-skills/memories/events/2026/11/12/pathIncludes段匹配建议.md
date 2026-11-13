# Summary
2026-11-12，用户在八审中指出 pathIncludes 用子串匹配会误判 .sessions_backup，建议改为路径段匹配或声明子串匹配已知行为。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...### 5. `pathIncludes` 用路径段匹配而非子串

`pathIncludes(currentPath, ".sessions")` 与 §3.4 (d) "任一 arg 含 `.sessions`" 都是子串匹配，`D:\repo\.sessions_backup` 会被误判为在 `.sessions` 下。硬强制下误拦可接受，但建议在文档注明"按路径段匹配（`/\.sessions(\/|$)/`）"或声明"子串匹配，`.sessions*` 一并拦"作为已知行为。

### 6. §3.1 公共前置对 `npx eslint --version` 的"bin 直接跟"需明确

`npx eslint --version` 的 bin 是 `eslint`，`--version` 跟在 eslint 后，应放行；...

<!-- MEMORY_FIELDS
{
  "event_name": "pathIncludes段匹配建议",
  "goal": "建议路径段匹配",
  "summary": "2026-11-12，用户在八审中指出 pathIncludes 用子串匹配会误判 .sessions_backup，建议改为路径段匹配或声明子串匹配已知行为。",
  "ranges": "21-23",
  "source_extraction_id": "bc74b3cbea604d1e98cd5377721abc5c",
  "version": 1,
  "memory_type": "events"
}
-->