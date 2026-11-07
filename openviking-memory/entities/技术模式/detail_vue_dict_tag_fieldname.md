# detail.vue字典字段名误写致options未定义
`detail.vue` 的 `contentInfo2` 误用 `hasDefaultOptions`/`hasEnableOptions` 而非 `isDefaultOptions`/`isEnableOptions` 传给 `dict-tag`，修正字段名使 `options` 正确注入避免报错。

## 问题根因
- `contentInfo2` 传给 `dict-tag` 的字段名写错：误用 `hasDefaultOptions`/`hasEnableOptions`
- 正确字段应为 `isDefaultOptions`/`isEnableOptions`，字段名错误导致 `options` 未定义、组件报错

## 解决方案
- 修正字段名为 `isDefaultOptions`/`isEnableOptions`，使 `options` 正确注入 `dict-tag`

## 验证与归属
- 所属项目：bugfix
- 验证证据：extracted source=cursor project=bugfix
- 验证证据：src=bugfix/002.md
- 涉及文件：detail.vue
- 来源会话ID：f06b2a1d-1232-42cd-9d82-5e09b2d5e785
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_vue_dict_tag_fieldname",
  "source_extraction_id": "1559cddcd52e48a1b50036482c6ab45c",
  "version": 1,
  "memory_type": "entities"
}
-->