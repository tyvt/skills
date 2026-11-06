# zhi2-web-admin :has() 兜底方案
zhi2-web-admin 的 index.scss 与 main.js 使用 :has() 选择器，需为不支持的浏览器（如奇安信可信浏览器 Chromium<105）提供兜底。对应禅道 bug 6279。

## 背景
- :has() 用于 index.scss 453–515 行选择器组与 536 行起 #app-main 规则，以及 main.js 形态联动
- 现代浏览器支持 :has()，但需兼容不支持的浏览器（JS 不加类时行为不变）

## 兜底方案
- 该兜底为可复用修复模式，适用于本项目所有依赖 :has() 的详情页滚动场景（已用于 Bug 6279 备案申请详情页；Bug 6281 楼幢变更维护页同根因将复用）
- JS：`main.js` 顶部用 `CSS.supports('selector(:has(*))')` 探测，不支持（或探测异常）时给 `<html>` 打 `no-has-support`——一次性、零观察器（不用 MutationObserver）
- SCSS：`index.scss` 在 `:has()` 规则组（453–515、536–572 行）之后、574–644 行新增 `html.no-has-support` 回退块（终稿已确认）
- 回退块统一按「表单+底部块」整页滚动，镜像现代路径已知布局（zs-tabs 收缩规则 471–501 行、楼盘表两条均与 `:has()` 路径对齐）
- 不动 `#app-main`（`height:100%` 机制在老内核已被截图证明正常），仅翻 `.detail-container` 的 `overflow` 并覆盖直接子级内滚
- 现代浏览器不带标记，`:has()` 规则零变化；类回退无法用 CSS 区分页面形态，整页滚动覆盖所有详情页
- 全局 `* { box-sizing: inherit }` 继承 html 的 `border-box`，所有元素均为 border-box，`height:100%`+`padding-bottom` 不会溢出 padding 高度，回退块无需额外声明 `border-box`

## 项目归属
- 所属项目：zhi2-web-admin（苏州市房地产监测V3 子模块）
- 来源会话：2026-11-06 会话，agent 探索后定稿方案

## 验证方式
- 验证用 Playwright stub `CSS.supports` 模拟老内核 + nginx 部署站点（本项目禁 dev server）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "has_fallback_fix",
  "source_extraction_id": "675cc62b6c6e4a0bb4a50b3351e9b3be",
  "version": 5,
  "memory_type": "entities"
}
-->