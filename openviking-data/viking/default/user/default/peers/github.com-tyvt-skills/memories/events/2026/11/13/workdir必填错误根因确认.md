# Summary
用户报告 op:"full" 要求绝对 workdir，两次均返回 WORKDIR_REQUIRED，推测新会话可能卡在此错误从未进入 graph 路径；助手经探查确认根因为设计缺陷——插件未将 workdir 传入 run_full，并非用户操作错误（2026-11-13）
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 一个需要你注意的前提
上一轮就发现，op:"full" 要求绝对 workdir；我试过两次都返回 WORKDIR_REQUIRED。如果你的新会话是在别的目录下运行，可能会一直卡在这个错误上，导致从来没真正进入过 graph 路径。...
...
**assistant [peer=github.com-tyvt-skills]**: I've found the root cause. Let me confirm how the plugin passes `workdir` into `run_full`.
...
**assistant [peer=github.com-tyvt-skills]**: Root cause confirmed — it's a design flaw, not a user error. Let me check the jsonbridge and execution paths for the same gap.

<!-- MEMORY_FIELDS
{
  "event_name": "workdir必填错误根因确认",
  "goal": "确认bug根因",
  "summary": "用户报告 op:\"full\" 要求绝对 workdir，两次均返回 WORKDIR_REQUIRED，推测新会话可能卡在此错误从未进入 graph 路径；助手经探查确认根因为设计缺陷——插件未将 workdir 传入 run_full，并非用户操作错误（2026-11-13）",
  "ranges": "0,25,31",
  "source_extraction_id": "dd2dd36578e6424f8cb4edb9326091c1",
  "version": 1,
  "memory_type": "events"
}
-->