# 登录框加载放大修复
苏州市房地产监测V3 中登录框因 JS 动态计算尺寸加载放大，改为固定尺寸消除问题。

## 问题根因
- `login.vue` 中 `syncLoginBoxLayout` 及 ResizeObserver 动态计算尺寸导致登录框加载放大
- 短视口下可能出现溢出

## 修复方案
- 删除动态逻辑，面板固定宽度 520px，图片使用 `object-fit: cover`
- `.login` 改 `min-height:100%` 消除短视口溢出

## 涉及文件
- `zhi2-web-admin/src/views/login.vue`
- `zhi2-web-admin/index.html`、`src/main.js`、`dist/index.html`、`src/App.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/126.md
- 来源会话ID：68b279ff-7526-4e1e-b55d-551e0e5c8376
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_zoom_fix",
  "source_extraction_id": "d5003cc58ed741acbc25c5ea5b23b3df",
  "version": 1,
  "memory_type": "entities"
}
-->