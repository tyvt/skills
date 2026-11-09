# Bug 6285 版本检测与路由刷新解耦修复
苏州市房地产监测V3（zhi2-web-admin）点菜单触发整页重载、页签 10→1、未跳转目标页的修复记录。

## Root Cause
- version-check.js 把 checkUpdate() 挂在 history.pushState/replaceState 与 popstate/hashchange 上，点菜单变成发版检测点
- main.js 传的 interval 从未实现，页面不主动检测只在跳转瞬间被强刷
- importWithChunkRetry 的 never-resolve Promise 挂死导航；TagsView 在 addRoutes 前过滤掉 10 个页签
- 上一轮修复 d2cbc1742/a2862e39c 已部署（8098 构建 22fa66c69）但只加遮罩+快照仍保留整页重载

## Fix Changes
- version-check.js：移除跳转挂钩，改独立 30s 轮询+visibilitychange，真新版本才刷新并延后到跳转结束
- autoRefresh.js：新增跳转目标/导航时间戳；reloadWithOverlay 支持带目标刷新；页签快照 meta 只留可序列化字段
- permission.js：chunk 404 兜底带跳转目标；CHUNK_RELOAD_KEY 改 10s 时间戳窗口防无限刷新
- router/index.js：beforeEach 记录目标与时间戳、afterEach 清除；main.js interval 改 30000
- TagsView/index.vue：页签还原延到 router.onReady，不再过滤有效页签

## Verification
- eslint 与 HEAD 基线 0 新增告警；npm run build 通过 gitHash d806d639c
- nginx 8098 Playwright 冒烟 3/3 PASS：pushState 原生、跳转不触发比对、真发版仍遮罩
- 子模块 d650ca177→d806d639c、父 0144a81 推送 origin/develop/v3.0.0；禅道 6285 resolvedBy=tiany 指派回 lichandan

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "tech_pattern",
  "name": "bug6285_refresh_decouple",
  "source_extraction_id": "67485f5ae83c4104ac8b41cfb6ef3e85",
  "version": 1,
  "memory_type": "entities"
}
-->