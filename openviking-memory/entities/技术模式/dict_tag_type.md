# DictTag 字典 default 致 ElTag type 校验告警
DictTag 组件将字典 listClass（如 "default"）直接传给 ElTag 的 type，触发 Element Plus 自定义校验告警。

## 问题根因
- DictTag 组件将字典 listClass（如 "default"）直接传给 ElTag 的 type 属性
- Element Plus 对 ElTag type 有自定义校验，default 及空值触发告警

## 解决方案
- 在 zhi2-web-admin/src/components/dict-tag/dict-tag.vue 的 getTagType() 中，将 default 及空值返回 undefined
- 统一对 listClass 调用 trim() 与 toLowerCase() 规范化后再判断类型

## 验证与归属
- 验证证据：src=2-0/019.md
- 涉及文件：zhi2-web-admin/src/components/dict-tag/dict-tag.vue
- 所属项目：2-0；来源会话ID：19b58a9e-4df5-44f1-8286-0667d6776a04；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_tag_type",
  "source_extraction_id": "07d76519daf74721861ef48c23fa6ca0",
  "version": 1,
  "memory_type": "entities"
}
-->