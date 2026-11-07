# 前期合同备案链接穿透修复
产品2.0 物业区域查询详情页「暂无数据」中「合同备案」链接穿透修复，自动带入当前物业管理区域。

## 问题
- 从 `publicQuery/complex/detail.vue` 点击「暂无数据」里的「合同备案」时，`propertyContractTable.vue` 的 `goFiling` 只传 `formMode` 和 `ifHistory`，未带 `complexId`
- 进入备案新增页后物业管理区域为空，用户需重新选择，而穿透过来本应自动带入

## 修复要点
- `propertyContractTable.vue`：跳转时若存在 `complexId`，一并写入路由 query
- `propertyContract/components/detail.vue`：新增 `initComplexFromRoute`，`mounted` 读取 `query.complexId` 调用已有 `setProject` 自动回填区域信息（含关联中标备案数据）

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/detail.vue
- zhi2-web-admin/src/views/publicQuery/complex/components/propertyContractTable.vue
- zhi2-web-admin/src/views/property/propertyContract/components/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：febaf279-d1c5-4fb2-b84c-ebeadd15f05e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_link_fix",
  "source_extraction_id": "5c881ec3a20f414facbaf9f447492b5b",
  "version": 1,
  "memory_type": "entities"
}
-->