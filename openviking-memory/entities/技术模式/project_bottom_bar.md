# 项目页底部白条修复
苏住房C 微信小程序 `pages/index/project` 页面滚动到底部出现白条，由两层底部留白叠加及 z-paging 安全区占位导致，已修复。

## 问题根因
- `tab-bar-placeholder`（56px + 安全区）在列表里额外占高度
- z-paging 在 fixed 模式按系统 `windowBottom`（原生 TabBar 高度）上缩，露出白色页面背景
- loading 在列表底部被白条遮挡

## 修复要点
- 去掉 `tab-bar-placeholder` 和无效的 `bottom-offset`
- 用 `paging-style.bottom` 对齐自定义 `AppTabBar` 高度：`calc(106rpx + env(safe-area-inset-bottom))`
- 关闭 `safe-area-inset-bottom`，避免 z-paging 额外加底部安全区占位
- 背景统一为 `#f5f5f5`，避免露白

## 涉及文件
- src/pages/index/project.vue
- src/pages/index
- src/pages_tab/components/Project_Suzhufang.vue
- src/pages.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：dc3620d1-8787-4997-ad0a-327ea076910f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_bottom_bar",
  "source_extraction_id": "77dfc578cbe248d99adb47bed2b7e4a2",
  "version": 1,
  "memory_type": "entities"
}
-->