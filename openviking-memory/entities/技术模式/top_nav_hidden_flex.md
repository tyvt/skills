# 无顶部菜单时顶部保留右侧操作区
修正：隐藏顶部水平菜单会导致门户中操作区域向左偏移。

## 问题
- 隐藏 top-nav-container (flex:1) 后，在 space-between 下仅剩右侧操作区，紧贴左侧
- 用户名和消息图标发生偏移

## 解决方案
- 当没有顶部菜单时，添加 navbar--no-top-nav 类
- 对右侧操作区应用 justify-content: flex-end
- 左侧的 Logo/标题保持绝对定位

## 文件
- src/views/home/config/homeLayout.js 和 src/layout/index.vue （布局逻辑）
- src/views/home/index-new.vue, HomeLayoutSidebar.vue, UnifiedLogin.vue （页面）
- src/layout/components/Navbar.vue, homeDataMixin.js, src/settings.js （辅助）

## 验证
- 验证证据: src=门户/021.md; 会话: f0d5550d-7371-4ca0-ba93-0e9506808d82

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "top_nav_hidden_flex",
  "source_extraction_id": "eedff5713f73492399aa37cd69b61f82",
  "version": 1,
  "memory_type": "entities"
}
-->