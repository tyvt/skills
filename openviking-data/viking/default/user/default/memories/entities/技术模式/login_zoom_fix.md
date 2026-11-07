# 登录框加载放大修复
苏州市房地产监测V3 中登录框因 JS 动态计算尺寸加载放大，改为固定尺寸消除问题。

## 问题根因
- `login.vue` 中 `syncLoginBoxLayout` 及 ResizeObserver 动态计算尺寸导致登录框加载放大
- 短视口下可能出现溢出
- ResizeObserver 监听登录盒后基于 `scrollHeight` 动态加大 `minHeight`，形成正反馈使图片区域涨至全屏

## 修复方案
- 删除动态逻辑，面板固定宽度 520px，图片使用 `object-fit: cover`
- `.login` 改 `min-height:100%` 消除短视口溢出
- 移除 ResizeObserver 与 scrollHeight 量测，改用固定 min-height 与图片宽高比计算
- 于 `zhi2-web-admin/src/views/login.vue` 及门户 `login.vue` 增加视口上限（单栏≤42%屏宽、盒高≤78%屏高），仅用 `resize` 事件重算

## 涉及文件
- `zhi2-web-admin/src/views/login.vue`
- 门户 `login.vue`
- `zhi2-web-admin/index.html`、`src/main.js`、`dist/index.html`、`src/App.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/126.md；src=苏州市房地产监测V3/121.md；src=苏州市房地产监测V3/161.md
- 来源会话ID：68b279ff-7526-4e1e-b55d-551e0e5c8376；57edf49f-b83c-4745-8819-a2d163839b67
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_zoom_fix",
  "source_extraction_id": "35936e6489bd44a1be5cd1e65794bc05",
  "version": 3,
  "memory_type": "entities"
}
-->