---
audit_status: invalid
last_checked: 2026-11-27T12:36:04+08:00
verdict_note: 提到的 waitForLeafPageReady、locator.count()、navbar-sidebar-accessibility.spec.js 全仓无命中，E2E 效率优化的具名产物不存在，无法证明有效。
---
- 菜单切换 E2E 测试偏好用 `locator.count()` 判断弹窗，替代 `isVisible({ timeout: 1000 })`，避免无弹窗场景下每次点击白等 1 秒
- 偏好缩短关闭按钮相关等待时间，提升整体测试速度（原瓶颈：4 分钟仅点 20-30 个菜单）
- 叶子菜单点击后偏好用「网络空闲 + 最短停留」(`waitForLeafPageReady`) 替代固定 `waitForTimeout(1000)`：先 `networkidle`（超时 2 秒，遇长轮询或 WebSocket 也继续），再补足最短停留 300ms
- 理解并应用 Playwright 断言 `timeout` 为「最多等待多久算失败」而非固定等待；如 `APP_LAYOUT_VISIBLE_TIMEOUT = 4000ms` 表示最多 4 秒反复检查 `app-layout` 是否可见
- 相关改动位于 zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js（所属项目 2-0）

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->