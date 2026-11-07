# hasFilingForm字典映射修复
苏住房G 物业合同列表页曾将 `hasFilingForm` 由 `1`/`0` 转 `Y`/`N`，与 `sys_yes_no` 字典 `dictValue` 不一致导致 `dict-tag` 映射失败。

## 根因
- `index.vue` 中 `listCallback` 把 `hasFilingForm` 由 `1`/`0` 转为 `Y`/`N`。
- 转换结果与 `sys_yes_no` 字典的 `dictValue` 不一致，`dict-tag` 无法正确映射显示。

## 修复方案
- 删除 `listCallback` 及 `normalizeHasFilingForm` 转换逻辑。
- 列表直接使用接口返回的 `1`/`0` 以正确匹配字典映射。

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：src=苏住房G/079.md；来源会话：e2fee71e-d35b-4416-a61c-a83ca1559a53。
- 涉及文件：propertyContract/components/index.vue、zs-table-column.vue、dict-tag.vue、mixins/listMixins.js、mixins/table.js。

<!-- MEMORY_FIELDS
{
  "category": "苏住房技术",
  "name": "hasfilingform_fix",
  "source_extraction_id": "80b8d85da2ca487fb92817c245845f78",
  "version": 1,
  "memory_type": "entities"
}
-->