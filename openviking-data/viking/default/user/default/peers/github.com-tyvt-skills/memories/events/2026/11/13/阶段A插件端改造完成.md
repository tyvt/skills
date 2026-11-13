# Summary
2026-11-13 插件端 @openviking/dsh-memory-plugin@0.5.33（pnpm patch 已落，用户重启 dsh web 后生效）阶段 A 改造完成：ov-http.mjs 支持 caller 头（auto-recall/profile-inject/capture/background-extract/session-create 五类来源可区分）；A2 的 profile-inject.mjs 读 profile.md 前 ls 判存在，缺失 warn 一次并跳过，消除每 turn 404。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 阶段 A 的 A0/A1/A3 需改插件源码（目标 0.5.32，走 worktree + 分支），插件源码仓不在 D:\repository 顶层，首次实施时先定位（~/.dsh/patches 为候选）；B1 的 ov.conf 改动涉及服务重启，会选低峰执行。
按计划实施
...
**user [peer=github.com-tyvt-skills]**: 我重启了
...
**assistant [peer=github.com-tyvt-skills]**: ...**插件端（@openviking/dsh-memory-plugin@0.5.33，pnpm patch 已落，你重启后已生效）**
- `ov-http.mjs` 支持 caller 头（auto-recall / profile-inject / capture / background-extract / session-create 五类来源可区分）
- A2：`profile-inject.mjs` 读 profile.md 前 ls 判存在，缺失 warn 一次并跳过（消除每 turn 404）

**存档与回滚**
- 上游源码仓：clone 至 [D:\repository\OpenViking](D:\repository\OpenViking)，worktree [OpenViking-wt-phasea](D:\repository\OpenViking-wt-phasea) 分支 `feat/ov-audit-phasea`（基于 v0.5.3）commit `f691133d`...

<!-- MEMORY_FIELDS
{
  "event_name": "阶段A插件端改造完成",
  "goal": "验证插件端A0A2",
  "summary": "2026-11-13 插件端 @openviking/dsh-memory-plugin@0.5.33（pnpm patch 已落，用户重启 dsh web 后生效）阶段 A 改造完成：ov-http.mjs 支持 caller 头（auto-recall/profile-inject/capture/background-extract/session-create 五类来源可区分）；A2 的 profile-inject.mjs 读 profile.md 前 ls 判存在，缺失 warn 一次并跳过，消除每 turn 404。",
  "ranges": "0,256,273-274",
  "source_extraction_id": "9e571ba2be514b9db73d48f6c631684c",
  "version": 1,
  "memory_type": "events"
}
-->