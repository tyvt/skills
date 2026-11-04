# 从 store 读取 Navbar 标题，环境变量作为回退
在 zhi2-web-admin（产品 2.0）中，Navbar.vue 的标题固定为环境变量，没有从 store 读取平台名称。
## 问题根因
- Navbar.vue 在 data 中将 title 定义为固定的 import.meta.env.VITE_APP_PROJECT_NAME。
## 解决方案
- 添加 computed title() 返回 this.platformConfig.platformName || import.meta.env.VITE_APP_PROJECT_NAME。
- 移除 data 中对 title 的定义。
## 验证与归属
- 验证证据: cursor session=6a14ed22-6423-4953-948b-32e9d3050f1b
- 涉及文件: src/layout/components/Navbar.vue, src/store/modules/app.js
- 所属项目: 2-0; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_title_store",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->