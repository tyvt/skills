# DictTag支持value/label字典
淮安物管合同详情中 `DictTag` 需同时支持 `value`/`label` 与 `dictValue`/`dictLabel` 的修复模式。

## 问题根因
- 合同详情 `物业类型` 走 `DetailTemplate` → `DictTag`，数据来自 `propertyTypeOptions`（接口 `response.data`），很多字典接口用 `value`/`label`。
- `DictTag` 原只按 `dictValue`/`dictLabel` 查找，`getLabel` 为空但 `el-tag` 仍渲染，出现只有底色无文字的标签。
- `detail-template` 的 `getItemValueDisplayString` 已支持两种格式，故 `hasTagRenderableValue` 为 true，问题集中在 `DictTag`。

## 修复方案
- `dict-tag.vue` 的 `rawDictParts` 采用与详情一致的解析（空串、`[]`、逗号分隔、数组等），避免 `String([])` 变 `['']`。
- `optVal`/`optLabel`/`findOption` 与 `detail-template` 相同，同时支持 `dictValue`/`dictLabel` 与 `value`/`label`。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：0063c43c-fc2e-49bb-afad-13adaef1e7f5
- 涉及文件：components/dict-tag/dict-tag.vue、components/detail-template/detail-template.vue、property/complex/detail.vue、propertyContract/components/detail.vue
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_tag_valuelabel",
  "source_extraction_id": "4ebd15bf71a8499ab4122103a7acac56",
  "version": 1,
  "memory_type": "entities"
}
-->