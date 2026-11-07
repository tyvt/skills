# 门户 index-new showTopNav 与 shouldHideLayoutChrome 条件不一致
门户首页 index-new 通过 homeDataMixin 设置 Vuex `app.hideLayoutChrome` 隐藏页签并启用 portal-home-layout。
## 问题根因
- `layout/index.vue` 用 `hideLayoutChrome && !isSuperAdmin`（shouldHideLayoutChrome）控制页签与门户滚动样式。
- `Navbar.vue` 的 `showTopNav` 仅判断 `!hideLayoutChrome`，超管进入 index-new 时横向顶栏菜单仍被隐藏，而页签与布局样式已恢复，呈现非门户体验。
## 修复方案
- 抽 Vuex getter（或同一 computed）表达 `hideLayoutChrome && !isSuperAdmin`，Navbar 与 layout 两处共用同一条件。
## 验证与归属
- 验证证据：Code review 指出 showTopNav 与 shouldHideLayoutChrome 条件不一致，超管 hideLayoutChrome 仍为 true 时顶栏菜单隐藏但页签显示且无门户首页滚动样式。
- 涉及文件：zhi2-web-admin/src/layout/index.vue、zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/store/modules/app.js
- 所属项目：门户；来源会话 1cdf8560-a3f6-464f-957c-55bbfb919fcf；代码基线 50578e9。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_showtopnav_sync",
  "source_extraction_id": "731ed82de4844f9c8dc4884c40a5bb81",
  "version": 1,
  "memory_type": "entities"
}
-->