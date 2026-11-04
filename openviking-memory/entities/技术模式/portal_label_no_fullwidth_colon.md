# 门户标签无全角冒号
门户规范，用于在二级弹窗中的字段标签后移除全角冒号。

## 范围
- 适用于 PropertyPages.vue, InformationPages.vue, BrokerPages.vue, RentalPages.vue, PropertyDetailDialog.vue, RentalDetailDialog.vue, UnifiedLogin.vue, PortalSearch.vue。
- 移除这些组件中字段标签后的全角冒号（全角冒号）。

## 例外
- 保留官方文档格式和查询文本中的冒号；查询表单原本没有冒号。

## 验证
- 验证证据: src=门户/019.md; 会话: 2fd56787-bd18-4625-bb06-d6a35e3562b5
- 涉及的文件: UnifiedLogin.vue, InformationPages.vue, PropertyPages.vue, RentalPages.vue, PortalSearch.vue, RentalDetailDialog.vue, BrokerPages.vue, PropertyDetailDialog.vue.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_label_no_fullwidth_colon",
  "source_extraction_id": "4105b84f13b244b08703cc2876fb44ae",
  "version": 1,
  "memory_type": "entities"
}
-->