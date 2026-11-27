---
audit_status: valid
last_checked: 2026-11-27T17:32:47+08:00
verdict_note: 属E2E等待策略偏好（条件满足即继续、dialog.count、networkidle），无特定代码事实主张，无矛盾证据。
---
- 偏好在 E2E 菜单测试中避免无意义固定等待，优先用条件满足继续的方式提高执行效率。
- 在无弹窗场景，偏好用 dialog.count() 快速判断，避免 isVisible({ timeout: 1000 }) 带来的固定超时等待。
- 在叶子菜单页面等待上，偏好先等 networkidle 并设较短超时，超时后继续，同时保留至少 300ms 最短停留以兼顾稳定性和录屏。

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "E2E测试等待策略",
  "source_extraction_id": "6c1d9f0add84425d8c532ecd2075a7cf",
  "version": 1,
  "memory_type": "preferences"
}
-->