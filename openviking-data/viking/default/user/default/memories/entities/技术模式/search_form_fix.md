# 搜索表单日期与字典组件全局修复
苏州市房地产监测V3 搜索表单的字典下拉与日期范围属性已全局修复对齐。

## 问题
- 搜索表单字典组件未统一拉取字典，日期属性未转 kebab-case

## 修复要点
- `SearchFormDictSelect.vue` 用 `zs-select` 展示选项，按 `dictUrl` 调用 `getDicts`，通过 `:value.sync` 绑定 `queryParams`
- `normalizeSearchDateAttrs.js` 将 `valueFormat` 等转为 kebab-case 并写入 `type: daterange|datetimerange`
- `SearchFormItem.vue` 支持 `daterange`/`datetimerange`

## 涉及文件
- zhi2-web-admin/src/components/zs-search-form/SearchFormDictSelect.vue
- zhi2-web-admin/src/components/zs-search-form/normalizeSearchDateAttrs.js
- zhi2-web-admin/src/components/zs-search-form/SearchFormItem.vue
- 相关样式与 mixins 文件

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 来源会话：b65a5171-daa4-4181-bde8-ecad9c6d59ef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_form_fix",
  "source_extraction_id": "6e590f142e9a49449b6145ec50c5ca14",
  "version": 1,
  "memory_type": "entities"
}
-->