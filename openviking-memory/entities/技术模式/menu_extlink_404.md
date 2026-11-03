# 菜单外链含#致404
园区物管2.0 中 hash 路由模式菜单外链含 `#` 被当作浏览器 hash 致路由未匹配跳 `/404`；组件路径 `InnerLink/index` 未被守卫识别放行。

## 根因
- hash 路由模式中外链含 `#` 被当作浏览器 hash，路由未匹配跳 `/404`
- 菜单外链组件路径须为 `InnerLink`（非 `InnerLink/index`），否则 router/index.js 守卫无法识别放行 iframe 内嵌

## 修复方案
- 菜单外链组件路径须配置为 `InnerLink`
- router/index.js 据此识别并放行 iframe 内嵌外链

## 验证与归属
- 验证：cursor 会话 c2035902 提取，根因与修复结论已确认
- 涉及文件：zhi2-web-admin/src/router/index.js、store/modules/permission.js、views/InnerLink/index.vue、layout/components/Sidebar/RecursiveMenu.vue、layout/components/Sidebar/index.vue、views/system/menu/index.vue、layout/components/AppMain.vue、main.js
- 所属项目：园区物管2.0；来源会话：c2035902-ac9a-41ce-a33c-574410e18d6c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_extlink_404",
  "source_extraction_id": "41277538b847487a848d23d59d202c30",
  "version": 1,
  "memory_type": "entities"
}
-->