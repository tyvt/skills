# 发版整页刷新非破坏性改造
zhi2-web-admin 发版后整页 location.reload() 会清空页签，bug 6285 修复为保留自动刷新但加遮罩并存回页签。

## 问题根因
- version-check.js 覆写 history.pushState/replaceState，任意路由跳转（如点「维护」）都拉 version.json 比对，发版后 buildTime 变化即 forceRefresh() 整页刷新
- permission.js 的 importWithChunkRetry 在懒加载 chunk 404（旧 chunk 被清理）时静默 location.reload()
- tagsView 的 visitedViews 不落盘，整页刷新必然清空页签（录屏 72 帧 GIF 中页签 10→1、图标短暂显示方框）

## 修复方案
- 新增 autoRefresh.js：reloadWithOverlay() 刷新前显示全屏遮罩（检测到新版本/页面资源已更新，正在刷新页面…），并把已打开页签写入 sessionStorage
- version-check.js 的 forceRefresh() 与 permission.js 的 chunk 兜底改走 reloadWithOverlay()（刷新仍自动，不再无声白屏）
- TagsView/index.vue：自动刷新后校验路由仍存在再还原页签，普通刷新不受影响
- 按用户选择保留自动整页刷新语义，不改成弹窗确认

## 验证与落地
- 验证：eslint 四个改动文件 0 error；npm run build 通过（buildTime 2026/11/6 14:41:28，gitHash a2862e39c）；本地 nginx 8098 Playwright 模拟发版通过；客测环境未复现
- 落地：子模块 zhi2-web-admin 分支 fix/zentao-6285-version-check-prompt(d2cbc1742) 与 develop/v3.0.0(a2862e39c) 已推送；父仓库 zhi3-web-admin-h5-g-unlimited develop/v3.0.0(08b4012、7a7fa89) 已推送，gitlink 指向 a2862e39c
- 涉及文件：zhi2-web-admin/src/utils/autoRefresh.js、version-check.js、store/modules/permission.js、layout/components/TagsView/index.vue
- 台账 common-errors.md 补 E-041；worktree zhi2-web-admin-wt-6285 已删；禅道 6285 回写 resolved/fixed（resolvedBy=tiany，指派回 lichandan）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "version_check_reload",
  "source_extraction_id": "0ea3f2a4999441d4b5c2c9b23524747f",
  "version": 1,
  "memory_type": "entities"
}
-->