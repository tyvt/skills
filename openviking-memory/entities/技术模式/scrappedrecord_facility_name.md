# 报废记录设施设备类别列显示修复
产品2.0 的 scrappedRecord 列表因接口返回类别名称不在顶层字段或为名数组，导致「设施设备类别」列空白，后通过 formatter 兼容多级路径与数组。

## 问题根因
- 列表接口返回的类别名称可能不在顶层 `facilityDefinitionName`，而在 `facilityDefinition`、`facility` 等子对象里
- 名称也可能是字符串数组（多级路径），表格列只绑了 `prop: 'facilityDefinitionName'`，所以一直为空

## 修复方案
- 在 `scrappedRecord/index.vue` 为「设施设备类别」列增加 `formatter`，通过 `resolveFacilityDefinitionName` 按优先级取值并转字符串
- 取值优先级：顶层 `row.facilityDefinitionName` → `row.facilityDefinition.facilityDefinitionName` → `row.facility.facilityDefinitionName`
- 若上述任一为字符串数组，则用 ` / ` 拼接展示

## 涉及文件与归属
- 涉及文件：`src/views/dataProperty/scrappedRecord/index.vue`、`detail.vue`、`src/mixins/listMixins.js`
- 所属项目：产品2.0；来源会话：f8b4bd31-2a17-4162-a6aa-7b14123bf0f6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrappedrecord_facility_name",
  "source_extraction_id": "8c0c2de3a1064d6585289c58f4ae70f4",
  "version": 1,
  "memory_type": "entities"
}
-->