# 绑定未定义tableRowStyle致Vue警告
`ListTemplate.js` 绑定 `:row-style="tableRowStyle"` 但 `table.js` mixin 未定义该计算属性，导致 `parkingTable.vue` 渲染报 Vue 警告。

## 问题根因
- `ListTemplate.js` 绑定 `:row-style="tableRowStyle"`
- `table.js` mixin 的 `computed` 中未定义 `tableRowStyle` 计算属性
- 导致 `parkingTable.vue` 等使用页面渲染时报警告

## 解决方案
- 在 `table.js` 的 `computed` 中增加默认 `tableRowStyle` 返回 `null`，自定义页面可重写覆盖

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/076.md
- 涉及文件：publicQuery/complex/components/parkingTable.vue、mixins/subTableMixins.js、ListTemplate.js、mixins/table.js、components/zs-table/zs-table.vue、benefit/pubHouse/components/pubHouseTable.vue
- 所属项目：园区物管2.0；来源会话：9acb00ce-4277-4a60-97c9-c4001384dfcd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tablerowstyle_undefined",
  "source_extraction_id": "cf643038b5164e918e636fbbab3a205f",
  "version": 1,
  "memory_type": "entities"
}
-->