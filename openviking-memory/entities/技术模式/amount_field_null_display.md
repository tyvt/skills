# 因未使用 amount 类型导致面积字段显示 undefined
在项目 淮安物管 (zhi2-web-admin) 中，propertyContract/components/detail.vue 使用了模板字符串 `${this.form.landArea}㎡`，当为 null 时导致 "undefined㎡"。

## 问题
- landArea 为 null 时变为与 ㎡ 拼接的字符串 "undefined"
- 缺少对 null 值的占位符处理

## 解决方案
- 使用 type: 'amount' 直接传入 landArea/totalFloorArea
- detail-template getAmountDisplay 处理占位符 "-" 并拼接单位

## 验证
- cursor 会话 1d686e0a-d458-44a4-bb4f-d49a87fb35e2
- 涉及文件: src/views/property/propertyContract/components/detail.vue, src/components/detail-template/detail-template.vue

## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 来源会话：1d686e0a-d458-44a4-bb4f-d49a87fb35e2


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_field_null_display",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->
