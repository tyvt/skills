# zs-table 列宽跳动闭环修复
苏州市房地产监测V3 中 zs-table-column 在 updated() 全量量测列宽形成闭环，高 DPI 下亚像素致列宽跳动，已移除 updated 量测。

## 问题根因
- `zs-table-column` 在 Vue `updated()` 全量 DOM 量列宽并 doLayout
- 父表 `distributeRemainingWidth` 触发子列 updated 形成闭环
- 高 DPI 下 `getBoundingClientRect` 亚像素 1px 变化致列宽跳动

## 修复方案
- `zs-table-column.vue` 移除 updated 量测，仅挂载/数据/字典变化时量测
- 列宽偶像素对齐 + 2px 容差
- `zs-table.vue` 用 `floor(width)` 计算分配宽

## 涉及文件
- zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue
- zhi2-web-admin/src/mixins/ListTemplate.js
- zhi2-web-admin/src/components/README.md

## 验证与归属
- 验证证据：extracted source=cursor session=f256b057-029c-4ddc-84b5-b6e65fa514cf
- 来源会话ID：f256b057-029c-4ddc-84b5-b6e65fa514cf
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_loop_fix",
  "source_extraction_id": "a272ea15b80241319e7bdad773ac5ebe",
  "version": 1,
  "memory_type": "entities"
}
-->