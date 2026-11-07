# 全局PC最小宽度致苏周到移动端布局失效
门户 zhi2-web-admin 因全局 min-width:992px 导致苏周到 WebView 移动端页按 PC 视口渲染，需切移动视口类解除最小宽度。

## 根因
- index.html 与 src/styles/index.scss 对 html,body,#app 设 min-width:992px
- 苏周到 WebView 中移动端页 SuzhouDaoAuthSuccess.vue 因此按 PC 视口渲染

## 修复方案
- src/router/index.js 进入 /suzhou-dao/* 时切 app-mobile-viewport 类
- src/styles/index.scss 对该类取消最小宽度并隐藏横向溢出
- index.html 首屏内联脚本在 Vue 挂载前根据路径提前加类（回调页加载阶段也生效）并补充与全局样式一致的覆盖规则

## 涉及文件
- zhi2-web-admin/src/api/security/suzhouDao.js
- zhi2-web-admin/src/views/suzhouDao/SuzhouDaoAuthSuccess.vue、SuzhouDaoAuthCallback.vue
- zhi2-web-admin/src/router/index.js、src/App.vue、index.html、src/permission.js、src/main.js

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 验证证据：门户/023.md；会话亦要求部署后在苏周到内重走扫码授权，确认 /suzhou-dao/auth-success 全屏、无横向滚动，若仍有问题需说明测试或生产环境
- 来源会话ID：1df50635-29c5-45f1-8fa7-96af94e042aa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_mobile_viewport",
  "source_extraction_id": "6be841ec78ce48ffbef96f1e28cec6ee",
  "version": 2,
  "memory_type": "entities"
}
-->