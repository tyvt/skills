# 菜单外链含#致404
园区物管2.0 中 hash 路由模式菜单外链含 `#` 被当作浏览器 hash 致路由未匹配跳 `/404`；组件路径 `InnerLink/index` 未被守卫识别放行。

## 根因
- hash 路由模式中外链含 `#` 被当作浏览器 hash，路由未匹配跳 `/404`
- 菜单外链组件路径须为 `InnerLink`（非 `InnerLink/index`），否则 router/index.js 守卫无法识别放行 iframe 内嵌

## 修复方案
- 菜单外链组件路径须配置为 `InnerLink`
- router/index.js 据此识别并放行 iframe 内嵌外链
- 系统管理→菜单管理正确配置示例：菜单类型=菜单；是否外链=是（isFrame=0 表示 iframe 内嵌而非新窗口打开）；路由地址填完整外链（如 `https://www.kedowen.com:8666/#/share/2ee03216-f441-4a61-aa7c-11e14a33d8ec`）；组件路径=`InnerLink`

## 验证与归属
- 验证：cursor 会话 c2035902 提取，根因与修复结论已确认
- 涉及文件：zhi2-web-admin/src/router/index.js、store/modules/permission.js、views/InnerLink/index.vue、layout/components/Sidebar/RecursiveMenu.vue、layout/components/Sidebar/index.vue、views/system/menu/index.vue、layout/components/AppMain.vue、main.js
- 所属项目：园区物管2.0；来源会话：c2035902-ac9a-41ce-a33c-574410e18d6c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_extlink_404",
  "source_extraction_id": "ac80b5d8fa304846a9b0db0e9fb8bf49",
  "version": 2,
  "memory_type": "entities"
}
-->