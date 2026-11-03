# 顶栏菜单宽度多源同步
苏住房G 顶栏菜单宽度不是单个 CSS 值，.nav-item、.more-menu-trigger、more-menu-dropdown 与 setVisibleNumber 常量必须同步改为 120px。
## 问题背景
- layout/components/Navbar.vue 顶栏为「可见菜单+更多功能」折叠体系，菜单宽度在四处独立：.nav-item width、.more-menu-trigger width、.more-menu-dropdown min-width、JS setVisibleNumber 的 ITEM_WIDTH/MORE_WIDTH 常量。
- 只改 CSS 会导致「更多功能」出现时机与排版不符。
## 解决方案
- 三处样式改 120px，dropdown 用 min-width: max(100%,120px)；setVisibleNumber 中 ITEM_WIDTH、MORE_WIDTH 同步为 120。
- 改完拉宽/收窄窗口验证折叠点，长菜单名在 120px 下更早出省略号属预期。
- 后续调宽最好抽成同一常量/查询变量只留一处。
## 验证与归属
- 验证：会话 de67771a 用户诉求「顶栏单个菜单宽度改为120px」；最终 .nav-item、.more-menu-trigger 120px，dropdown min-width:max(100%,120px)，setVisibleNumber 常量均 120。
- 涉及文件：layout/components/Navbar.vue；所属项目：苏住房G；代码基线：9e5c499；来源会话ID：de67771a-b168-4655-b67c-ef1921bad198。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_menu_width_sync",
  "source_extraction_id": "f784251e7b6a453dbf14488ca4fe0ff8",
  "version": 1,
  "memory_type": "entities"
}
-->