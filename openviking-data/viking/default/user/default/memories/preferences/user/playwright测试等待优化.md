- 在 Playwright 菜单切换测试中，用 `dialog.count()` 快速判断弹窗是否存在，替代 `isVisible({ timeout: 1000 })` 等待，避免无弹窗时每次白等 1 秒，提升效率（原 4 分钟仅点 20-30 个菜单）。
- 叶子菜单点击后等待改用 `waitForLeafPageReady(page)`：先等 `networkidle`（超时 2 秒），再补足最短停留 `LEAF_MIN_STAY_MS`（300ms），替代固定 `waitForTimeout(1秒)`，兼顾速度与稳定。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Playwright测试等待优化",
  "source_extraction_id": "61a33b5fab654f63a4728d9b086afb8c",
  "version": 1,
  "memory_type": "preferences"
}
-->