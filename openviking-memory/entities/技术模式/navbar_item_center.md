# Navbar 下拉项不居中修复
园区物管2.0 中 Navbar.vue 的 .more-menu-item 下拉项因 align-items: flex-start 与不对称内边距导致不居中。

## 现象与根因
- 现象：Navbar 下拉项 .more-menu-item 不居中
- 根因：align-items: flex-start 与不对称内边距导致未居中

## 解决方案
- 改为 align-items: center 并加 justify-content: center
- 内边距设为 10px 15px 实现水平垂直居中

## 验证与归属
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue
- 所属项目：园区物管2.0
- 来源会话：3097391c-8f1b-4b81-9b50-2310a66b6a1c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_item_center",
  "source_extraction_id": "1b00b3b68d274fa1adfaf22891771f0a",
  "version": 1,
  "memory_type": "entities"
}
-->