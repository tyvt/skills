# Dart Sass 迁移到 @use 时混入命名空间处理
淮安物管 zhi2-web-admin 迁移 Dart Sass 时，statisticsMap/components/map.vue 将 anim.scss 的 @import 改为 @use，需同步处理混入调用命名空间。
## 背景
- Dart Sass 逐步弃用 @import，迁移到 @use 语法。
## 做法
- map.vue 将 anim.scss 引入改为 @use "@/styles/anim.scss" as *，可保留原有 @include sweep-to-right 调用。
- 若采用 as anim 命名空间，调用须改为 @include anim.sweep-to-right。
## 涉及文件
- zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- zhi2-web-admin/src/styles/anim.scss
## 验证与归属
- 来源会话：accd9996-fe0d-415a-8f78-8a9d3a18e109；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_use混入命名空间",
  "source_extraction_id": "14c4f7c09ae048a298848ab2771b6290",
  "version": 1,
  "memory_type": "entities"
}
-->