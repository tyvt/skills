# 全局块级span致树形菜单箭头与名称错位
在苏州市房地产监测V3中，为修复重叠曾对全部 `.cell > span` 设 `display: block`，导致树形第一列展开箭头与菜单名换行错位。

## 问题根因
- 为修复重叠曾对全部 `.cell > span` 设 `display: block`
- 导致树形第一列展开箭头与菜单名换行错位

## 修复方案
- 长文本省略限定于第 3～5 列使用 `inline-block`
- 菜单名称列排除 `.el-table__indent`/`.el-table__placeholder` 并与 `.el-table__expand-icon` 同行 `vertical-align: middle`

## 涉及文件
- zhi2-web-admin/src/views/system/menu/index.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/mixins/listMixins.js
- zhi2-web-admin/src/mixins/table.js
- zhi2-web-admin/package.json

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/079.md
- 来源会话：0b933a14-fbd5-4c86-8301-29f6b89bb1c4
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_menu_span_fix",
  "source_extraction_id": "c33d55e7dad949b891f6f2cb7eef445c",
  "version": 2,
  "memory_type": "entities"
}
-->