# 物业合同是否上传备案表字典值未对齐（苏住房G）
苏住房G 物业合同（`property/propertyContract/components/index.vue`）将「是否上传备案表」从 `sys_yes_no`（`Y`/`N`）改为本地选项 `1`/`0` 后引发的标签与筛选不一致风险。

## 问题描述
- 删除 `listCallback` 与 `normalizeHasFilingForm` 后，列表行数据若仍为布尔值或 `Y`/`N` 无法匹配字典标签
- `colorMap` 的 `getColor` 按 `raw` 字符串查找，布尔 `true`/`false` 变 `'true'`/`'false'`，无法命中键 `1`/`0`，标签显示原始值且默认灰色
- 搜索下拉此前提交 `Y`/`N`，现改 `1`/`0`，可能与后端筛选参数约定不一致

## 涉及与归属
- 所属项目：苏住房G；来源会话：bbcf1fcb-341d-4924-a4e0-c14ea7c779ce；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：propertyContract/components/index.vue、zs-table-column.vue、dict-tag.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "has_filing_form_dict",
  "source_extraction_id": "ec57e1fd4b5e42818b6deaa5a40b679a",
  "version": 1,
  "memory_type": "entities"
}
-->