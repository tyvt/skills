# 苏住房G 顶栏更多功能下拉宽度修复
苏住房G 项目修复顶栏「更多功能」下拉菜单在窄父级下中文逐字竖排、显示不全的问题。
## 问题根因
- 父级 flex 布局被压缩变窄时，`.more-menu-dropdown` 下拉层缺 `width: max-content` 保护，中文菜单逐字竖排成细竖条
- 用户头像下拉此前已修（注释「避免随窄父级收缩导致中文逐字换行」），「更多功能」下拉漏了同样处理
## 主要改动
- `Navbar.vue` 为 `.more-menu-dropdown` 补宽度策略：`min-width: max(100%, 180px)`、`width: max-content`、`max-width: min(320px, 90vw)`、`word-break: keep-all`
- 父级 `.more-menu`、`.top-nav-menus` 增加 `overflow: visible` 避免下拉被裁切
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 刷新后点「更多功能」子菜单完整横向展示
- 所属项目：苏住房G；来源会话：a25ae0ba-98fc-4e97-93d2-e8f696d4b6b0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_more_dropdown",
  "source_extraction_id": "47bc4314ee6040b39df5c2f234d4de2f",
  "version": 1,
  "memory_type": "entities"
}
-->