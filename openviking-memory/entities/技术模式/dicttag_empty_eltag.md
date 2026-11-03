# DictTag 空 type 传入 ElTag 导致校验失败
产品2.0 中 DictTag 在 colorMap 模式会把空字符串传给 Element Plus 的 ElTag，触发 prop 校验告警，已改为传 undefined。

## 问题根因
- DictTag 在 colorMap 模式下将空字符串 `""` 传给 Element Plus `ElTag` 的 `type` 属性
- ElTag 的 `type` 合法值不含空串，传空串会触发 Vue 的 prop 校验失败告警
- DictDataTable 中原本存在将值映射为 `""` 的逻辑，加剧该问题

## 解决方案
- 在 `zhi2-web-admin/src/components/dict-tag/dict-tag.vue` 改传 `undefined` 替代空串
- 去除 `DictDataTable` 中映射 `""` 的逻辑，从源头避免空串流入

## 验证与归属
- 验证证据：src=2-0/017.md
- 涉及文件：zhi2-web-admin/src/components/dict-tag/dict-tag.vue
- 所属项目：2-0；来源会话ID：d39becce-af94-4451-b0d2-6ffd7cf94261；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dicttag_empty_eltag",
  "source_extraction_id": "5735c2b524dc4e538e7180fc8a41d720",
  "version": 1,
  "memory_type": "entities"
}
-->