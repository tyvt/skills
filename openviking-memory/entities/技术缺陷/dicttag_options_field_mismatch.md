# DictTag选项字段名不匹配致options为undefined
在 `detail.vue` 的 `contentInfo2` 中误用 `hasDefaultOptions` / `hasEnableOptions`，实际应为 `isDefaultOptions` / `isEnableOptions`，导致传给 `dict-tag` 的 `options` 为 undefined 而报错。

## 问题根因
- `DictTag` 组件会对 `this.options` 调用 `.find()`。
- `detail.vue` 的 `contentInfo2` 两处写成 `hasDefaultOptions`、`hasEnableOptions`，但组件 `data`/`initDict` 中实际字段为 `isDefaultOptions`（`sys_yes_no`）与 `isEnableOptions`（`is_enable`）。
- 传给 `dict-tag` 的 `options` 始终为 undefined，渲染即报错。

## 解决方案
- 将两处改为与数据一致：`默认渠道` 用 `options: this.isDefaultOptions`，`启用状态` 用 `options: this.isEnableOptions`。
- 字典异步加载完成后标签照常更新；如需兜底可在 `dict-tag.vue` 用 `(this.options || []).find(...)`。

## 验证与归属
- 验证证据：extracted source=cursor project=bugfix
- 涉及文件：`detail.vue`、`dict-tag.vue`、`vue.js`
- 所属项目：bugfix
- 来源会话：f06b2a1d-1232-42cd-9d82-5e09b2d5e785
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "dicttag_options_field_mismatch",
  "source_extraction_id": "194e06705db34ad08d741ad084ba83a5",
  "version": 1,
  "memory_type": "entities"
}
-->