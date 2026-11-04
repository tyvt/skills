# 嵌套或数组形式的设施类别名称解析
修复当设施类别名称来自子对象或数组时出现的空白列表问题。

## 描述
- 接口在子对象 `facilityDefinition` 或字符串数组中返回设施类别名称。
- 顶部的原始绑定 `prop: 'facilityDefinitionName'` 导致字段空白。
- 在 `scrappedRecord/index.vue` 中，列获得了调用 `resolveFacilityDefinitionName` 的 `formatter`。
- 函数优先处理值并使用 ` / ` 连接数组。

## 涉及的文件
- `scrappedRecord/index.vue`, `detail.vue`, `mixins/listMixins.js`, `mixins/table.js`, `mixins/ListTemplate.js`
- `recordProcess/components/index.vue`, `procedure/components/procedureProcessTable.vue`, `visitor/entry/index.vue`

## 验证
- 来源: cursor session=f8b4bd31-2a17-4162-a6aa-7b14123bf0f6

<!-- MEMORY_FIELDS
{
  "category": "defeito",
  "name": "facility_name_blank",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->