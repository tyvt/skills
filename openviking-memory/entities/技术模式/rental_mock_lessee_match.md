# 仅在验证出租方时的租赁 mock 故障
在 rental.js 中的 mock `matchRentalContract` 仅比较出租方，导致承租方的查询失败。

## 描述
- 在 `src/views/home/publicPortal/mock/rental.js` 中，`matchRentalContract` 仅与 fixture 中出租方的完全相等匹配
- 不比较承租方的字段，因此具有正确登记号的承租方找不到合同

## 所需修正
- 扩展匹配逻辑以支持按承租方凭据查询

## 涉及的文件
- zhi2-web-admin/src/views/home/publicPortal/mock/rental.js (主文件)
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PortalTable.vue

## 关系
- 来源会话: a64b0300-ecc7-4dc4-8634-47c21fd95aed

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_mock_lessee_match",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "entities"
}
-->