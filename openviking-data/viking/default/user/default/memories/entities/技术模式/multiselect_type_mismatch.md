# 多选组件回显值类型不等致标签不显
苏州市房地产监测V3 的 `zs-select` 多选使用数字 `roleId` 为值，回显字符串数组与数字 `value` 严格比较失败致标签不显，已宽松比较修复。

## 问题根因
- `FjDialog.vue` 中 `zs-select` 多选使用数字类型 `roleId` 为值
- 回显时字符串数组与 `el-option` 数字 `value` 严格相等比较失败致标签不显

## 修复方案
- `MultiSelect.vue` 增加 `normalizeValue`/`normalizeValues` 与 `updateLabel` 宽松比较
- 对齐 `SingleSelect` 逻辑解决回显标签不显问题

## 验证与归属
- 验证证据：extracted source=cursor session=1d07b68a-e698-45f6-9e9f-254270fb8c4c
- 涉及文件：tool/fjflpz/components/FjDialog.vue、zs-select/zs-select.vue、zs-select/MultiSelect.vue、AnnexUpload/index.vue、dialogMixins.js、form.js、tool/fjflpz/index.vue、路由信息.json
- 来源会话ID：1d07b68a-e698-45f6-9e9f-254270fb8c4c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multiselect_type_mismatch",
  "source_extraction_id": "64e817141a014c119f2d75e08fa51c85",
  "version": 1,
  "memory_type": "entities"
}
-->