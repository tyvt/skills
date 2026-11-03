# dictFormatter缺字典初始化致列空白
资产类型列使用 dictFormatter 展示时因字典未预加载导致列内容空白，需在组件补齐字典初始化逻辑。

## 问题根因
- 资产类型列使用 dictFormatter 依赖预加载字典
- assetLease.vue 未初始化字典，导致格式化无数据可查

## 解决方案
- 在 assetLease.vue 补齐与 pubAssetLease/index.vue 一致的字典初始化逻辑
- 确保字典在列渲染前完成加载

## 验证与归属
- 验证：会话 6baca9f8-fd57-451d-8849-6e4937fcffa8 资产类型列空白修复
- 涉及文件：assetLease.vue、pubAssetLease/index.vue
- 来源会话ID：6baca9f8-fd57-451d-8849-6e4937fcffa8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "dict_init_blank",
  "source_extraction_id": "f9ec5b11ea454e45917b012e0977c33f",
  "version": 1,
  "memory_type": "entities"
}
-->