# 委托代售详情页字典回显须匹配后端Key
在 `src/views/presale/entrustSale/detail.vue` 中，业务状态字典 key 对齐后端 `BI` 枚举，保障详情页字典值正确回显。

## 改动内容
- 业务状态字典 key 对齐后端 `BI` 枚举
- 保障详情页字典值正确回显

## 涉及文件
- presale/entrustSale/detail.vue、presale/entrustSale/index.vue
- supervision/bank/jgwd/detail.vue
- main.js、components/detail-template/detail-template.vue
- autonomy/repair/detail.vue
- mixins/detailMixins.js、utils/dict.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/067.md
- 所属项目：苏州市房地产监测V3；来源会话：98dea9b7-0496-43cc-8f46-c865905aa071；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_dict_key",
  "source_extraction_id": "ea7b06cf68f14ed5a1ce3310fa59cb66",
  "version": 1,
  "memory_type": "entities"
}
-->