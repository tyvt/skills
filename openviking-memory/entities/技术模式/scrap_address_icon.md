# 报废记录地址图标不显因资源路径错误
物业手持B端 `addScrap.vue` 中地址图标因资源引用路径配置错误而不显示。

## 问题根因
- `addScrap.vue` 中地址图标不显示因资源引用路径配置错误

## 解决方案
- 修正该文件内导航图标资源路径以恢复渲染

## 验证与归属
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/pages/workbench/index.vue、src/components/ZsImage/ZsImage.vue、src/env/mp.js、src/pages/home/index.vue、docs/handheld-redevelopment-architecture.md、src/pages.json、src/pages_facility/record/index.vue、src/pages/statistics/index.vue
- 来源会话ID：11928cba-1c51-4b07-9ceb-f16ee0fc94ab
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrap_address_icon",
  "source_extraction_id": "378a0d6c59af498ca69b4ef6193b77fc",
  "version": 1,
  "memory_type": "entities"
}
-->