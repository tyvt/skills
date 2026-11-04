# 门户二级页弹窗字段标签去除全角冒号
门户 publicPortal 二级页与弹窗字段标签后的全角冒号统一去除，公文格式与查询文案冒号保留。

## 改造范围
- 去除 PropertyPages.vue、InformationPages.vue、BrokerPages.vue、RentalPages.vue 中字段标签后的全角冒号
- 去除 PropertyDetailDialog.vue、RentalDetailDialog.vue 弹窗组件中字段标签后的全角冒号
- 涉及统一登录页 UnifiedLogin.vue、公共门户查询组件 PortalSearch.vue
- 查询表单本无冒号，不在此次处理范围

## 例外保留
- 公文格式冒号保留
- 查询文案冒号保留

## 验证与归属
- 验证证据：src=门户/019.md
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue、PropertyPages.vue、RentalPages.vue、BrokerPages.vue、publicPortal/components/PortalSearch.vue、RentalDetailDialog.vue、PropertyDetailDialog.vue
- 所属项目：门户；来源会话ID：2fd56787-bd18-4625-bb06-d6a35e3562b5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_label_colon_removed",
  "source_extraction_id": "96c837ba2cce4a41a038b790929056ce",
  "version": 1,
  "memory_type": "entities"
}
-->