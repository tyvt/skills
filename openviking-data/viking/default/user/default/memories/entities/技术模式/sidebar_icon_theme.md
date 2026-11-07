# 侧边栏菜单图标激活态主题色
园区物管2.0 侧边菜单在激活态时图标与文字同色，使用主题色 var(--primary-color)。

## 问题背景
- 导航栏去掉图标，侧边菜单栏改用接口返回的图标
- 需要激活态的图标颜色与文字保持一致

## 解决方案
- 新增两条样式覆盖：`.menu-title.active-menu .menu-title--icon` 与 `.menu-title.active-parent .menu-title--icon`
- 叶子菜单激活或父级菜单激活时，图标均变为主题色 var(--primary-color)

## 涉及文件
- zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue

## 验证与归属
- 本次仅样式调整，不影响运行
- IDE 的 ReadLints 有 ts-plugin 旧报错（Vue2/类型提示噪音，与改动无关）
- 验证证据：extracted source=cursor project=2-0；来源会话：db9b9d8a-7b5f-4e97-ba73-4fdf181714a1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_icon_theme",
  "source_extraction_id": "1f8c04859ada4140bd4d762d8c5a4972",
  "version": 1,
  "memory_type": "entities"
}
-->