# 物业合同是否上传备案表字典值未对齐（苏住房G）
苏住房G 物业合同（`property/propertyContract/components/index.vue`）将「是否上传备案表」从 `sys_yes_no`（`Y`/`N`）改为本地选项 `1`/`0` 后引发的标签与筛选不一致风险。

## 问题描述
- 删除 `listCallback` 与 `normalizeHasFilingForm` 后，列表行数据若仍为布尔值或 `Y`/`N` 无法匹配字典标签
- `colorMap` 的 `getColor` 按 `raw` 字符串查找，布尔 `true`/`false` 变 `'true'`/`'false'`，无法命中键 `1`/`0`，标签显示原始值且默认灰色
- 搜索下拉此前提交 `Y`/`N`，现改 `1`/`0`，可能与后端筛选参数约定不一致

## 修复后行为
- 删除 listCallback 与 normalizeHasFilingForm 后，列表数据直接使用接口返回的 "1"/"0"，与 sys_yes_no 字典 dictValue 一致
- dict-tag 正确映射："1" → 是（primary 标签），"0" → 否（danger 标签）
- 搜索栏筛选不受影响，下拉选项使用字典原始值

## 涉及与归属
- 所属项目：苏住房G；来源会话：bbcf1fcb-341d-4924-a4e0-c14ea7c779ce、e2fee71e-d35b-4416-a61c-a83ca1559a53；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：propertyContract/components/index.vue、zs-table-column.vue、dict-tag.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "has_filing_form_dict",
  "source_extraction_id": "d5476054ac4b4f1daec0866a22a1a876",
  "version": 2,
  "memory_type": "entities"
}
-->