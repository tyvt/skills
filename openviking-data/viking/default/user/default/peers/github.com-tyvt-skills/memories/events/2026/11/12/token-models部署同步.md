# Summary
助手于 2026-11-12 确认 repo 源码、~/.dsh/token-models、node_modules/dsh-token-models 三处 lib/*.js 哈希一致（此前为旧快照未部署），部署完成；config dump 确认 sessionsDir 生效。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 真正把编排器模型用量也显示到面板
...
**assistant [peer=github.com-tyvt-skills]**: So: `dep` (`~/.dsh/token-models`) and `nm` (node_modules) are **in sync with each other** but **both stale vs repo**. The `cordis.patch.yml`/`package.json` were hardlinked (repo edits propagated), but `lib/*.js` are **real copies** not hardlinked → my new code isn't deployed yet.

Deploy = copy repo → `~/.dsh/token-models`, and node_modules is a copy of that → also copy. Let me do both (and README/cordis/package too).
**assistant [peer=github.com-tyvt-skills]**: The stderr reveals that **`node_modules/dsh-token-models` IS actually the same directory as `~/.dsh/token-models`** (junction resolved — copy-to-self error). So they're one entity; my earlier hash check saw them equal because they're the same path. Deployment is done: all three hashes match.

Now verify config validity via `dsh --dump-config` (no restart needed), then restart to load new code.

<!-- MEMORY_FIELDS
{
  "event_name": "token-models部署同步",
  "goal": "部署插件代码",
  "summary": "助手于 2026-11-12 确认 repo 源码、~/.dsh/token-models、node_modules/dsh-token-models 三处 lib/*.js 哈希一致（此前为旧快照未部署），部署完成；config dump 确认 sessionsDir 生效。",
  "ranges": "0,82-84",
  "source_extraction_id": "1a157655cdbf43cdbddf2ad48bb0e8d1",
  "version": 1,
  "memory_type": "events"
}
-->