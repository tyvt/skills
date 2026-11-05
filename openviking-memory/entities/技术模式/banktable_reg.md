# bankTable.vue 注册 DetailTemplate 修复
产品2.0 项目修复 bankTable.vue 查看模式未注册 DetailTemplate 组件导致的警告。

## 问题原因
- bankTable.vue 使用 <DetailTemplate> 但未注册；项目通常通过 dialogMixins 或 detailMixins 引入，当前仅混入 subTableMixins 不含该组件。

## 修改内容
- 在 bankTable.vue 显式导入并注册 DetailTemplate 组件。
- companyManagement/components/bankTable.vue 存在同样写法，可用同样方式处理。

## 验证与归属
- 所属项目：产品2.0；来源会话：cdb8c8d2-612f-4ad7-a826-8e4470159f9f；代码基线：none
- 涉及文件：bankTable.vue、companyManagement/components/bankTable.vue、subTableMixins.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "banktable_reg",
  "source_extraction_id": "ec764d6069214ea2adcdb6b65018e194",
  "version": 1,
  "memory_type": "entities"
}
-->