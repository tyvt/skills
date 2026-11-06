# 顶栏菜单切换导航指示器动画修复
苏州市房地产监测V3 中点击顶栏菜单时导航指示器动画偶发不触发，已通过区分更新类型与切换时间窗修复。

## 问题根因
- 点击顶栏菜单常连带侧栏展开/收起或布局变化，`ResizeObserver` 走 `updateNavOverflow` → `updateNavIndicator({ animate: false })`，与菜单切换的 `$nextTick` 更新抢同一帧
- 后执行的「无过渡」会把动画盖掉，导致动画有时有、有时没有

## 修复内容
- 区分两类更新：`layoutOnly: true` 只同步位置（Resize、溢出重算）；菜单切换走 `activeMenuItemPath` 监听，始终允许过渡
- 切换时间窗：点击菜单后约 400ms 内，即便发生 layout 同步也保留过渡
- 双 `requestAnimationFrame`：开过渡前先让浏览器提交上一帧位置，减少同帧改 `transform` 导致 transition 被跳过
- 路径归一化：`isActive` 在点击态下统一用 `normalizeMenuPath`，避免尾斜杠导致找不到激活项、指示器不更新

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：Navbar.vue、variables.css
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_animation_fix",
  "source_extraction_id": "b6235e8c83234c6da6eb786bbea65930",
  "version": 1,
  "memory_type": "entities"
}
-->