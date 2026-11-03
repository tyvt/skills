# isFinish格式化endDate致dayjs失败
zs-button.vue 与 zs-image.vue 中 isFinish 使用已格式化的 endDate 传入 dayjs 致解析失败，需全局检查 @src/page 组件写法避免重复解析。

## 问题根因
- zs-button.vue 与 zs-image.vue 中 isFinish 使用已格式化的 endDate 传入 dayjs 致解析失败

## 解决方案
- 全局检查 @src/page 组件写法，避免对格式化日期重复解析

## 涉及文件
- zs-button.vue
- zs-image.vue

## 验证与归属
- 验证证据：src=H5/002.md
- 来源会话ID：3685bc2c-c0df-4a55-a8ea-c6e71917e105
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "isFinish格式化endDate致dayjs失败",
  "source_extraction_id": "d3a37d7a74404efd9cb7a275d22e9e8d",
  "version": 1,
  "memory_type": "entities"
}
-->