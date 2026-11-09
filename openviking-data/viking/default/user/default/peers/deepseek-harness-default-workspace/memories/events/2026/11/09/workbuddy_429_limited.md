# Summary
On 2026-11-09, three WorkBuddy models (workbuddy/hy4free, workbuddy/hy3, workbuddy/deepseek-v4.1-flash) hit the WorkBuddy backend HTTP 429 rate limit; the backend reset was scheduled for 2026-11-10 08:37 UTC+8. The hy4free/hy3 routes duplicate the running workbuddy-ai/* backend, while workbuddy/deepseek-v4.1-flash is a unique route.
# 2026-11-09 (Monday) ChatLog:
**assistant [peer=deepseek-harness-default-workspace]**: ...| auto/hy3 | 60 | 83.3% | 0 | 🔄 跑中 |
| workbuddy/deepseek-v4.1-flash | 60 | 83.3% | 0 | 🕘 缓存，明早补跑 |...
...
**assistant [peer=deepseek-harness-default-workspace]**: ...（`workbuddy/*` 三个模型因 WorkBuddy 后端限流被排除，错误数为历史 429 缓存，将在明早重置后重试。）

## 两个关键结论
1. **WorkBuddy 限流**：`workbuddy/hy4free`、`workbuddy/hy3`、`workbuddy/deepseek-v4.1-flash` 命中 WorkBuddy 后端 429，重置时间为 **2026-11-10 08:37 (UTC+8)**。其中 hy4free / hy3 与正在跑的 `workbuddy-ai/*` 同属 WorkBuddy AI 后端（**重复项**），只有 `workbuddy/deepseek-v4.1-flash` 是唯一路由。...

<!-- MEMORY_FIELDS
{
  "event_name": "workbuddy_429_limited",
  "goal": "WorkBuddy models hit rate limit",
  "summary": "On 2026-11-09, three WorkBuddy models (workbuddy/hy4free, workbuddy/hy3, workbuddy/deepseek-v4.1-flash) hit the WorkBuddy backend HTTP 429 rate limit; the backend reset was scheduled for 2026-11-10 08:37 UTC+8. The hy4free/hy3 routes duplicate the running workbuddy-ai/* backend, while workbuddy/deepseek-v4.1-flash is a unique route.",
  "ranges": "18,20,21",
  "source_extraction_id": "c9518ee4aefd4c5fa040fab945cced12",
  "version": 1,
  "memory_type": "events"
}
-->