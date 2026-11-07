# 更多功能下拉菜单内容居中修复
园区物管2.0 中 Navbar.vue 的「更多功能」下拉菜单项内容未居中，已修复。

## 问题描述
- `.more-menu-item` 使用 `align-items: flex-start` 且内边距不对称，导致下拉项文字不居中

## 解决方案
- 将 `.more-menu-item` 的 `align-items` 改为 `center`
- 新增 `justify-content: center` 使文字水平居中
- 内边距由 `10px 15px 10px 0` 改为对称 `10px 15px`

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue
- 修改仅样式层；lint 报 3 个既有 TypeScript 插件错误，非本次引入
- 所属项目：园区物管2.0；代码基线：none；来源会话：3097391c-8f1b-4b81-9b50-2310a66b6a1c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "more_menu_center",
  "source_extraction_id": "d5fc2c74eca741f8999f76ec348a4ddc",
  "version": 1,
  "memory_type": "entities"
}
-->