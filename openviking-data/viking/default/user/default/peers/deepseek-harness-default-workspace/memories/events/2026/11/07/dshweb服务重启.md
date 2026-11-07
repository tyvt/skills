# Summary
用户于 2026-11-07 10:17:44 重启 dshweb（the agent harness Web），导致原补跑 job `pwsh-e0a6a3f287c8463d` 被一并终止、补跑进度丢失；断点在 d-repository 刚提交 task、尚未 completed 时。
# 2026-11-07 (Saturday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 继续任务，我刚才重启了dshweb
...
**assistant [peer=deepseek-harness-default-workspace]**: ## 重启后发生了什么

| 现象 | 说明 |
|------|------|
| **原补跑 job 没了** | `pwsh-e0a6a3f287c8463d` 随 **DSH Web 重启** 一起被干掉；断在 **d-repository** 刚提交 task、还没等 completed 那会儿。 |
| **OV 一度挂了** | preflight 报 **`1933 不可达`**（重启后 OpenViking 没起来）。...

<!-- MEMORY_FIELDS
{
  "event_name": "dshweb服务重启",
  "goal": "记录重启影响",
  "summary": "用户于 2026-11-07 10:17:44 重启 dshweb（the agent harness Web），导致原补跑 job `pwsh-e0a6a3f287c8463d` 被一并终止、补跑进度丢失；断点在 d-repository 刚提交 task、尚未 completed 时。",
  "ranges": "0,26-27",
  "source_extraction_id": "8a44d852e87b4306b4a29ee019983c10",
  "version": 1,
  "memory_type": "events"
}
-->