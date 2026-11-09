# Summary
2026-11-09 用户指出 hy3 不支持图像识别（识图），要求将所有 hy3 变体（auto/hy3、workbuddy-ai/hy3、workbuddy/hy3）从视觉对比基准中排除；已完成的 hy3 跑分对该基准无效，不纳入报告。
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: hy3不要测，它不支持识图
**assistant [peer=deepseek-harness-default-workspace]**: Understood — `hy3` doesn't support image recognition, so I'll **exclude all `hy3` variants** (`auto/hy3`, `workbuddy-ai/hy3`, `workbuddy/hy3`) from the vision comparison. The hy3 runs I already did are invalid for this benchmark and won't be reported. (The `workbuddy-ai/hy3` retry just finished, but it's now excluded anyway.)

Let me confirm `auto/hy4free` cleaned up after its retry, and keep waiting on the valid `workbuddy-ai/hy4free`.

<!-- MEMORY_FIELDS
{
  "event_name": "hy3视觉评测排除",
  "goal": "排除非视觉模型",
  "summary": "2026-11-09 用户指出 hy3 不支持图像识别（识图），要求将所有 hy3 变体（auto/hy3、workbuddy-ai/hy3、workbuddy/hy3）从视觉对比基准中排除；已完成的 hy3 跑分对该基准无效，不纳入报告。",
  "ranges": "10-11",
  "source_extraction_id": "2964d220700b470b82c317fc5639a34d",
  "version": 1,
  "memory_type": "events"
}
-->