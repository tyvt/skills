- broker-detail 的 profile 经 `{ ...defaultProfile, ...this.record }` 合并，record 含列表完整行，字段映射须对齐 brokers.js 与 mock 数据。
- 「从业编号」绑定 profile.code 时标签同列表「人员编号」一致。
- netSignAuth 为空时处理空白渲染。
- 验证证据：门户/044.md
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue、src/views/home/publicPortal/mock/brokers.js、tests/e2e/fixtures/public-portal-designs.ts、tests/e2e/public-portal-interactions.spec.ts、src/views/home/publicPortal/README.md、src/views/home/publicPortal/portalAssets.js

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "broker-detail从业编号标签同列表对齐",
  "source_extraction_id": "3121e224d439424da1a5474981657447",
  "version": 2,
  "memory_type": "preferences"
}
-->