# 树形表列单元格 inline-block 修复
苏州市房地产监测V3 的 zhi2-web-admin 修复了树形表格中展开箭头与单元格内容错位的问题，涉及 zs-table.vue 全局样式与 menu/index.vue。

## 问题原因
- `zs-table-column` 使用块级 `div.zs-table-column-cell`（`width: 100%`）包裹单元格内容
- 树形表中 Element UI 的展开箭头与内容是 `.cell` 内的兄弟节点，块级 div 独占一行，箭头被挤到文字上方

## 修复内容
- 在 `zs-table.vue` 增加树形列样式：当 `.cell` 内有缩进/展开图标时，将 `.zs-table-column-cell` 设为 `inline-block`，与箭头同一行
- 该全局样式对部门管理、菜单管理等所有树形表一并生效
- 在 `menu/index.vue` 将菜单名称的省略样式改为作用在 `.zs-table-column-cell` 内的 `span`

## 验证与归属
- 验证：刷新菜单管理页确认箭头已与名称同一行；异常时可强刷或重启 dev server
- 所属项目：苏州市房地产监测V3
- 涉及文件：`zs-table.vue`、`menu/index.vue`
- 来源会话ID：6b32dd33-be60-425a-a23a-be6d3b205f14
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_cell_fix",
  "source_extraction_id": "4c5863872528481481ed07628faa9249",
  "version": 1,
  "memory_type": "entities"
}
-->