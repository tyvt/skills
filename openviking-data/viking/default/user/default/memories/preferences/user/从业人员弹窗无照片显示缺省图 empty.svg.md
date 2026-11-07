- `RentalDetailDialog.vue` 增加 102×128 照片位，优先使用 `photo` 等字段；无 URL 或加载失败时显示 `/assets/images/empty.svg`，切换人员重置失败态。
- E2E 测试 `public-portal-interactions.spec.ts` 断言照片 `src` 包含 `empty.svg`。
- 涉及文件：RentalDetailDialog.vue、BrokerPages.vue、public-portal-interactions.spec.ts、rental.js、public-portal-designs.ts、detail.vue（personnelRecord）、PortalDetailHeader.vue、RentalPages.vue。
- 验证证据：src=门户/017.md；来源会话ID：44666f5e-377b-4054-95b9-ebfb3f53c03e。

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "从业人员弹窗无照片显示缺省图 empty.svg",
  "source_extraction_id": "68121dedf46845f490edc35d6fbd591b",
  "version": 1,
  "memory_type": "preferences"
}
-->
