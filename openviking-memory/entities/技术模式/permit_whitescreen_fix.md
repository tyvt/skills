# 预售许可申请维护白屏与页签丢失修复
苏州市房地产监测V3 中预售许可申请页点「维护」偶发整页白屏、页签栏从10个剩1个、图标显示方框的根因与修法（禅道 bug 6285）。

## 问题根因
- 非「维护」业务逻辑，而是发版后未刷新的旧页面被静默整页刷新
- `version-check.js` 覆写 `history.pushState/replaceState`，路由跳转比对 version.json，buildTime 变化即 `forceRefresh()` 直接 `window.location.reload()`
- `permission.js` 的 `importWithChunkRetry` 在懒加载 chunk 404（旧 chunk 被清理）时静默 `location.reload()`
- `tagsView.js` 的 `visitedViews` 不落盘，整页刷新必然清空已打开页签（表单草稿已写 sessionStorage[$route.path]，刷新后自动回填）

## 修复方案
- 用户定：保留自动整页刷新语义，版本校验强刷为刻意机制不改弹窗确认
- 新增 `src/utils/autoRefresh.js`：`reloadWithOverlay()` 刷新前显示全屏遮罩提示并把已打开页签写入 sessionStorage
- `version-check.js` 的 `forceRefresh()` 与 `permission.js` 的 chunk 兜底改走 `reloadWithOverlay()`
- `TagsView/index.vue` 在自动刷新后校验路由仍存在再还原页签

## 可复用判断
- 看到「整页白屏 + 页签清空 + URL 未变」，先查 `location.reload()`（版本校验/chunk 兜底）而非业务代码
- zhi3 的 tagsView 不持久化，整页刷新必丢页签

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/utils/autoRefresh.js`、`src/utils/version-check.js`、`src/store/modules/permission.js`、`src/layout/components/TagsView/index.vue`
- 子模块提交 `d2cbc1742`，合入 `develop/v3.0.0` 合并提交 `a2862e39c`
- 父仓库 `zhi3-web-admin-h5-g-unlimited` 提交 `7a7fa89`
- 所属项目：苏州市房地产监测V3；禅道 bug：6285

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_whitescreen_fix",
  "source_extraction_id": "46725b244e454954a92eb5bb5b33bf6f",
  "version": 1,
  "memory_type": "entities"
}
-->