# Summary
2026-11-13 OpenViking 服务端（0.5.3，已重启 health ok）阶段 A 改造完成并验证：A0 在 middleware→http.request→projection 贯穿 X-OpenViking-Caller 头并新增 request_audit.caller 列，schema v5→v6 增量迁移（实测 version=6 不删数据）；A1 将 _trim_audit_rows 改为 status_code>=400 豁免清除，实测触发 400 后明细落库（api_type=search.find, error_code=INVALID_ARGUMENT, caller=probe-test）；A3 将 POST /api/v1/sessions 改为幂等 get-or-create，实测同 session_id 连发两次均 200、existed=True、409 零新增。上游源码仓克隆至 D:\repository\OpenViking，worktree D:\repository\OpenViking-wt-phasea 分支 feat/ov-audit-phasea（基于 v0.5.3）commit f691133d，仅本地提交未推送。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 阶段 A 的 A0/A1/A3 需改插件源码（目标 0.5.32，走 worktree + 分支），插件源码仓不在 D:\repository 顶层，首次实施时先定位（~/.dsh/patches 为候选）；B1 的 ov.conf 改动涉及服务重启，会选低峰执行。
按计划实施
...
**assistant [peer=github.com-tyvt-skills]**: 阶段 A 已全部实施并验证完成。总结：

## 实施结果

**服务端（openviking 0.5.3，已重启生效，health ok）**
- **A0 caller 埋点**：`X-OpenViking-Caller` 头贯穿 middleware → http.request → projection → `request_audit.caller` 新列；schema v5→v6 增量迁移（实测 version=6，不删数据）
- **A1**：根因是 `_trim_audit_rows` 按条数截断把错误行挤出（代码无过滤分支）；已改为 `status_code>=400` 豁免清除。实测人为触发 400 后明细落库：`api_type=search.find, error_code=INVALID_ARGUMENT, caller=probe-test` ✅
- **A3**：`POST /api/v1/sessions` 改幂等 get-or-create。实测同 session_id 连发两次均 200、`existed=True`，409 零新增 ✅...

<!-- MEMORY_FIELDS
{
  "event_name": "阶段A服务端改造验证完成",
  "goal": "验证服务端A0A1A3",
  "summary": "2026-11-13 OpenViking 服务端（0.5.3，已重启 health ok）阶段 A 改造完成并验证：A0 在 middleware→http.request→projection 贯穿 X-OpenViking-Caller 头并新增 request_audit.caller 列，schema v5→v6 增量迁移（实测 version=6 不删数据）；A1 将 _trim_audit_rows 改为 status_code>=400 豁免清除，实测触发 400 后明细落库（api_type=search.find, error_code=INVALID_ARGUMENT, caller=probe-test）；A3 将 POST /api/v1/sessions 改为幂等 get-or-create，实测同 session_id 连发两次均 200、existed=True、409 零新增。上游源码仓克隆至 D:\\repository\\OpenViking，worktree D:\\repository\\OpenViking-wt-phasea 分支 feat/ov-audit-phasea（基于 v0.5.3）commit f691133d，仅本地提交未推送。",
  "ranges": "0,269-272",
  "source_extraction_id": "9e571ba2be514b9db73d48f6c631684c",
  "version": 1,
  "memory_type": "events"
}
-->