# 调拨详情页改用 zs-form 与操作组
调拨详情页移除 operation-container 与 zs-attachment，顶部改用 operation-btn-group 并配置参数。
## 顶部改造
- 移除 operation-container 与 zs-attachment
- 顶部改用 operation-btn-group，配置 moduleName 等参数
## 结构模式
- 表单外层 zs-form 包裹
- view 模式使用 DetailTemplate 与 contentInfo 系列
- edit/add 保留原 el-form-item 字段
## 验证与归属
- 验证证据：src=产品2.0/068.md
- 涉及文件：supervision/agreement/allocation/detail.vue、version/detail.vue、unblock/usemoney/detail.vue、unblock/notice/detail.vue、property/propertyContract/components/detail.vue、supervision/agreement/end/detail.vue
- 来源会话：80f0da60-1767-4d5d-82a5-1eb17414467f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allocation_detail_zsform",
  "source_extraction_id": "4c9a5b08c29142c6941e338d2fd48101",
  "version": 1,
  "memory_type": "entities"
}
-->