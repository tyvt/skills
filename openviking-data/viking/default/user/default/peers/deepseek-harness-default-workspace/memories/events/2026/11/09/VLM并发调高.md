# Summary
2026-11-09，用户批准评估后调整 VLM 并发；助手将 ov.conf 中 vlm.max_concurrent 由 4 改为 8，重启生效，复测 8 路并行 8/8 成功墙钟 3.2s 无饱和。
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 1根治，2评估后调整，3评估没问题后清理
**assistant [peer=deepseek-harness-default-workspace]**: 用户拍板：1 根治、2 评估后调整、3 评估没问题后清理。这是**会改服务端状态的操作**，需按顺序谨慎执行。先确认 OpenViking 重启方式与影响面。
...
**assistant [peer=deepseek-harness-default-workspace]**: Patched and backed up. Now §2: adjust VLM concurrency. Evaluation showed 6 parallel all succeeded in 2.2s wall (vs 1.5s single), so there's headroom — I'll raise `max_concurrent` 4→8.
...
**assistant [peer=deepseek-harness-default-workspace]**: 两处修改语法均正确。现在需重启 OpenViking 让 §1/§2 生效——重启会短暂中断服务，先确认当前无正在进行的实时 commit（除卡滞那个），再执行。
...
**assistant [peer=deepseek-harness-default-workspace]**: OpenViking 已重启成功（新 pid 14796，6 秒内 healthy）。现在验证 §1 补丁与 §2 配置是否真正生效。
...
**assistant [peer=deepseek-harness-default-workspace]**: §1 完美生效（`/debug/health` 与 `/observer/system` 均恢复 `true`、errors 清零）；§2 的 8 并发全部成功（墙钟 3.2s，延迟平稳无饱和）。注意：重启后进度计数归零（Embedding `processed=0`、SessionCommit 表被清空），符合会话早期的诊断。现在重新确认卡滞任务状态，执行 §3 清理。
...
**assistant [peer=deepseek-harness-default-workspace]**: ...**② 评估后调整 VLM 并发 —— ✅ 4→8**
- 评估：单请求 ~1.5s，**6 路并行 6/6 成功、墙钟 2.2s**（后端有余量，4 并发未打满）。
- 调整：`ov.conf` `vlm.max_concurrent` 4→8，重启生效。
- **复测：8 路并行 8/8 成功、墙钟 3.2s、延迟平稳无饱和**，吞吐翻倍。

**③ 评估后清理卡滞任务 —— ✅ 已被重启自然解决，无需手动 cancel**...

<!-- MEMORY_FIELDS
{
  "event_name": "VLM并发调高",
  "goal": "记录VLM并发调高",
  "summary": "2026-11-09，用户批准评估后调整 VLM 并发；助手将 ov.conf 中 vlm.max_concurrent 由 4 改为 8，重启生效，复测 8 路并行 8/8 成功墙钟 3.2s 无饱和。",
  "ranges": "19-20,38,42,46,48,67-68",
  "source_extraction_id": "c6dd1ba5977146d4b03342c85dcfb672",
  "version": 1,
  "memory_type": "events"
}
-->