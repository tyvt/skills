# 菜单顶栏图标占位符白名单回退
顶栏导航取菜单数据 meta.icon 时，需对占位值做白名单回退以避免空白图标。

## 背景与问题
- 顶栏导航图标名存在菜单数据 meta.icon 字段，库里很多条目值为占位串（#、example、druid等）或空值，直接丢给<SvgIcon>渲染空白。
- 图标名是运营/运维手工填的存量数据，前端当可信值直接用，空白图标观感塌陷。属数据归一化问题非组件bug。

## 解决方案
- 图标名统一只配一张，取 meta.icon。
- 图标组件外层做占位符保护：命中#/example/druid等占位关键词或空值时自动回退默认图标，不渲染空白。
- 顶栏与侧栏菜单共用同一套回退规则，不各写一份。
- 存量菜单数据图标名批量补成有效图标名（本项目一次性写22个顶级菜单ICON）。
- 状态差异（激活/未激活）只通过颜色表达，不叠加底色/阴影/opacity，用户验收只认可「颜色由浅蓝变纯白」一处。

## 验证与归属
- 验证：会话 session-ce327d80-e2cb-48ac-8c65-d3740d649940（基线89e5947）用户诉求4/5，最终结论保留改动：顶栏读meta.icon只配一张、占位符保护回退、22顶级菜单ICON写入、激活态差异收敛为颜色变化。
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、Sidebar/RecursiveMenu.vue、src/components/SvgIcon/index.vue。
- 所属项目：zhi2-web-admin；来源会话ID：session-ce327d80-e2cb-48ac-8c65-d3740d649940；代码基线：89e5947。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "icon_placeholder_fallback",
  "source_extraction_id": "17610b81bcb7473e99c75e4ee8483cbb",
  "version": 1,
  "memory_type": "entities"
}
-->