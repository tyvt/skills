# 苏住房G 物业相关列表页文件结构
苏住房G 项目前端中，物业管理区域列表、前期物业合同列表、物业合同列表的入口与核心逻辑分布如下。

## 页面与文件
- 物业管理区域列表：入口 `property/complex/index.vue`，逻辑在本文件自身
- 前期物业合同列表：入口 `property/propertyContractTemporary/index.vue`，复用共享组件
- 物业合同列表：入口 `property/propertyContract/index.vue`，复用共享组件

## 共享组件
- 两个合同列表页为薄包装，核心逻辑在 `property/propertyContract/components/index.vue`
- 路由由后端菜单动态生成，对应 `meta.filePath` 大致为 `property/complex/index`、`property/pr...`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`complex/index.vue`、`propertyContractTemporary/index.vue`、`propertyContract/index.vue`、`components/index.vue`
- 所属项目：苏住房G；来源会话：eedeca97-6461-4339-b304-4e5479b278fd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "property_list_pages_structure",
  "source_extraction_id": "7df15038cece4f95bd450f7119a4cdf0",
  "version": 1,
  "memory_type": "entities"
}
-->