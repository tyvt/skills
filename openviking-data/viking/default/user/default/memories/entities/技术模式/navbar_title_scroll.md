# 导航栏系统标题溢出滚动
苏住房G Navbar 系统标题固定宽展示不全时，需用隐藏探针测宽 + 位移滚动实现完整露出。

## 背景与动机
- 需求：Navbar 系统标题溢出时来回滚动，用户连续三轮反馈「没彻底滚完」「再冗余一点」
- 纯靠 CSS animation 位移百分比无法表达「按像素冗余」，必须 JS 测宽

## 解决方案
- 用隐藏探针节点测标题真实排版宽度；探针测量值与临时去掉 max-width 后的 scrollWidth 取较大值，并补 lineHeight / fontStyle 避免字体度量偏差
- 滚动距离 = 探针宽 − 视口宽 + TITLE_SCROLL_SLACK 冗余（4px 不够，32px 才稳，用户还嫌少时调到 40~48）
- 只在内容确实溢出时才启用动画，避免短标题抖动
- 滚动区间用定时器/requestAnimationFrame 推进位移并在两端停顿，卸载时清理

## 验证与归属
- 验收口径：末尾文字必须完整露出且有停顿感
- 验证证据：会话 46385713 用户三轮要求滚动展示全；结论 TITLE_SCROLL_SLACK +32px 及探针测量方案
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue
- 所属项目：苏住房G；来源会话ID：46385713-ebb6-4dc5-a2cc-fa9ec3b98d10；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_title_scroll",
  "source_extraction_id": "4c74f7a87e624832885083b5159980bf",
  "version": 1,
  "memory_type": "entities"
}
-->