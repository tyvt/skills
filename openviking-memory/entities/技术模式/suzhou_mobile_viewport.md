# 全局PC最小宽度致苏周到移动端布局失效
门户 zhi2-web-admin 因全局 min-width:992px 导致苏周到 WebView 移动端页按 PC 视口渲染，需切移动视口类解除最小宽度。

## 根因
- index.html 与 src/styles/index.scss 对 html,body,#app 设 min-width:992px
- 苏周到 WebView 中移动端页 SuzhouDaoAuthSuccess.vue 因此按 PC 视口渲染

## 修复方案
- src/router/index.js 进入 /suzhou-dao/* 时切 app-mobile-viewport 类
- src/styles/index.scss 对该类取消最小宽度
- index.html 首屏内联脚本提前加类覆盖

## 涉及文件
- zhi2-web-admin/src/api/security/suzhouDao.js
- zhi2-web-admin/src/views/suzhouDao/SuzhouDaoAuthSuccess.vue、SuzhouDaoAuthCallback.vue
- zhi2-web-admin/src/router/index.js、src/App.vue、index.html、src/permission.js、src/main.js

## 验证与归属
- 验证证据：门户/023.md
- 来源会话ID：1df50635-29c5-45f1-8fa7-96af94e042aa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_mobile_viewport",
  "source_extraction_id": "87dc3c1f529f4b5fb5a8a756193bd67c",
  "version": 1,
  "memory_type": "entities"
}
-->