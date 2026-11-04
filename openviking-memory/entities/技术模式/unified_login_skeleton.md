# UnifiedLogin 骨架屏技术规范
UnifiedLogin.vue 接入骨架屏，含最短展示600ms控制、banner兜底色，并修复动画提前播放问题。

## 骨架屏接入与最短展示
- 新增 src/utils/loading.js，包含 sleep、waitForMinDuration 与 600ms 常量
- 新增 UnifiedLoginSkeleton.vue 按真实元素排版
- UnifiedLogin.vue 接入骨架屏与最短600ms展示控制，并设 banner 兜底色
- 骨架展示期真实内容 visibility:hidden，规避7.7MB SVG延迟

## 问题背景
- 骨架屏 visibility: hidden 隐藏内容期间，mounted 启动 observeDropIn() 与 observePlatformBanner() 使动画提前播完
- 揭开后动画已结束，用户不可见效果

## 解决方案
- 改为在 loadNoticeList 中 pageSkeletonVisible=false 且 $nextTick 后启动两观察器

## 验证与归属
- 验证证据：src=门户/054.md；e2e mock 确认最短600ms与banner兜底
- 涉及文件：src/utils/loading.js、UnifiedLoginSkeleton.vue、UnifiedLogin.vue（均在 zhi2-web-admin/src/views/home 下）
- 来源会话ID：01a16219-586e-7628-b520-4564e18a2f55、session_156d161633e4e505a619179f196011a3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_skeleton",
  "source_extraction_id": "6ae3238f0b554c53a5a67bbe5b3718b8",
  "version": 2,
  "memory_type": "entities"
}
-->