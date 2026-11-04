# API 返回未受保护的数组导致表格错误
在项目 苏州市房地产监测V3 中，接口 `selectCompany` 返回 `data` 为数组，导致 `res.data.records` 为 undefined，使得 `getList` 将非数组值赋给 `tableData` 并引发渲染错误。

## 问题根因
- `selectCompany` 返回 `data` 作为数组，导致 `res.data.records` 为 undefined
- `getList` 将非数组值赋给 `tableData`，导致渲染错误

## 解决方案
- `zs-select-dialog-func.vue` 添加了 `extractListData`/`extractTotal` 用于解析点路径并回退到 `data`/`records`/`list`/`rows`
- 始终确保 `tableData` 为数组
- `resolvedTableTrCount` 进行了防御性处理

## 涉及的文件
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue
- zhi2-web-admin/src/views/company/companyCancel/index.vue
- zhi2-web-admin/src/components/README.md
- zhi2-web-admin/src/mixins/listMixins.js
- zhi2-web-admin/src/mixins/table.js
- zhi2-web-admin/src/views/company/companyCancel/detail.vue

## 验证
- 会话: 4367cc38-7b0c-49de-b6aa-65bb248d7532
- 所属项目: 苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_company_array_fix",
  "source_extraction_id": "7543e590f3634a69b34d660c4b0b6e79",
  "version": 1,
  "memory_type": "entities"
}
-->